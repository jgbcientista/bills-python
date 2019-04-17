import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LancamentoComponent } from './lancamento-list/lancamento.component';
import { LancamentoFormComponent } from "./lancamento-form/lancamento-form.component";

const routes: Routes = [
  { path: '', component: LancamentoComponent },
  { path: 'new', component: LancamentoFormComponent },
  { path: ':id/edit', component: LancamentoFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LancamentoRoutingModule { }
