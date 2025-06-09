import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgToastComponent, TOAST_POSITIONS } from 'ng-angular-popup';
import { ToastService } from '../../components/alertas/toast.service';
import { LoadingComponent } from '../../components/loading/loading/loading.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Categoria } from '../../models/categoria';
import { Transacoes } from '../../models/transacoes';
import { CategoriaService } from '../../services/categoria.service';
import { TransacaoService } from '../../services/transacao.service';

@Component({
	selector: 'app-home',
	imports: [ReactiveFormsModule, NgToastComponent, NavbarComponent, CommonModule, LoadingComponent],
	templateUrl: './home.component.html',
	styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
	loading = true;
	TOAST_POSITIONS = TOAST_POSITIONS;
	form!: FormGroup;

	transacoes!: Transacoes;
	categorias!: Categoria[];

	constructor(private fb: FormBuilder,
		private serviceTransacao: TransacaoService,
		private serviceCategoria: CategoriaService,
		private toast: ToastService) { }


	ngOnInit(): void {
		this.form = this.fb.group({
			tipo: ['', Validators.required],
			valor: ['', [Validators.required, Validators.min(0.01)]],
			descricao: ['', Validators.required],
			categoriaId: ['', Validators.required],
			dataVencimento: ['', Validators.required],
		});

		this.setTimeoutLoading();
		this.listar();
		this.listarCategorias();
	}


	adicionar() {
		if (this.form.invalid) {
			this.toast.showWarning('Todos os campos devem sem preenchidos!', 'Ops! Algo deu errado!');
			console.log(this.form.value);
			return;
		}

		this.serviceTransacao.create(this.form.value).subscribe({
			next: (transacao) => {
				console.log(this.form.value);
				this.toast.showSuccess('Lançamento adicionado com sucesso!', 'Deu tudo certo!');
				this.listar();
				this.form.reset();
			
			},
			error: (error) => {
				this.toast.showError('Ocorreu algum erro. Tente mais tarde!', 'Ops! Algo deu errado!');
			}
		});

	}



	listar() {
		this.serviceTransacao.getAll().subscribe(resposta => {
			this.transacoes = resposta;
			console.log(resposta);
		},
			error => {
				this.toast.showError('Ocorreu algum erro ao tentar buscar as transações!', 'Ops!')
			});
	}

	setTimeoutLoading() {
		setTimeout(() => {
			this.loading = false;
		}, 1000);
	}

	listarCategorias() {
		return this.serviceCategoria.getAll().subscribe(resposta => {
			this.categorias = resposta;
			console.log(resposta);
		},
			error => {
				this.toast.showError('Ocorreu algum erro ao tentar buscar as categorias!', 'Ops!')
			});
	}
}

