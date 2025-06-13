import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transacoes } from '../models/transacoes';
import { Transacao } from '../models/transacao';

@Injectable({
	providedIn: 'root'
})
export class TransacaoService {

	private apiUrl = "http://localhost:8080/transacoes";

	constructor(private http: HttpClient) { }

	getAll(): Observable<Transacoes> {
		return this.http.get<Transacoes>(this.apiUrl);
	}

	findByFilter(tipo: string, categoriaId: number) {
		const params = new HttpParams().set('tipo', tipo).set('categoriaId', categoriaId);
		return this.http.get<Transacoes>(`${this.apiUrl}`, { params });
	}


	create(transacao: Transacao): Observable<Transacao> {
		return this.http.post<Transacao>(this.apiUrl, transacao);
	}

	update(id: number, transacao: Transacao): Observable<Transacao> {
		return this.http.put<Transacao>(`${this.apiUrl}/${id}`, transacao);
	}

	delete(id: number): Observable<void> {
		return this.http.delete<void>(`${this.apiUrl}/${id}`);
	}
}
