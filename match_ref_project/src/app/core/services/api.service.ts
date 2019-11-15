import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  private extractData(res: Response) {
    const body = res;
    return body || { };
  }

  public get(url?: string): Observable<any> {
    return this.http.get(url).pipe(
      map(this.extractData));
  }

  getById(url?: string, id?: string ): Observable<any> {
    return this.http.get(url + id).pipe(
      map(this.extractData));
  }

  post(url?: string , data?: any): Observable<any> {
    return this.http.post<any>(url , JSON.stringify(data), httpOptions).pipe(
      tap((result) => console.log(`added result w/ id=${result.id}`)),
      catchError(this.handleError<any>('addProduct'))
    );
  }

  put(url?: string , id?: string, data?: any): Observable<any> {
    return this.http.put(url + id, JSON.stringify(data), httpOptions).pipe(
      tap(_ => console.log(`updated data id=${id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  delete(url?: string , id?: string): Observable<any> {
    return this.http.delete<any>(url + id, httpOptions).pipe(
      tap(_ => console.log(`deleted data id=${id}`)),
      catchError(this.handleError<any>('deleteProduct'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
