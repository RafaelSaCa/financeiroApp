import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { Login } from '../model/login';
import { environment } from '../../../environments/environment.prod';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	// private apiUrl = 'http://localhost:8080/auth';
	private apiUrl = `${environment.apiUrl}/auth`;

	constructor(private http: HttpClient) {
	}

	register(usuario: Usuario) {
		return this.http.post<Usuario>(`${this.apiUrl}/register`, usuario);
	}

	login(dados: Login) {
		return this.http.post(`${this.apiUrl}/login`, dados);
	}
}
