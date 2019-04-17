import { Component, OnInit, AfterContentChecked, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from "rxjs/operators";
import { Lancamento } from '../lancamento.model';
import { LancamentoService } from '../lancamento.service';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/BaseResourceFormComponent';
import { CategoriaService } from '../../categoria/categoria.service';
import { Categoria } from '../../categoria/categoria.model';

@Component({
    selector: 'bill-lancamento-form',
    templateUrl: './lancamento-form.component.html'
})
export class LancamentoFormComponent extends BaseResourceFormComponent<Lancamento> implements OnInit, AfterContentChecked {
    lancamento: Lancamento;
    categorias: Categoria[] = [];
    currentAction: string;
    // lancamentoForm: FormGroup;
    pageTitle: string;
    serverErrorMessages: string[] = null;
    submittingForm: boolean = false;
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
        private lancamentoService: LancamentoService,
        private categoriaService: CategoriaService,
        protected injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        this.setCurrentAction();
        this.buildLancamentoForm();
        this.loadCategoria();
        this.loadLancamento();
    }

    ngAfterContentChecked() {
        this.setPageTitle();
    }

    submitForm() {
        this.submittingForm = true;
        if (this.currentAction == "new")
            this.createResource();
        else // currentAction == "edit"
            this.updateResource();
    }

    protected buildLancamentoForm() {
        this.resourceForm = this.fb.group({
            id: [null],
            categoria: [null, [Validators.required]],
            estabelecimento: [null, [Validators.required, Validators.minLength(2)]],
            data: [null, [Validators.required]],
            valor: [null, [Validators.required]]
        });
    }
    protected setCurrentAction() {
        if (this.route.snapshot.url[0].path == "new")
            this.currentAction = "new";
        else
            this.currentAction = "edit";
    }
    protected setPageTitle() {
        // if (this.currentAction == 'new')
        //   this.pageTitle = this.creationPageTitle();
        // else {
        //   this.pageTitle = this.editionPageTitle();
        // }
    }

    protected createResource() {
        const resource: Lancamento = Object.assign(new Lancamento(), this.resourceForm.value);

        super.createResource();
        this.lancamentoService.create(resource);
        // .subscribe(
        //     resource => this.actionsForSuccess(resource),
        //     error => this.actionsForError(error)
        // )
    }

    protected updateResource() {
        // const resource: Categoria = this.jsonDataToResourceFn(this.categoriaForm.value);

        const resource: Lancamento = Object.assign(new Lancamento(), this.resourceForm.value);

        this.lancamentoService.update(resource)
            .subscribe(
                resource => this.actionsForSuccess(resource),
                error => this.actionsForError(error)
            )
    }

    protected loadLancamento() {
        if (this.currentAction == "edit") {
            this.route.paramMap.pipe(switchMap(params => this.lancamentoService.getById(+params.get("id"))))
                .subscribe((lancamento) => {
                    this.lancamento = lancamento;
                    // console.log(lancamento.categoria.id);
                    // this.resourceForm.get('categoria').setValue(lancamento.categoria.id);
                    this.resourceForm.patchValue(lancamento); // binds loaded resource data to resourceForm
                }, (error) => alert('Ocorreu um erro no servidor, tente mais tarde.'));
        }
    }

    loadCategoria(): any {
        // this.categoriaService.getAll().subscribe(categorias => this.categorias = categorias)
    }
}
