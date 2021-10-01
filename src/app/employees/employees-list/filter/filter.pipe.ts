import { ListComponent } from './../list/list.component';
import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../../management/employee';

@Pipe({ name: 'filterPipe' })
export class FilterPipe implements PipeTransform {

  constructor(private listComponent: ListComponent) {}

  transform(items: Employee[], searchText: string): any[] {
    if (items === undefined || items.length === 0) { // If server error
      setTimeout(() => this.listComponent.empty = true, 0);
      return [];
    }
    if (searchText === undefined || searchText.length === 0) {
      setTimeout(() => this.listComponent.empty = false, 0); //TODO Make a service with observer value
      return items;
    }

    searchText = searchText.toLocaleLowerCase();
    const result = items.filter(employee => employee.name.toLocaleLowerCase().includes(searchText));

    if (result === undefined || result.length === 0) {
      setTimeout(() => this.listComponent.empty = true, 0);
    } else {
      setTimeout(() => this.listComponent.empty = false, 0);
    }
    return result;
  }
}