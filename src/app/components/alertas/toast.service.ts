import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
	providedIn: 'root'
})
export class ToastService {

	constructor(private toast: NgToastService) { }


	showSuccess(message: string, title?: string) {
		this.toast.success(message,
			title,
			2000,
			false,
			true
		)
	};

	showError(message: string, title?: string) {
		this.toast.danger(message,
			title,
			3000,
			false,
			true
		)
	};

	showWarning(message: string, title?: string) {
		this.toast.warning(message,
			title,
			3000,
			false,
			true
		)
	};
}
