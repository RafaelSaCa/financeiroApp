import { Routes } from '@angular/router';
import { AuthGuard } from './auth/guard/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { RelatoriosComponent } from './pages/relatorios/relatorios.component';
import { CadastrosComponent } from './pages/cadastros/cadastros.component';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: '', redirectTo: '/auth/login', pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'relatorios',
        component: RelatoriosComponent,
        canActivate: [AuthGuard]
    },

      {
        path: 'gerenciamento',
        component: CadastrosComponent,
        canActivate: [AuthGuard]
    }


];
