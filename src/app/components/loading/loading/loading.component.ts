import { Component } from '@angular/core';
import {
	trigger,
	transition,
	style,
	animate
} from '@angular/animations';


@Component({
	selector: 'app-loading',
	imports: [],
	templateUrl: './loading.component.html',
	styleUrl: './loading.component.css',
	animations: [
		trigger('fadeOut', [

			transition(':leave', [ // Quando o elemento sai
				animate('200ms ease-out', style({ opacity: 1 }))
			])
		])
	]
})
export class LoadingComponent {

}