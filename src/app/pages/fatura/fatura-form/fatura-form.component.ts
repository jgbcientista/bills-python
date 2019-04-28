import { Component, OnInit, AfterContentChecked, Injector } from '@angular/core';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/BaseResourceFormComponent';
import { Fatura } from '../fatura.model';
import { FaturaService } from '../fatura.service';
import { LancamentoService } from '../../lancamento/lancamento.service';
import { Validators } from '@angular/forms';

@Component({
    selector: 'bill-fatura-form',
    templateUrl: './fatura-form.component.html',
    styleUrls: ['./fatura-form.component.css']
})
export class FaturaFormComponent extends BaseResourceFormComponent<Fatura> implements OnInit, AfterContentChecked {

    ptBR = {
        firstDayOfWeek: 0,
        dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
        monthNames: [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
            'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ],
        monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        today: 'Hoje',
        clear: 'Limpar'
    };

    constructor(
        private faturaService: FaturaService,
        private lancamentoService: LancamentoService,
        protected injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        this.buildLancamentoForm()
    }

    ngAfterContentChecked() {
        this.setPageTitle();
    }

    protected buildLancamentoForm() {
        this.resourceForm = this.fb.group({
            id: [''],
            data_vencimento: ['', [Validators.required]],
            data_pagamento: ['', [Validators.required]],
            valor: ['', [Validators.required]]
        });
    }
}
