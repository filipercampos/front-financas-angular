import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseResourceFormComponent } from '../../../shared/components/base-resource-form/base-resource-form.component';
import { Category } from '../../categories/shared/category.model';
import { CategoryService } from '../../categories/shared/category.service';
import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css'],
})
export class EntryFormComponent
  extends BaseResourceFormComponent<Entry>
  implements OnInit
{
  categories: Array<Category> = [];

  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ',',
  };

  ptBR = {
    firstDayOfWeek: 0,
    dayNames: [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
    ],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
    monthNames: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ],
    monthNamesShort: [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ],
    today: 'Hoje',
    clear: 'Limpar',
  };

  constructor(
    protected entryService: EntryService,
    protected categoryService: CategoryService,
    injector: Injector
  ) {
    super(injector, new Entry(), entryService, Entry.fromJson);
  }

  override ngOnInit() {
    this.loadCategories();
    super.ngOnInit();
  }

  get typeOptions(): Array<{
    text: string;
    value: any;
  }> {
    return Object.entries(Entry.types).map(([value, text]) => {
      return {
        text: text,
        value: value,
      };
    });
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [0],
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      type: ['expense', [Validators.required]],
      amount: ['0', [Validators.required]],
      date: ['', [Validators.required]],
      paid: [true, [Validators.required]],
      categoryId: [0, [Validators.required]],
    });
  }

  private loadCategories() {
    this.categoryService
      .getAll()
      .subscribe((categories) => (this.categories = categories));
  }

  override creationPageTitle(): string {
    return 'Cadastro de Novo Lançamento';
  }

  override editionPageTitle(): string {
    const resourceName = this.resource.name || '';
    return 'Editando Lançamento: ' + resourceName;
  }
}
