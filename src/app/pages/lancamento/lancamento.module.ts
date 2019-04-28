import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LancamentoRoutingModule } from './lancamento-routing.module';
import { LancamentoComponent } from './lancamento-list/lancamento.component';
import { LancamentoFormComponent } from "./lancamento-form/lancamento-form.component";
// import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';

import { CalendarModule } from 'primeng/calendar';
import { CategoriaService } from '../categoria/categoria.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';
import { CurrencyMaskModule } from "ng2-currency-mask";

registerLocaleData(ptBr)

@NgModule({
    declarations: [
        LancamentoComponent,
        LancamentoFormComponent
    ],
    imports: [
        // SharedModule,
        LancamentoRoutingModule,
        HttpClientModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CalendarModule,
        SharedModule,
        DropdownModule,
        CurrencyMaskModule
    ],
    providers: [{ provide: LOCALE_ID, useValue: 'pt' }, CategoriaService]
})
export class LancamentoModule { }
