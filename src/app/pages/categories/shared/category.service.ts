import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from '../../../shared/services/base-resource.service';
import { ApiResources } from './../../../constants/api_resources';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends BaseResourceService<Category> {
  constructor(injector: Injector) {
    super(ApiResources.CATEGORIES, injector, Category.fromJson);
  }
}
