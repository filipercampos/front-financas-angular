import { Directive, OnInit } from '@angular/core';
import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';

@Directive()
export abstract class BaseResourceListComponent<T extends BaseResourceModel>
  implements OnInit
{
  resources: T[] = [];

  constructor(private resourceService: BaseResourceService<T>) {}

  ngOnInit() {
    this.resourceService.getAll().subscribe({
      next: (value) =>
        (this.resources = Array.isArray(value)
          ? value.sort((a, b) => b.id - a.id)
          : []),
      error: (e) => alert(`Fail getAll ${e}`),
    });
  }

  deleteResource(resource: T) {
    const mustDelete = confirm('Deseja realmente excluir este item?');

    if (mustDelete) {
      this.resourceService.delete(resource.id).subscribe({
        next: () =>
          (this.resources = this.resources.filter(
            (element) => element != resource
          )),
        error: (e) => alert(`Fail delete ${e}`),
      });
    }
  }
}
