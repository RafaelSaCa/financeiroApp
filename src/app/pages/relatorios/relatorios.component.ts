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

@Component({
    selector: 'app-relatorios',
    imports: [NavbarComponent, LoadingComponent,NgxPaginationModule, CommonModule],
    templateUrl: './relatorios.component.html',
    styleUrl: './relatorios.component.css'
})
export class RelatoriosComponent implements OnInit {
    loading = true;

    transacoes!: Transacoes;
    categorias!: Categoria[];

    currentPage: number = 1;
    itemsPerPage: number = 11;

    constructor(private serviceTransacao: TransacaoService,
        private serviceCategoria: CategoriaService,
        private toast: ToastService) { }


    ngOnInit(): void {
        this.setTimeoutLoading();
        this.listar();
        this.listarCategorias();
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
