import { Injectable } from '@angular/core';
import { Task, TaskStatus, LocalTaskStatus } from '../interfaces/task.interface';
import { Filter } from '../interfaces/filter.interface';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksFilterService {

  private filters: Filter[] = [
    {
      name: 'Status',
      title: $localize`Status`,
      type: 'buttons-list',
      targetField: 'status',
      values: Object.values(TaskStatus),
      valuesTitles: LocalTaskStatus,
      selectedValues: [],
    },
  ];

  private _filters$ = new BehaviorSubject<Filter[]>(this.filters);

  public get filters$() {
    return this._filters$.asObservable();
  }

  private publishFilters() {
    this._filters$.next(this.filters);
  }

  private getFilterByName(name: string): Filter | undefined {
    return this.filters.find(filter => filter.name === name);
  }
  
  toggleFilter(filter: Filter, value: string): void {
    const filterObj = this.getFilterByName(filter.name);
    if (filterObj) {
      if (filterObj.values.includes(value)) {
        const valueIdx = filterObj.selectedValues.indexOf(value);
        if (valueIdx > -1) {
          filterObj.selectedValues.splice(valueIdx, 1);
        } else {
          filterObj.selectedValues.push(value);
        }
        this.publishFilters();
      }
    }
  }

  private filterItems(filters: Filter[], items: Task[]): Task[] {
    const appliedFilters = filters.filter((filter) => filter.selectedValues.length > 0);

    return items.filter((item: any) => 
      appliedFilters.every((filter) =>  
        filter.selectedValues.includes(item[filter.targetField])));    
  }

  public composeFilteredTasks$(tasks$: Observable<Task[]>) {
    return this._filters$.pipe(
      switchMap((filters) => tasks$.pipe(map(
        tasks => this.filterItems(filters, tasks)))));
  }

}
