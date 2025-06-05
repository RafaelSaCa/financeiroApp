import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { NgToastComponent, TOAST_POSITIONS } from 'ng-angular-popup';
import { ToastService } from '../../components/alertas/toast.service';


@Component({
	selector: 'app-register',
	imports: [ReactiveFormsModule, NgToastComponent],
	templateUrl: './register.component.html',
	styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
	TOAST_POSITIONS = TOAST_POSITIONS;
	form!: FormGroup;

	constructor(private formBuilder: FormBuilder,
		private service: AuthService,
		private router: Router,
		private toast: ToastService) { }

	ngOnInit() {
		this.form = this.formBuilder.group({
			nome: ['', Validators.required],
			sobrenome: ['', Validators.required],
			email: ['', Validators.required, Validators],
			senha: ['', Validators.required]
		});
	}

	registrar() {
		if (this.form.invalid) {
			this.toast.showWarning('Verifique os dados e tente novamente!', 'Ops! Algo deu errado!');
			return;
		}
		this.service.register(this.form.value).subscribe({
			next: (usuario) => {
				this.toast.showSuccess('Conta criada com sucesso:', 'Deu tudo certo!')
				this.router.navigate(['/auth/login']);
			},
			error: (error) => {
				this.toast.showError('Ocorreu algum erro. Tente mais tarde!', 'Ops! Algo deu errado!');
			}
		});
	}
}


