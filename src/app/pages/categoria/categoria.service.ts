import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';

import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap, tap } from 'rxjs/operators';
import { Categoria } from './categoria.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class CategoriaService {

    constructor(private http: HttpClient, private afs: AngularFirestore) { }

    public getAll() {
        return this.afs.collection<Categoria>('categorias').snapshotChanges();
    }

    public getById(id: string) {
        return this.afs.doc<Categoria>('categorias/' + id).snapshotChanges();
    }

    create(categoria: Categoria) {
        this.afs.collection('categorias').add(categoria);
        console.log(categoria);
    }

    update(categoria: Categoria) {
        this.afs.doc('categorias/' + categoria.id).update(categoria);
    }

    delete(id: number) {
        this.afs.doc('categorias/' + id).delete();
    }

    // protected jsonDataToResources(jsonData: any[]): Categoria[] {
    //   const resources: Categoria[] = [];
    //   jsonData.forEach(
    //     element => resources.push( this.jsonDataToResourceFn(element) )
    //   );
    //   return resources;
    // }

    // protected jsonDataToResource(jsonData: any): Categoria {
    //   return this.jsonDataToResourceFn(jsonData);
    // }

    // protected handleError(error: any): Observable<any> {
    //   console.log('ERRO NA REQUISIÇÃO => ', error);
    //   return throwError(error);
    // }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    };

}
