import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReturnModel } from '../model/return.model';
import { ReturnListModel } from '../model/return-list.model';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable()
export class BaseHttpClientService {


    constructor(private httpClient: HttpClient) {
    }

    private objectToQueryParameter(obj: any): HttpParams {
        let params: HttpParams = new HttpParams();
            for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const element = obj[key];
                if (element === null || element === undefined) {
                    continue;
                }
                if (Array.isArray(element)) {
                    element.forEach(e => {
                        params = params.set(key, e);
                    });
                } else {
                    params = params.set(key, element);
                }
            }
        }
        return params;
    }

    public get<T>(url: string, headers: HttpHeaders = null): Observable<ReturnModel<T>> {
        return this.httpClient.get<ReturnModel<T>>(url, { headers : headers }, ).pipe(map(res => res));
    }

    public simpleGet<T>(url: string, headers: HttpHeaders = null): Observable<T> {
        return this.httpClient.get<T>(url, { headers : headers }, ).pipe(map(res => res));
    }

    public getWithParams<T>(url: string, queryModel: any, headers: HttpHeaders = null): Observable<ReturnModel<T>> {
        return this.httpClient.get<ReturnModel<T>>(url,
            { headers : headers , params : this.objectToQueryParameter(queryModel)}).pipe(map(res => res));
    }

    public simpleGetWithParams<T>(url: string, queryModel: any, headers: HttpHeaders = null): Observable<T> {
        return this.httpClient.get<T>(url,
            { headers : headers , params : this.objectToQueryParameter(queryModel)}).pipe(map(res => res));
    }

    public getList<T>(url: string, headers: HttpHeaders = null): Observable<ReturnListModel<T>> {
        return this.httpClient.get<ReturnListModel<T>>(url, { headers : headers }, ).pipe(map(res => res));
    }

    public simpleGetList<T>(url: string, headers: HttpHeaders = null): Observable<T[]> {
        return this.httpClient.get<T[]>(url, { headers : headers }, ).pipe(map(res => res));
    }

    public getListWithParams<T>(url: string, queryModel: any, headers: HttpHeaders = null): Observable<ReturnListModel<T>> {
        return this.httpClient.get<ReturnListModel<T>>(url,
            { headers : headers , params : this.objectToQueryParameter(queryModel)}).pipe(map(res => res));
    }

    public simpleGetListWithParams<T>(url: string, queryModel: any, headers: HttpHeaders = null): Observable<T[]> {
        return this.httpClient.get<T[]>(url,
            { headers : headers , params : this.objectToQueryParameter(queryModel)}).pipe(map(res => res));
    }

    public post<T>(url: string, model: T, headers: HttpHeaders = null): Observable<ReturnModel<T>> {
        return this.httpClient.post<ReturnModel<T>>(url, model, { headers : headers }).pipe(map(res => res));
    }

    public simplePost<T>(url: string, model: T, headers: HttpHeaders = null): Observable<T> {
        return this.httpClient.post<T>(url, model, { headers : headers }).pipe(map(res => res));
    }

    public postWithModel<T, X>(url: string, model: X, headers: HttpHeaders = null): Observable<ReturnModel<T>> {
        return this.httpClient.post<ReturnModel<T>>(url, model, { headers : headers }).pipe(map(res => res));
    }

    public simplePostWithModel<T, X>(url: string, model: X, headers: HttpHeaders = null): Observable<T> {
        return this.httpClient.post<T>(url, model, { headers : headers }).pipe(map(res => res));
    }

    public postList<T>(url: string, model: T, headers: HttpHeaders = null): Observable<ReturnListModel<T>> {
        return this.httpClient.post<ReturnListModel<T>>(url, model, { headers : headers }).pipe(map(res => res));
    }

    public simplePostList<T>(url: string, model: T, headers: HttpHeaders = null): Observable<T[]> {
        return this.httpClient.post<T[]>(url, model, { headers : headers }).pipe(map(res => res));
    }

    public postListWithModel<T, X>(url: string, model: X, headers: HttpHeaders = null): Observable<ReturnListModel<T>> {
        return this.httpClient.post<ReturnListModel<T>>(url, model, { headers : headers }).pipe(map(res => res));
    }

    public simplePostListWithModel<T, X>(url: string, model: X, headers: HttpHeaders = null): Observable<T[]> {
        return this.httpClient.post<T[]>(url, model, { headers : headers }).pipe(map(res => res));
    }

    public put<T>(url: string, model: T , headers: HttpHeaders = null): Observable<ReturnModel<T>> {
        return this.httpClient.put<ReturnModel<T>>(url, model, { headers : headers }).pipe(map(res => res));
    }

    public simplePut<T>(url: string, model: T , headers: HttpHeaders = null): Observable<T> {
        return this.httpClient.put<T>(url, model, { headers : headers }).pipe(map(res => res));
    }

    public putWithModel<T, X>(url: string, model: X, headers: HttpHeaders = null): Observable<ReturnModel<T>> {
        return this.httpClient.put<ReturnModel<T>>(url, model, { headers : headers }).pipe(map(res => res));
    }

    public simplePutWithModel<T, X>(url: string, model: X, headers: HttpHeaders = null): Observable<T> {
        return this.httpClient.put<T>(url, model, { headers : headers }).pipe(map(res => res));
    }

    public putList<T>(url: string, model: T , headers: HttpHeaders = null): Observable<ReturnListModel<T>> {
        return this.httpClient.put<ReturnListModel<T>>(url, model, { headers : headers }).pipe(map(res => res));
    }

    public simplePutList<T>(url: string, model: T , headers: HttpHeaders = null): Observable<T[]> {
        return this.httpClient.put<T[]>(url, model, { headers : headers }).pipe(map(res => res));
    }

    public putListWithModel<T, X>(url: string, model: X, headers: HttpHeaders = null): Observable<ReturnListModel<T>> {
        return this.httpClient.put<ReturnListModel<T>>(url, model, { headers : headers }).pipe(map(res => res));
    }

    public simplePutListWithModel<T, X>(url: string, model: X, headers: HttpHeaders = null): Observable<T[]> {
        return this.httpClient.put<T[]>(url, model, { headers : headers }).pipe(map(res => res));
    }

    public delete<T>(url: string, headers: HttpHeaders = null): Observable<ReturnModel<T>> {
        return this.httpClient.delete<ReturnModel<T>>(url, { headers : headers }).pipe(map(res => res));
    }

    public simpleDelete<T>(url: string, headers: HttpHeaders = null): Observable<T> {
        return this.httpClient.delete<T>(url, { headers : headers }).pipe(map(res => res));
    }

    public deleteWithParams<T>(url: string, queryModel: any, headers: HttpHeaders = null): Observable<ReturnModel<T>> {
        return this.httpClient.delete<ReturnModel<T>>(url, { headers : headers ,
            params : this.objectToQueryParameter(queryModel)}).pipe(map(res => res));
    }

    public simpleDeleteWithParams<T>(url: string, queryModel: any, headers: HttpHeaders = null): Observable<T> {
        return this.httpClient.delete<T>(url, { headers : headers ,
            params : this.objectToQueryParameter(queryModel)}).pipe(map(res => res));
    }
}
