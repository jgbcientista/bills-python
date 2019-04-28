import { Component, OnInit, Input } from '@angular/core';

import { Lancamento } from '../lancamento.model';
import { LancamentoService } from '../lancamento.service';
import toastr from "toastr";
import { map } from 'rxjs/operators';

@Component({
    selector: 'bill-lancamento',
    templateUrl: './lancamento.component.html',
    styleUrls: ['./lancamento.component.css']
})
export class LancamentoComponent implements OnInit {

    lancamentos: Lancamento[] = [];

    constructor(private lancamentoService: LancamentoService) { }

    ngOnInit() {
        // this.lancamentoService.getAll().subscribe(
        //     lancamentos => {
        //         Object.values(lancamentos).map(v => Object.assign(this.lancamentos, v));
        //     },
        //     error => toastr.error(`Erro ao carregar a lista! ${error}`)
        // );
        this.lancamentoService.getAll().subscribe(
            resources => this.lancamentos = resources.sort((a, b) => b.id - a.id),
            error => alert('Erro ao carregar a lista')
        )

    }
}