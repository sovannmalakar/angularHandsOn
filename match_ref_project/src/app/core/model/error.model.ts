import { ErrorItem } from './error-item.model';

export class Error {
    friendlyMessage: string;
    internalErrorMessage: string;
    errorItemList: ErrorItem[];
    exception:  any;
}
