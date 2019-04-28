import { Component, OnInit, AfterContentChecked, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from "rxjs/operators";
import { Lancamento } from '../lancamento.model';
import { LancamentoService } from '../lancamento.service';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/BaseResourceFormComponent';
import { CategoriaService } from '../../categoria/categoria.service';
import { Categoria } from '../../categoria/categoria.model';
import toastr from "toastr";

@Component({
    selector: 'bill-lancamento-form',
    templateUrl: './lancamento-form.component.html'
})
export class LancamentoFormComponent extends BaseResourceFormComponent<Lancamento> implements OnInit, AfterContentChecked {
    lancamento: Lancamento = new Lancamento();
    categorias: Array<Categoria> = [];
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
        private categoriaService: CategoriaService,
        private lancamentoService: LancamentoService,
        protected injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        this.setCurrentAction();
        this.buildLancamentoForm();
        this.loadLancamento();
        this.loadCategoria();
    }

    ngAfterContentChecked() {
        this.setPageTitle();
    }

    protected buildLancamentoForm() {
        this.resourceForm = this.fb.group({
            id: [''],
            categoria: ['', [Validators.required]],
            estabelecimento: ['', [Validators.required, Validators.minLength(2)]],
            data: ['', [Validators.required]],
            valor: ['', [Validators.required]]
        });
    }

    submitForm() {
        this.submittingForm = true;
        if (this.currentAction == "new")
            this.createResource();
        else // currentAction == "edit"
            this.updateResource();
    }

    protected setCurrentAction() {
        if (this.route.snapshot.url[0].path == "new")
            this.currentAction = "new";
        else
            this.currentAction = "edit";
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

        const lancamento: Lancamento = Object.assign(new Lancamento(), this.resourceForm.value);

        this.categorias.map(categoria => {
            console.log(categoria)

            if (categoria.id == lancamento.categoria) {
                lancamento.categoria = categoria;
            }
        })

        console.log(lancamento.categoria)

        this.lancamentoService.update(lancamento)
            .subscribe(
                lancamento => this.actionsForSuccess(lancamento),
                error => this.actionsForError(error)
            )
    }

    getCategoria(element) {
        const lancamento: Lancamento = Object.assign(new Lancamento(), this.resourceForm.value);
        console.log(lancamento)

        if (element == lancamento.categoria) {
            return element;
        }
    }

    protected loadLancamento() {
        if (this.currentAction == "edit") {

            this.route.paramMap.pipe(
                switchMap(params => this.lancamentoService.getById(+params.get("id")))
            ).subscribe(
                (lancamento) => {
                    this.lancamento = lancamento;
                    this.resourceForm.patchValue(lancamento) // binds loaded resource data to resourceForm
                },
                (error) => toastr.error('Ocorreu um erro no servidor, tente mais tarde.')
            )
        }
    }

    loadCategoria() {
        // this.categoriaService.getAll().subscribe(
        //     categorias => {
        //         Object.values(categorias).map(v => Object.assign(this.categorias, v));
        //         // this.categorias = categorias;
        //         console.log(this.categorias);
        //     },
        //     error => toastr.error(`Erro ao carregar a lista! ${error}`)
        // );

        this.categoriaService.getAll().subscribe(
            resources => this.categorias = resources.sort((a, b) => b.id - a.id),
            error => alert('Erro ao carregar a lista')
        )
    }
}
