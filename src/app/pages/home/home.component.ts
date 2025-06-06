import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingComponent } from '../../components/loading/loading/loading.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { TransacaoService } from '../../services/transacao.service';
import { Transacoes } from '../../models/transacoes';
import { ToastService } from '../../components/alertas/toast.service';

@Component({
	selector: 'app-home',
	imports: [NavbarComponent, CommonModule, LoadingComponent],
	templateUrl: './home.component.html',
	styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
	loading = true;
	transacoes!: Transacoes;

	constructor(private serviceTransacao: TransacaoService,
		private toast: ToastService) { }


	ngOnInit(): void {
		this.setTimeoutLoading();
		this.listar();
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
}
