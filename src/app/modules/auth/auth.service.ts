import {Inject, Injectable, Injector, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {ApiService} from "../../services/api.service";
import {Admin} from "../../models/admin";
import {catchError, finalize, map, switchMap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {GlobalVariableService} from "../../services/global-variable.service";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  currentUser$: Observable<Admin>;
  currentUserSubject: BehaviorSubject<Admin>;
  public unsubscribe: Subscription[] = [];
  token: any = '';

  constructor(
    private router: Router,
    private apiService: ApiService,
    private http: HttpClient,
    private globalVariableService: GlobalVariableService,
    @Inject(Injector) private readonly injector: Injector
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<any>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  get currentUserValue(): Admin {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: Admin) {
    this.currentUserSubject.next(user);
  }

  private get toastService() {
    return this.injector.get(ToastrService);
  }

  getAdmin(): Observable<Admin> {
    const auth = this.getAuthFromLocalStorage();
    this.currentUserSubject = new BehaviorSubject<Admin>(auth);
    if (!auth) {
      this.router.navigate(['/auth/login']);
      // @ts-ignore
      return of(undefined);
    }
    return this.http.get(this.globalVariableService.admins + '/' + auth.id, {headers: {'Anonymous': ''}}).pipe(
      // @ts-ignore
      map((user: Admin) => {
        if (user) {
          if (this.currentUserValue) {
            this.token = this.currentUserValue.token;
          } else {
            this.logout();
            window.location.reload();
          }
          this.http.get(this.globalVariableService.usersToken + `?token=${this.token}`, {headers: {'Anonymous': ''}}).subscribe((value: any) => {
            if (value == false) {
              this.logout();
              window.location.reload();
            } else {
              this.currentUserSubject = new BehaviorSubject<Admin>(user);
              localStorage.removeItem('Mom-admin');
              localStorage.setItem('Mom-admin', JSON.stringify(user));
            }
          })

        } else {
          this.logout();
          window.location.reload();
        }
        return user;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  // public methods
  login(loginForm: any): Observable<Admin> {
    this.isLoadingSubject.next(true);
    return this.http.post(this.globalVariableService.adminsLogin, loginForm, {headers: {'Anonymous': ''}}).pipe(
      map((admin: any) => {
        return this.setAuthFromLocalStorage(admin);
      }),
      switchMap((): any => {
        this.getAdmin();
        window.location.reload();
      }),
      // @ts-ignore
      catchError((err) => {
        if (err.status == 404) {
          this.toastService.error('نام کاربری یا رمز عبور اشتباه است');
          console.error(err);
          return of(undefined);
        }
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  logout() {
    this.clearLocalStorage();
    this.router.navigate(['/auth/login']);
    this.currentUserValue.id = undefined;
  }

  clearLocalStorage() {
    localStorage.removeItem('Mom-admin');
    localStorage.removeItem('Mom-adminId');
    localStorage.removeItem(`Mom-admin-isLogged`);
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }

  public setAuthFromLocalStorage(auth: Admin): boolean {
    if (auth) {
      localStorage.setItem('Mom-admin', JSON.stringify(auth));
      // @ts-ignore
      localStorage.setItem('Mom-adminId', auth.id);
      localStorage.setItem('Mom-admin-isLogged', 'true');
      return true;
    }
    return false;
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

// private methods
  private getAuthFromLocalStorage(): Admin {
    try {
      return JSON.parse(
        // @ts-ignore
        localStorage.getItem('Mom-admin')
      );
    } catch (error) {
      console.error(error);
      // @ts-ignore
      return undefined;
    }
  }
}
