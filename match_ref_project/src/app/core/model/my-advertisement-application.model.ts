import { MyAdvertisementModel } from './my-advertisement.model';
import { MyAdvertisementApplicationMessageModel } from './my-advertisement-application-message.model';


export class MyAdvertisementApplicationModel extends MyAdvertisementModel {
    messages: MyAdvertisementApplicationMessageModel[];
}
