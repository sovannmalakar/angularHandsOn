import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseHttpClientService } from './base-http-client.service';
import { AuthenticationService } from './../services/authentication.service';
import { ReturnModel } from '../model/return.model';
import { SessionService } from '../services/session.service';
import { ReturnListModel } from '../model/return-list.model';



@Injectable()
export class FrameworkHttpClientService {

    constructor(private baseHttpClientService: BaseHttpClientService, private sessionService: SessionService) {
    }

    public get<T>(url: string): Observable<ReturnModel<T>> {
        return this.baseHttpClientService.get<T>(url, this.sessionService.getHeaders());
    }

    public simpleGet<T>(url: string): Observable<T> {
        return this.baseHttpClientService.simpleGet<T>(url, this.sessionService.getHeaders());
    }

    public getWithParams<T>(url: string, queryModel: any): Observable<ReturnModel<T>> {
        return this.baseHttpClientService.getWithParams(url, queryModel, this.sessionService.getHeaders());
    }

    public simpleGetWithParams<T>(url: string, queryModel: any): Observable<T> {
        return this.baseHttpClientService.simpleGetWithParams(url, queryModel, this.sessionService.getHeaders());
    }

    public getList<T>(url: string, headers: HttpHeaders = null): Observable<ReturnListModel<T>> {
        return this.baseHttpClientService.getList<T>(url, this.sessionService.getHeaders());
    }

    public simpleGetList<T>(url: string, headers: HttpHeaders = null): Observable<T[]> {
        return this.baseHttpClientService.simpleGetList<T>(url, this.sessionService.getHeaders());
    }

    public getListWithParams<T>(url: string, queryModel: any, headers: HttpHeaders = null): Observable<ReturnListModel<T>> {
        return this.baseHttpClientService.getListWithParams<T>(url, queryModel, this.sessionService.getHeaders());
    }

    public simpleGetListWithParams<T>(url: string, queryModel: any, headers: HttpHeaders = null): Observable<T[]> {
        return this.baseHttpClientService.simpleGetListWithParams<T>(url, queryModel, this.sessionService.getHeaders());
    }

    public post<T>(url: string, model: T, headers: HttpHeaders = null): Observable<ReturnModel<T>> {
        return this.baseHttpClientService.post<T>(url, model, this.sessionService.getHeaders());
    }

    public simplePost<T>(url: string, model: T, headers: HttpHeaders = null): Observable<T> {
        return this.baseHttpClientService.simplePost<T>(url, model, this.sessionService.getHeaders());
    }

    public postWithModel<T, X>(url: string, model: X, headers: HttpHeaders = null): Observable<ReturnModel<T>> {
        return this.baseHttpClientService.postWithModel<T, X>(url, model, this.sessionService.getHeaders());
    }

    public simplePostWithModel<T, X>(url: string, model: X, headers: HttpHeaders = null): Observable<T> {
        return this.baseHttpClientService.simplePostWithModel<T, X>(url, model, this.sessionService.getHeaders());
    }

    public postList<T>(url: string, model: T, headers: HttpHeaders = null): Observable<ReturnListModel<T>> {
        return this.baseHttpClientService.postList<T>(url, model, this.sessionService.getHeaders());
    }

    public simplePostList<T>(url: string, model: T, headers: HttpHeaders = null): Observable<T[]> {
        return this.baseHttpClientService.simplePostList<T>(url, model, this.sessionService.getHeaders());
    }

    public postListWithModel<T, X>(url: string, model: X, headers: HttpHeaders = null): Observable<ReturnListModel<T>> {
        return this.baseHttpClientService.postListWithModel<T, X>(url, model, this.sessionService.getHeaders());
    }

    public simplePostListWithModel<T, X>(url: string, model: X, headers: HttpHeaders = null): Observable<T[]> {
        return this.baseHttpClientService.simplePostListWithModel<T, X>(url, model, this.sessionService.getHeaders());
    }

    public put<T>(url: string, model: T , headers: HttpHeaders = null): Observable<ReturnModel<T>> {
        return this.baseHttpClientService.put<T>(url, model, this.sessionService.getHeaders());
    }

    public simplePut<T>(url: string, model: T , headers: HttpHeaders = null): Observable<T> {
        return this.baseHttpClientService.simplePut<T>(url, model, this.sessionService.getHeaders());
    }

    public putWithModel<T, X>(url: string, model: X, headers: HttpHeaders = null): Observable<ReturnModel<T>> {
        return this.baseHttpClientService.putWithModel<T, X>(url, model, this.sessionService.getHeaders());
    }

    public simplePutWithModel<T, X>(url: string, model: X, headers: HttpHeaders = null): Observable<T> {
        return this.baseHttpClientService.simplePutWithModel<T, X>(url, model, this.sessionService.getHeaders());
    }

    public putList<T>(url: string, model: T , headers: HttpHeaders = null): Observable<ReturnListModel<T>> {
        return this.baseHttpClientService.putList<T>(url, model, this.sessionService.getHeaders());
    }

    public simplePutList<T>(url: string, model: T , headers: HttpHeaders = null): Observable<T[]> {
        return this.baseHttpClientService.simplePutList<T>(url, model, this.sessionService.getHeaders());
    }

    public putListWithModel<T, X>(url: string, model: X, headers: HttpHeaders = null): Observable<ReturnListModel<T>> {
        return this.baseHttpClientService.putListWithModel<T, X>(url, model, this.sessionService.getHeaders());
    }

    public simplePutListWithModel<T, X>(url: string, model: X, headers: HttpHeaders = null): Observable<T[]> {
        return this.baseHttpClientService.simplePutListWithModel<T, X>(url, model, this.sessionService.getHeaders());
    }

    public delete<T>(url: string, headers: HttpHeaders = null): Observable<ReturnModel<T>> {
        return this.baseHttpClientService.delete<T>(url, this.sessionService.getHeaders());
    }

    public simpleDelete<T>(url: string, headers: HttpHeaders = null): Observable<T> {
        return this.baseHttpClientService.simpleDelete<T>(url, this.sessionService.getHeaders());
    }

    public deleteWithParams<T>(url: string, queryModel: any, headers: HttpHeaders = null): Observable<ReturnModel<T>> {
        return this.baseHttpClientService.deleteWithParams<T>(url, queryModel, this.sessionService.getHeaders());
    }

    public simpleDeleteWithParams<T>(url: string, queryModel: any, headers: HttpHeaders = null): Observable<T> {
        return this.baseHttpClientService.simpleDeleteWithParams<T>(url, queryModel, this.sessionService.getHeaders());
    }
}
