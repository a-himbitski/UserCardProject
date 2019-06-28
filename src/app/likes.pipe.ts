import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customPipe'
})
export class LikesPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    return value+' likes';
  }

}
