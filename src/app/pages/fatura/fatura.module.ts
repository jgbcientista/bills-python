import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { FaturaComponent } from './fatura-list/fatura.component';

import { FaturaRoutingModule } from './fatura-routing.module';
// import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';

import { SharedModule } from 'src/app/shared/shared.module';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { FaturaService } from './fatura.service';
import { FaturaFormComponent } from './fatura-form/fatura-form.component';
import { CalendarModule } from 'primeng/calendar';

registerLocaleData(ptBr)

@NgModule({
    declarations: [FaturaComponent, FaturaFormComponent],
    imports: [
        FaturaRoutingModule,
        HttpClientModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        CurrencyMaskModule,
        CalendarModule
    ],
    providers: [{ provide: LOCALE_ID, useValue: 'pt' }, FaturaService]
})
export class FaturaModule { }
