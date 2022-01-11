import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { IMaskModule } from 'angular-imask';
import { CalendarModule } from 'primeng/calendar';
import { SharedModule } from '../../shared/shared.module';
import { EntriesRoutingModule } from './entries-routing.module';
import { EntryFormComponent } from './entry-form/entry-form.component';
import { EntryListComponent } from './entry-list/entry-list.component';

@NgModule({
  imports: [SharedModule, EntriesRoutingModule, CalendarModule, IMaskModule],
  declarations: [EntryListComponent, EntryFormComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class EntriesModule {}
