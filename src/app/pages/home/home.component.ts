import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingComponent } from '../../components/loading/loading/loading.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
	selector: 'app-home',
	imports: [NavbarComponent, CommonModule, LoadingComponent],
	templateUrl: './home.component.html',
	styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

	loading = true;

	ngOnInit(): void {
		setTimeout(() => {
			this.loading = false;
		}, 1000);
	}
}
