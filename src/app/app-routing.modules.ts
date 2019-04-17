import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'fornecedores', loadChildren: './pages/fornecedor/fornecedor.module#FornecedorModule' },
  { path: 'lancamentos', loadChildren: './pages/lancamento/lancamento.module#LancamentoModule' },
  { path: 'categorias', loadChildren: './pages/categoria/categoria.module#CategoriaModule' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
