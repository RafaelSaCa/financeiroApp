import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterceptor implements HttpInterceptor {
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const token = localStorage.getItem('token');

		// Evita adicionar o token em requisições para login/cadastro
		const isAuthRequest = req.url.includes('/auth/login') || req.url.includes('/auth/register');

		if (token && !isAuthRequest) {
			const authReq = req.clone({
				headers: req.headers.set('Authorization', `Bearer ${token}`)
			});
			return next.handle(authReq);
		}

		return next.handle(req);
	}
}