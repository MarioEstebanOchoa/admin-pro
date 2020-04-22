import { NgModule } from "@angular/core";

import { SharedModule } from '../shared/shared.module';

import {FormsModule} from '@angular/forms'


//ng2-charts
import { ChartsModule } from 'ng2-charts';


import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { PAGES_ROUTES } from './pages.routes';


//Temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficadonaComponent } from '../components/graficadona/graficadona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        Graficas1Component,
        ProgressComponent, 
        IncrementadorComponent,
        GraficadonaComponent,
        AccountSettingsComponent
    ],
    exports: [
        PagesComponent,
        DashboardComponent,
        Graficas1Component,
        ProgressComponent
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule
    ]
})
export class PagesModule { }