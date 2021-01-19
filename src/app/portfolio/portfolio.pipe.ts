import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'portfolio'
})
export class PortfolioPipe implements PipeTransform {
  newList = [];
  transform(worksList: any, sectorId: number): any {
    this.newList = [];
    worksList.forEach(el => {
      if (sectorId === 0) {
        this.newList.push(el);
      } else {
        el.sectors.forEach(se => {
          if (se === sectorId) {
            this.newList.push(el);
          }
        });
      }
    });
    return this.newList;
  }
}
