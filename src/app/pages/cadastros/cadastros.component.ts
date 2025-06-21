import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { LoadingComponent } from '../../components/loading/loading/loading.component';
import { NgToastComponent, TOAST_POSITIONS } from 'ng-angular-popup';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/categoria';
import { ToastService } from '../../components/alertas/toast.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-cadastros',
	imports: [NavbarComponent, LoadingComponent, ReactiveFormsModule, NgToastComponent, NgxPaginationModule, CommonModule],
	templateUrl: './cadastros.component.html',
	styleUrl: './cadastros.component.css'
})
export class CadastrosComponent implements OnInit {
	loading = true;
	TOAST_POSITIONS = TOAST_POSITIONS;

	categorias: Categoria[] = [];
	form!: FormGroup;
	idEditar: number | null = null;

	currentPage: number = 1;
	itemsPerPage: number = 9;

	constructor(private serviceCategoria: CategoriaService,
		private fb: FormBuilder,
		private toast: ToastService
	) { }


	ngOnInit(): void {
		this.form = this.fb.group({
			descricao: ['', Validators.required]
		});

		this.setTimeoutLoading();
		this.listar();
	}

	listar() {
		return this.serviceCategoria.getAll().subscribe({
			next: (resposta) => {
				this.categorias = resposta;
			},
			error: (erro) => {
				this.toast.showError('Ocorreu algum erro ao buscar a categorias!', 'Ops! ')
			}
		});
	}


	adicionar() {
		if (this.idEditar) {
			this.serviceCategoria.update(this.idEditar, this.form.value).subscribe({
				next: (categoria) => {
					this.toast.showSuccess('Categoria atualizada com sucesso!', 'Deu certo!');
					this.idEditar = null;
					this.form.reset();
					this.listar();
				},
				error: () => {
					this.toast.showError('Informe uma descrição', 'Ops! ');
				}
			});
		} else {

			if (this.form.invalid) {
				this.toast.showWarning('Informe uma descrição.', 'Ops!');
				return
			}

			this.serviceCategoria.create(this.form.value).subscribe({
				next: () => {
					this.form.reset();
					this.toast.showSuccess('Categoria cadastrada com sucesso!', 'Deu certo!')
					this.listar();

				},
				error: () => {
					this.toast.showError('Ocorreu algum erro ao cadastrar categoria!', 'Ops! ')
				}
			});

		}
	}


	editar(categoria: Categoria) {
		this.form.patchValue({
			descricao: categoria.descricao
		});

		this.idEditar = categoria.id;
	}

	remover(id: number) {
		this.serviceCategoria.delete(id).subscribe({
			next: () => {
				this.toast.showSuccess('Categoria removida com sucesso!', 'Deu tudo certo!');
				this.listar();
			},
			error: (error) => {
				this.toast.showError('Ocorreu algum erro. Tente mais tarde!', 'Ops! Algo deu errado!');
				console.log(error)
			}
		})
	}


	setTimeoutLoading() {
		setTimeout(() => {
			this.loading = false;
		}, 1000);
	}
}
