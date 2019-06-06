import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpErrorResponse, HttpHandler, HttpEvent,  } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";

import "rxjs/add/operator/catch";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).catch(err => {
            if(err instanceof HttpErrorResponse){
                if(err.status === 401) {
                    localStorage.removeItem("eio.token");
                    localStorage.removeItem("eio.user");
                    this.router.navigate(['/login'])
                }

                if(err.status === 403) {
                    this.router.navigate(['/acesso-negado'])
                }

                if(err.status === 404) {
                    this.router.navigate(['/nao-encontrado'])
                }

                if(err.status === 500) {
                    this.router.navigate(['/erro-servidor'])
                }

            }
            
            return Observable.throw(err);
        });
    }
}