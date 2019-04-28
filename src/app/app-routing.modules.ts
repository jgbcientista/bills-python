import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: 'lancamentos', loadChildren: './pages/lancamento/lancamento.module#LancamentoModule' },
    { path: 'categorias', loadChildren: './pages/categoria/categoria.module#CategoriaModule' },
    { path: 'faturas', loadChildren: './pages/fatura/fatura.module#FaturaModule' }
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
