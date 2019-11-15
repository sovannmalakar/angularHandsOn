import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTime'
})
export class DateTimePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return new Date(value).toLocaleTimeString();
  }

}
