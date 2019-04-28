import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FaturaComponent } from './fatura-list/fatura.component';
import { FaturaFormComponent } from './fatura-form/fatura-form.component';

const routes: Routes = [
    { path: '', component: FaturaComponent },
    { path: 'new', component: FaturaFormComponent },
    { path: ':id/edit', component: FaturaFormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FaturaRoutingModule { }
