import { Component, OnInit } from '@angular/core';
import { FaturaService } from '../fatura.service';
import { Fatura } from '../fatura.model';

@Component({
    selector: 'bill-fatura',
    templateUrl: './fatura.component.html',
    styleUrls: ['./fatura.component.css']
})
export class FaturaComponent implements OnInit {

    faturas: Fatura[] = []

    constructor(private faturaService: FaturaService) { }

    ngOnInit() {
        this.faturaService.getAll().subscribe(
            resources => this.faturas = resources.sort((a, b) => b.id - a.id),
            error => alert('Erro ao carregar a lista')
        )
    }

}
