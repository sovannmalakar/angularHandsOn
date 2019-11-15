import { IReturnModel } from './i-return.model';

export class ReturnModel<T> extends IReturnModel {
    model: T;
    isSuccess: boolean;
    errorHolder: Error;
    activeTab: number;
    httpCode: number;
    totalRecords: number;
}
