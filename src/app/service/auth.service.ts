import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";

@Injectable()
export class AuthService implements CanActivate
{
    public token: string;
    public user;
    
    constructor(private router: Router) {}
    
    canActivate(routeAc: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {
        this.token = localStorage.getItem("eio.token");
        this.user = JSON.parse(localStorage.getItem("eio.user"));

        console.log(">>> AUTH SERVICE <<<");
        console.log("USUARIO :", this.user);
        console.log("TOKEN :", this.token);

        if(this.user == null){
        console.log("SEM LOGIN :", this.user)

            this.router.navigate(['/login']);
        }

        let claim: any = routeAc.data[0];
        if(claim != undefined){
            claim = routeAc.data[0]['claim'];
            if(claim){
                if(!this.user.claims){
                    this.router.navigate(['/acesso-negado'])
                }
            }
            
            let userClaims = this.user.claims.some(x => x.claimType === claim.nome && x.claimValue === claim.valor);
            if(!userClaims){
                this.router.navigate(['/acesso-negado'])
            }
        }
        
        return true;
    }
}