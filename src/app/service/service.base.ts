import { Observable } from "rxjs/Observable";
import { HttpHeaders, HttpRequest } from "@angular/common/http";
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/throw';

export abstract class ServiceBase 
{
    protected urlService: string = environment.api;
    
    protected obterTokenUsuario(): string {
        return localStorage.getItem("eio.token");
    }

    protected obterHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
    }

    protected obterHeaderUrlencoded() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        }
    }

    protected obterAuthHeaderUrlencoded() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${this.obterTokenUsuario()}`
            })
        }
    }

    protected obterAuthHeader() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.obterTokenUsuario()}`
            })
        }
    }

    protected obterAuthHeaderFormData() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${this.obterTokenUsuario()}`
            })
        }
    }

    protected obterAuthHeaderSemContentType() {
        return {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.obterTokenUsuario()}`
            })
        }
    }

    protected obterHeaderBlob() : any {
        return {
            responseType: 'blob', 
            headers: {
                'Content-Type': 'application/zip',
                'Accept': 'application/zip',
                'Authorization': `Bearer ${this.obterTokenUsuario()}`
            }
        }
    }
    
    public obterUsuario() {
        return JSON.parse(localStorage.getItem("eio.user"));
    }

    protected extractData(response: any){
        return response || {};
    }

    protected extractDataParaBlob(response: any){
        return (<Blob>response);
    }

    protected serviceError(error: Response | any){
        console.log('erro', error);
        return error;
    }
}