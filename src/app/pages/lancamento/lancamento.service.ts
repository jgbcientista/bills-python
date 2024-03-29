import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { Lancamento } from './lancamento.model';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LancamentoService {

    constructor(
        private http: HttpClient) { }

    public getAll() {
        // return this.http.get<Lancamento[]>(`${environment.API_PATH}/lancamentos`);

        return this.http.get(`${environment.API_PATH}/lancamentos`).pipe(
            map(this.jsonDataToResources),
            catchError(this.handleError)
        );

    }

    public getById(id: number) {
        const url = `${environment.API_PATH}/lancamentos/${id}`;
        // return this.http.get<Lancamento>(url);

        return this.http.get(url).pipe(
            map(this.jsonDataToResource.bind(this)),
            catchError(this.handleError)
        );
    }

    update(lancamento: Lancamento): Observable<Lancamento> {
        const url = `${environment.API_PATH}/lancamentos/${lancamento.id}`;

        // return this.http.put(url, categoria).pipe(
        //   map(() => categoria),
        //   catchError(this.handleError)
        // );
        console.log(lancamento);

        return this.http.put<Lancamento>(url, lancamento);
    }

    public create(lancamento: Lancamento) {

    }

    protected jsonDataToResources(jsonData: any[]): Lancamento[] {
        const resources: Lancamento[] = [];

        jsonData.forEach(
            element => resources.push(Lancamento.fromJson(element))
        );
        return resources;
    }

    protected jsonDataToResource(jsonData: any): Lancamento {
        return Lancamento.fromJson(jsonData);
    }

    protected handleError(error: any): Observable<any> {
        console.log('ERRO NA REQUISIÇÃO => ', error);
        return throwError(error);
    }
}

