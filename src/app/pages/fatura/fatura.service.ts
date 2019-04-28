import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { Fatura } from './fatura.model';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FaturaService {

    constructor(
        private http: HttpClient) { }

    public getAll() {
        // return this.http.get<fatura[]>(`${environment.API_PATH}/faturas`);

        return this.http.get(`${environment.API_PATH}/faturas`).pipe(
            map(this.jsonDataToResources),
            catchError(this.handleError)
        );

    }

    public getById(id: number) {
        const url = `${environment.API_PATH}/faturas/${id}`;
        // return this.http.get<fatura>(url);

        return this.http.get(url).pipe(
            map(this.jsonDataToResource.bind(this)),
            catchError(this.handleError)
        );
    }

    update(fatura: Fatura): Observable<Fatura> {
        const url = `${environment.API_PATH}/faturas/${fatura.id}`;

        // return this.http.put(url, categoria).pipe(
        //   map(() => categoria),
        //   catchError(this.handleError)
        // );
        console.log(fatura);

        return this.http.put<Fatura>(url, fatura);
    }

    public create(fatura: Fatura) {

    }

    protected jsonDataToResources(jsonData: any[]): Fatura[] {
        const resources: Fatura[] = [];

        jsonData.forEach(
            element => resources.push(Fatura.fromJson(element))
        );

        console.log(resources);
        return resources;
    }

    protected jsonDataToResource(jsonData: any): Fatura {
        return Fatura.fromJson(jsonData);
    }

    protected handleError(error: any): Observable<any> {
        console.log('ERRO NA REQUISIÇÃO => ', error);
        return throwError(error);
    }
}

