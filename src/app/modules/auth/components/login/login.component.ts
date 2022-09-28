import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from "../../../../services/api.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {first} from "rxjs/operators";
import {GlobalVariableService} from "../../../../services/global-variable.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup | any;
  isLoading$: Observable<boolean>;
  loading = false;
  private unsubscribe: Subscription[] = [];

  constructor(
    private apiService: ApiService,
    public authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    public globalVariableService: GlobalVariableService,
  ) {
    this.isLoading$ = this.authService.isLoading$;
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.authService.clearLocalStorage();
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  submit() {
    this.loading = true;
    const loginSubscr = this.authService
      .login(this.loginForm?.value)
      .pipe(first())
      .subscribe((user: any) => {
        if (user) {
          this.router.navigate(['/']);
        } else {
          this.loading = false;
        }
      });
    this.unsubscribe.push(loginSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
