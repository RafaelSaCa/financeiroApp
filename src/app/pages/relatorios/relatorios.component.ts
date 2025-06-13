import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { LoadingComponent } from '../../components/loading/loading/loading.component';
import { CategoriaService } from '../../services/categoria.service';
import { TransacaoService } from '../../services/transacao.service';
import { Transacoes } from '../../models/transacoes';
import { Categoria } from '../../models/categoria';
import { ToastService } from '../../components/alertas/toast.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-relatorios',
    imports: [NavbarComponent, ReactiveFormsModule, LoadingComponent, NgxPaginationModule, CommonModule],
    templateUrl: './relatorios.component.html',
    styleUrl: './relatorios.component.css'
})
export class RelatoriosComponent implements OnInit {
    loading = true;

    form!: FormGroup;

    transacoes!: Transacoes;
    categorias!: Categoria[];

    currentPage: number = 1;
    itemsPerPage: number = 11;

    constructor(private serviceTransacao: TransacaoService,
        private serviceCategoria: CategoriaService,
        private fb: FormBuilder,
        private toast: ToastService) { }


    ngOnInit(): void {
        this.form = this.fb.group({
            tipo: ['', Validators.required],
            categoriaId: ['', Validators.required]
        });



        this.setTimeoutLoading();
        this.listar();
        this.listarCategorias();


    }

    buscarLancamentos() {
        const tipoSelecionado = this.form.get('tipo')?.value;
        const categoriaId = this.form.get('categoriaId')?.value;

        if (!tipoSelecionado) {
            this.toast.showWarning('Selecione um tipo de movimento!', 'Ops!');
        }

        return this.serviceTransacao.findByFilter(tipoSelecionado, categoriaId).subscribe({
            next: (resposta) => {
                this.transacoes = resposta;

                // Resetar os selects após buscar
                this.form.patchValue({
                    tipo: '',
                    categoriaId: ''
                });
            },
            error: (erro) => {
                this.toast.showError('Ocorreu algum erro ao tentar buscar as transações por este tipo!', 'Ops!')
            }
        });
    }


    listar() {
        this.serviceTransacao.getAll().subscribe(resposta => {
            this.transacoes = resposta;
            this.transacoes.transacoes = this.transacoes.transacoes.reverse();//o ultimo elemento adicionado é o primeiro exibido na lista
        },
            error => {
                this.toast.showError('Ocorreu algum erro ao tentar buscar as transações!', 'Ops!')
            });
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


    setTimeoutLoading() {
        setTimeout(() => {
            this.loading = false;
        }, 1000);
    }
}
