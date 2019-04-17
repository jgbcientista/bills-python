import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Lancamento } from './lancamento.model';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Lancamento[]> {
      console.log(environment);
      return this.http.get<Lancamento[]>(`${environment.API_PATH}/lancamentos`);
  }

  public getById(id: number): Observable<Lancamento> {
    const url = `${environment.API_PATH}/lancamentos/${id}`;
    return this.http.get<Lancamento>(url);
  }

  update(lancamento: Lancamento): Observable<Lancamento> {
    const url = `${environment.API_PATH}/lancamentos/${lancamento.id}`;

    // return this.http.put(url, categoria).pipe(
    //   map(() => categoria),
    //   catchError(this.handleError)
    // );

    return this.http.put<Lancamento>(url, lancamento);
  }

  public create(lancamento: Lancamento) {
    
  }
}

