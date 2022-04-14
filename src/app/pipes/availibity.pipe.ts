import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'availibity'
})
export class AvailibityPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): Boolean {
    
    console.log(value[0]);
    if(value =='Available'){
      return false
    }
    return true;
  }

}
