import { BaseResourceModel } from '../../../shared/models/base-resource.model';
import { Category } from '../../categories/shared/category.model';

export class Entry extends BaseResourceModel {
  constructor(
    public name: string = '',
    public description: string = '',
    public type: string = '',
    public amount: string = '0',
    public date: string = '',
    public paid: boolean = false,
    public categoryId: number = 0,
    public category: Category = new Category()
  ) {
    super();
  }

  static types = {
    expense: 'Despesa',
    revenue: 'Receita',
  };

  static fromJson(jsonData: any): Entry {
    return Object.assign(new Entry(), jsonData);
  }

  get paidText(): string {
    return this.paid ? 'Pago' : 'Pedente';
  }
}
