import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avatarText'
})
export class AvatarTextPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {

      return value.replace(/[^A-Z0-9]+/ig, ' ').split(' ').slice(0, 2).join(' ');
    }
  }

}
