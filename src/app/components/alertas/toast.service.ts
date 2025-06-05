import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
	providedIn: 'root'
})
export class ToastService {

	constructor(private toast: NgToastService) { }

	showSuccess(message: string, title?: string) {
		this.toast.success(message, title, 3000);
	}

	showError(message: string, title?: string) {
		this.toast.danger(message, title, 5000);
	}

	showWarning(message: string, title?: string) {
		this.toast.warning(message, title, 4000);
	}

}
