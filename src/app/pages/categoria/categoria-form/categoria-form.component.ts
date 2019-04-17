import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from '../categoria.service';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/BaseResourceFormComponent';
import { Categoria } from '../categoria.model';
import { switchMap } from 'rxjs/operators';
import toastr from "toastr";

@Component({
    selector: 'bill-categoria-form',
    templateUrl: './categoria-form.component.html'
})
export class CategoriaFormComponent extends BaseResourceFormComponent<Categoria> implements OnInit {

    categoria: Categoria;

    constructor(
        private categoriaService: CategoriaService,
        protected injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        this.setCurrentAction();
        this.buildCategoriForm();
        this.loadCategoria();
    }

    buildCategoriForm() {
        this.resourceForm = this.fb.group({
            id: [null],
            nome: ['', Validators.required]
        })
    }

    loadCategoria() {
        if (this.currentAction == "edit") {

            // this.route.paramMap.pipe(
            //     switchMap(params => this.categoriaService.getById(+params.get("id")))
            // ).subscribe(
            //     (categoria) => {
            //         this.categoria = categoria;
            //         this.resourceForm.patchValue(categoria) // binds loaded resource data to resourceForm
            //     },
            //     (error) => alert('Ocorreu um erro no servidor, tente mais tarde.')
            // )

            this.route.paramMap.pipe(
                switchMap(params => this.categoriaService.getById(params.get("id")))
            ).subscribe(
                (categoria) => {
                    this.categoria =
                        {
                            id: categoria.payload.id,
                            ...categoria.payload.data()
                        } as Categoria;
                    console.log(categoria);
                },
                (error) => alert('Ocorreu um erro no servidor, tente mais tarde.')
            )
        }
    }

    protected createResource() {
        const resource: Categoria = Object.assign(new Categoria(), this.resourceForm.value);

        this.categoriaService.create(resource);
    }

    protected updateResource() {
        // const resource: Categoria = this.jsonDataToResourceFn(this.categoriaForm.value);

        const resource: Categoria = Object.assign(new Categoria(), this.resourceForm.value);

        this.categoriaService.update(resource);
    }
}
