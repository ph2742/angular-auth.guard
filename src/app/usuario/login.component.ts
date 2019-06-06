import { Component, OnInit, ElementRef, ViewChildren, AfterViewInit } from '@angular/core';
import { Usuario } from '../model/usuario';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { GenericValidator } from '../utils/generic-form-validator';
import { Router } from '@angular/router';
import { Observable, fromEvent, merge } from 'rxjs';
import { AutenticateService } from '../service/autenticate.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [
        '../../vendor/styles/pages/authentication.scss'
    ]
})
export class LoginComponent implements OnInit, AfterViewInit {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    public loginForm: FormGroup;
    private usuario: Usuario;
    private validationMessages: { [key: string]: { [key: string]: string } }
    private genericValidator: GenericValidator
    public displayMessage: { [key: string]: string } = {}
    public errors: any[] = [];

    constructor(public toastrService: ToastrService,
                private autenticateService: AutenticateService,
                private fb: FormBuilder,
                private router: Router) {

        this.validationMessages = {
            username: {
                required: 'Informe o e-mail'
            },
            password: {
                required: 'Informe a senha',
                minlength: 'A senha deve possuir no mínimo 6 caracteres'
            }
        };

        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    ngAfterViewInit(): void {
        let controlBlurs: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, "blur"));

        merge(...controlBlurs).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.loginForm);
        });
    }

    logar() {
        this.displayMessage = this.genericValidator.processMessages(this.loginForm);

        if (this.loginForm.valid && this.loginForm.dirty) {
            this.usuario = new Usuario();
            let usuarioConv = Object.assign({}, this.loginForm.value);
            this.usuario.username = usuarioConv.username;
            this.usuario.password = usuarioConv.password;
            
            this.autenticateService.login(this.usuario).subscribe(
                    result => { this.onSaveComplete(result) },
                    error => { this.onError(error) }
                );
        }
    }

    onSaveComplete(response: any) {
        this.errors = [];
        this.loginForm.reset();
        console.log(response);

        const reponseUsuario = {
            nome: response.nome,
            email: response.email,
            perfil: response.perfil,
            empresa: response.empresa,
            codigo: response.codigo
        };

        localStorage.setItem('eio.token', response.access_token);
        localStorage.setItem('eio.user', JSON.stringify(reponseUsuario));

        this.toastrService.success("Login realizado com sucesso!!!", "Bem Vindo!!!");
        setTimeout(() => {
            this.router.navigate(['/']);
        }, 3500);
    }

    onError(fail: any) {
        console.log(fail)
        this.errors = [fail.error.error];
        this.toastrService.error("Ocorreu um erro.", "Não foi possivel logar!");
    }
}
