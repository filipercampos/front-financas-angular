import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Category } from './pages/categories/shared/category.model';
import { Entry } from './pages/entries/shared/entry.model';

export class InMemoryDatabase implements InMemoryDbService {
  createDb() {
    const categories: Category[] = [
      { id: 1, name: 'Moradia', description: 'Pagamentos de Contas da Casa' },
      { id: 2, name: 'Saúde', description: 'Plano de Saúde e Remédios' },
      { id: 3, name: 'Lazer', description: 'Cinema, parques, praia, etc' },
      { id: 4, name: 'Salário', description: 'Recebimento de Salário' },
      { id: 5, name: 'Freelas', description: 'Trabalhos como freelancer' },
      { id: 5, name: 'Multas', description: 'Multas de trânsito' },
      { id: 5, name: 'Milhas Aereas', description: 'Vendas de milhas aereas' },
    ];

    const now = new Date();
    const entries = Array<Entry>();
    const start = now.getFullYear() - 1;
    const length = now.getFullYear() + 1;
    for (let i = start; i < length; i++) {
      for (let j = 1; j <= 12; j++) {
        const month = j < 10 ? `0${j}` : j;

        const data: Entry[] = [
          {
            id: 1,
            name: 'Gás de Cozinha',
            categoryId: categories[0].id,
            category: categories[0],
            paid: true,
            date: `14/${month}/${i}`,
            amount: '70,80',
            type: 'expense',
            description: 'Nenhuma descrição',
          } as Entry,
          {
            id: 2,
            name: 'Suplementos',
            categoryId: categories[1].id,
            category: categories[1],
            paid: false,
            date: `14/${month}/${i}`,
            amount: '15,00',
            type: 'expense',
            description: 'Nenhuma descrição',
          } as Entry,
          {
            id: 3,
            name: 'Salário na Empresa X',
            categoryId: categories[3].id,
            category: categories[3],
            paid: true,
            date: `15/${month}/${i}`,
            amount: '4405,49',
            type: 'revenue',
            description: 'Nenhuma descrição',
          } as Entry,
          {
            id: 4,
            name: 'Aluguel de Filme',
            categoryId: categories[2].id,
            category: categories[2],
            paid: true,
            date: `16/${month}/${i}`,
            amount: '15,00',
            type: 'expense',
            description: 'Nenhuma descrição',
          } as Entry,
          {
            id: 5,
            name: 'Suplementos',
            categoryId: categories[1].id,
            category: categories[1],
            paid: true,
            date: `17/${month}/${i}`,
            amount: '30,00',
            type: 'expense',
            description: 'Nenhuma descrição',
          } as Entry,
          {
            id: 6,
            name: 'Video Game da Filha',
            categoryId: categories[2].id,
            category: categories[2],
            paid: false,
            date: `17/${month}/${i}`,
            amount: '15,00',
            type: 'expense',
            description: 'Nenhuma descrição',
          } as Entry,
          {
            id: 11,
            name: 'Uber',
            categoryId: categories[1].id,
            category: categories[1],
            paid: true,
            date: `17/${month}/${i}`,
            amount: '30,00',
            type: 'expense',
            description: 'Nenhuma descrição',
          } as Entry,
          {
            id: 12,
            name: 'Aluguel',
            categoryId: categories[2].id,
            category: categories[2],
            paid: false,
            date: `23/${month}/${i}`,
            amount: '15,00',
            type: 'expense',
            description: 'Nenhuma descrição',
          } as Entry,
          {
            id: 13,
            name: 'Gás de Cozinha',
            categoryId: categories[1].id,
            category: categories[1],
            paid: false,
            date: `25/${month}/${i}`,
            amount: '30,00',
            type: 'expense',
            description: 'Nenhuma descrição',
          } as Entry,
          {
            id: 14,
            name: 'Pagamento Pelo Projeto XYZ',
            categoryId: categories[4].id,
            category: categories[4],
            paid: true,
            date: `25/${month}/${i}`,
            amount: '2980,00',
            type: 'revenue',
            description: 'Nenhuma descrição',
          } as Entry,
          {
            id: 19,
            name: 'Aluguel de Filme',
            categoryId: categories[2].id,
            category: categories[2],
            paid: false,
            date: `07/${month}/${i}`,
            amount: '15,00',
            type: 'expense',
            description: 'Nenhuma descrição',
          } as Entry,
          {
            id: 21,
            name: 'Video Game da Filha',
            categoryId: categories[1].id,
            category: categories[1],
            paid: true,
            date: `17/${month}/${i}`,
            amount: '30,00',
            type: 'expense',
            description: 'Nenhuma descrição',
          } as Entry,
          {
            id: 22,
            name: 'Cinema',
            categoryId: categories[2].id,
            category: categories[2],
            paid: true,
            date: `18/${month}/${i}`,
            amount: '15,00',
            type: 'expense',
            description: 'Nenhuma descrição',
          } as Entry,
          {
            id: 23,
            name: 'Jiu Jitsu',
            categoryId: categories[1].id,
            category: categories[1],
            paid: false,
            date: `21/${month}/${i}`,
            amount: '130,00',
            type: 'expense',
            description: 'Nenhuma descrição',
          } as Entry,
          {
            id: 44,
            name: 'Uber',
            categoryId: categories[2].id,
            category: categories[2],
            paid: true,
            date: `28/${month}/${i}`,
            amount: '15,00',
            type: 'expense',
            description: 'Nenhuma descrição',
          } as Entry,
          {
            id: 55,
            name: 'Cinema',
            categoryId: categories[1].id,
            category: categories[1],
            paid: false,
            date: `28/${month}/${i}`,
            amount: '30,00',
            type: 'expense',
            description: 'Nenhuma descrição',
          } as Entry,
        ];
        entries.push(...data);
      }
    }
    return { categories, entries };
  }
}
