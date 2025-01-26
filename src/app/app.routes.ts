import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { GridIconsComponent } from './components/grid-icons/grid-icons.component';

export const routes: Routes = [
    { path: '', component: GridIconsComponent },
    { path: 'iconos', component: GridIconsComponent },
];
