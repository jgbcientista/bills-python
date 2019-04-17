import { Component, OnInit } from '@angular/core';
import { Categoria } from '../categoria.model';
import { CategoriaService } from '../categoria.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'bill-categoria',
    templateUrl: './categoria.component.html',
    styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

    categorias: Categoria[] = [];

    constructor(private categoriaService: CategoriaService) { }

    ngOnInit() {
        this.categoriaService.getAll().subscribe(data => {
            this.categorias = data.map(e => {
                return {
                    id: e.payload.doc.id,
                    ...e.payload.doc.data()
                } as Categoria;
            })
        });
    }

    deleteResource(categoria) {
        const mustDelete = confirm('Deseja realmente excluir este item?');

        if (mustDelete) {
            this.categoriaService.delete(categoria.id);
        }
    }
}
