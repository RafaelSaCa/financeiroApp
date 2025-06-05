import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../../components/alertas/toast.service';
import { AuthService } from '../service/auth.service';
import { NgToastComponent, TOAST_POSITIONS } from 'ng-angular-popup';

@Component({
	selector: 'app-login',
	imports: [ReactiveFormsModule, RouterLink, CommonModule, NgToastComponent],
	templateUrl: './login.component.html',
	styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
	TOAST_POSITIONS = TOAST_POSITIONS;
	form!: FormGroup;

	constructor(private fb: FormBuilder,
		private http: HttpClient,
		private service: AuthService,
		private router: Router,
		private toast: ToastService) { }

	ngOnInit() {
		this.form = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			senha: ['', Validators.required],
		});
	}

	login() {
		if (this.form.invalid) {
			this.toast.showWarning('Verifique os dados e tente novamente!', 'Ops! Algo deu errado!');
			return;
		}
		const { email, senha } = this.form.value;

		this.service.login({ email, senha }).subscribe(
			(resposta: any) => {

				localStorage.setItem('token', resposta.token);
				this.router.navigate(['/home']);

			},
			(error) => {
				this.toast.showError('Ocorreu algum erro. Tente mais tarde!', 'Ops! Algo deu errado!');
			}
		);
	}
}
