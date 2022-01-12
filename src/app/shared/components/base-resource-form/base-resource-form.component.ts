import { HttpStatusCode } from '@angular/common/http';
import {
  AfterContentChecked,
  Directive,
  Injector,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import * as toastr from 'toastr';
import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';

@Directive()
export abstract class BaseResourceFormComponent<T extends BaseResourceModel>
  implements OnInit, AfterContentChecked
{
  resourceForm: FormGroup = new FormGroup({});
  currentAction: string = '';
  pageTitle: string = '';
  serverErrorMessages?: string[];
  submittingForm: boolean = false;

  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;

  constructor(
    protected injector: Injector,
    public resource: T,
    protected resourceService: BaseResourceService<T>,
    protected jsonDataToResourceFn: (jsonData: any) => T
  ) {
    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.formBuilder = this.injector.get(FormBuilder);
  }

  ngOnInit() {
    this.setCurrentAction();
    this.buildResourceForm();
    this.loadResource();
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;
    if (this.currentAction == 'new') this.createResource();
    // currentAction == "edit"
    else this.updateResource();
  }

  // PRIVATE METHODS

  protected setCurrentAction() {
    if (this.route.snapshot.url[0].path == 'new') this.currentAction = 'new';
    else this.currentAction = 'edit';
  }

  protected loadResource() {
    if (this.currentAction == 'edit') {
      this.route.paramMap
        .pipe(
          switchMap((params) => this.resourceService.getById(params.get('id')))
        )
        .subscribe({
          next: (resource) => {
            this.resource = resource;
            // binds loaded resource data to resourceForm
            this.resourceForm.patchValue(resource);
          },
          error: (err) =>
            alert(`Internal server error on edit, try again. ${err}`),
        });
    }
  }

  protected setPageTitle() {
    if (this.currentAction == 'new') this.pageTitle = this.creationPageTitle();
    else {
      this.pageTitle = this.editionPageTitle();
    }
  }

  protected creationPageTitle(): string {
    return 'Novo';
  }

  protected editionPageTitle(): string {
    return 'Edição';
  }

  protected createResource() {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);

    this.resourceService.create(resource).subscribe({
      next: (value) => this.actionsForSuccess(value),
      error: (err) => this.actionsForError(err),
    });
  }

  protected updateResource() {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);

    this.resourceService.update(resource).subscribe({
      next: (value) => this.actionsForSuccess(value),
      error: (error) => this.actionsForError(error),
    });
  }

  protected actionsForSuccess(resource: T) {
    toastr.success('Solicitação processada com sucesso!');

    const baseComponentPath: string = this.route.snapshot.parent!.url[0].path;

    // redirect/reload component page
    this.router
      .navigateByUrl(baseComponentPath, { skipLocationChange: true })
      .then(() =>
        this.router.navigate([baseComponentPath, resource.id, 'edit'])
      );
  }

  protected actionsForError(error: any) {
    toastr.error('Request process failed');

    this.submittingForm = false;

    if (
      error.status > HttpStatusCode.Ok &&
      error.status < HttpStatusCode.InternalServerError
    )
      this.serverErrorMessages =
        typeof error.body.error == 'object'
          ? [JSON.parse(JSON.stringify(error.body))]
          : [error.body.error];
    else
      this.serverErrorMessages = ['Server unvaliable. Please try again later.'];
  }

  protected abstract buildResourceForm(): void;
}
