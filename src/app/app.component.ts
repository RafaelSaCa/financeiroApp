import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet, Event as RouterEvent } from '@angular/router';
import { filter } from 'rxjs';
import { LoadingComponent } from './components/loading/loading/loading.component';
import { NgToastComponent, NgToastService, TOAST_POSITIONS } from 'ng-angular-popup';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, CommonModule],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent {
	title = 'financeiroApp';

}


