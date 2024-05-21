import { EventEmitter, Injectable } from '@angular/core';
import { TodoItem, TodoStatus } from '../interfaces/todo-item.interface';
import { Filter } from '../interfaces/filter.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoFilterService {

  private filters: Filter[] = [
    {
      name: 'Status',
      type: 'buttons-list',
      targetField: 'status',
      values: Object.values(TodoStatus),
      selectedValues: [],
    },
  ];

  private _filtersChanged = new EventEmitter<undefined>();

  get filtersChanged(): EventEmitter<undefined> {
    return this._filtersChanged;
  }

  private notifyFiltersChanged(): void {
    this._filtersChanged.emit();
  }

  getFilters(): Filter[] {
    return this.filters;
  }
  
  toggleFilter(filter: Filter, value: string): void {
    if (filter.values.includes(value)) {
      const valueIdx = filter.selectedValues.indexOf(value);
      if (valueIdx > -1) {
        filter.selectedValues.splice(valueIdx, 1);
      } else {
        filter.selectedValues.push(value);
      }
      this.notifyFiltersChanged();
    }
  }

  filterItems(items: TodoItem[]): TodoItem[] {
    const appliedFilters = this.filters.filter((filter) => filter.selectedValues.length > 0);

    return items.filter((item: any) => 
      appliedFilters.every((filter) =>  
        filter.selectedValues.includes(item[filter.targetField])));    
  }

}
