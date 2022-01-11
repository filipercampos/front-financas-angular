import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'entries',
    loadChildren: () =>
      import('./pages/entries/entries.module').then((m) => m.EntriesModule),
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./pages/categories/categories.module').then(
        (m) => m.CategoriesModule
      ),
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./pages/reports/reports.module').then((m) => m.ReportsModule),
  },

  { path: '', redirectTo: '/reports', pathMatch: 'full' },
  // Wildcard route for a 404 page
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // useHash: true,
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
