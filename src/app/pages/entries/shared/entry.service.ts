import { Injectable, Injector } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { BaseResourceService } from '../../../shared/services/base-resource.service';
import { CategoryService } from '../../categories/shared/category.service';
import { ApiResources } from './../../../constants/api_resources';
import { Category } from './../../categories/shared/category.model';
import { Entry } from './entry.model';

@Injectable({
  providedIn: 'root',
})
export class EntryService extends BaseResourceService<Entry> {
  constructor(injector: Injector, private categoryService: CategoryService) {
    super(ApiResources.ENTRIES, injector, Entry.fromJson);
  }

  override create(entry: Entry): Observable<Entry> {
    return this.setCategoryAndSendToServer(entry, super.create.bind(this));
  }

  override update(entry: Entry): Observable<Entry> {
    return this.setCategoryAndSendToServer(entry, super.update.bind(this));
  }

  getByMonthAndYear(month: number, year: number): Observable<Entry[]> {
    return this.getAll().pipe(
      map((entries) => this.filterByMonthAndYear(entries, month, year))
    );
  }

  private setCategoryAndSendToServer(
    entry: Entry,
    sendFn: (data: Entry) => Observable<Entry>
  ): Observable<Entry> {
    return this.categoryService.getById(entry.categoryId).pipe(
      //was flatMap
      mergeMap((category: Category) => {
        entry.category = category;
        return sendFn(entry);
      }),
      catchError(this.handleError)
    );
  }

  private filterByMonthAndYear(entries: Entry[], month: number, year: number) {
    return entries.filter((entry: any) => {
      const entryDate = moment(entry.date, 'DD/MM/YYYY');
      const monthMatches = entryDate.month() + 1 == month;
      const yearMatches = entryDate.year() == year;

      if (monthMatches && yearMatches) return entry;
    });
  }
}
