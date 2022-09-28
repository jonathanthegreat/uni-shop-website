import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "../modules/auth/auth.service";
import {Admin} from "../models/admin";

@Injectable()

export class HttpInterceptorUtil implements HttpInterceptor {
  admin: Admin;

  constructor(
    private authService: AuthService,
  ) {
    // this.admin = this.authService.currentUserValue;
    this.admin = JSON.parse(
      // @ts-ignore
      localStorage.getItem('Mom-admin')
    );
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.headers.get(`Anonymous`) === ``) {
      const newHeaders = req.headers.delete(`Anonymous`);
      const newRequest = req.clone({headers: newHeaders});
      return next.handle(newRequest);
    } else {

      if (this.admin) {
        // @ts-ignore
        const clonedRequest = req.clone({headers: req.headers.append('Authorization', `Bearer ${this.admin.token}`)});
        return next.handle(clonedRequest);
      }

      return next.handle(req)
    }

  }

}
