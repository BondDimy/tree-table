import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {TableService} from './table/table.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {DndModule} from 'ng2-dnd';
import {TreeOneModule} from './tree/treeOne.module';
import {TreeModule} from '@rign/angular2-tree';
import {TranslateModule, TranslateService} from 'ng2-translate';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {TableComponent} from './table/table.component';




@NgModule({
  declarations: [
    AppComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    DndModule.forRoot(),
    TreeOneModule,
    TreeModule.forRoot(),
    TranslateModule.forRoot(),
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument(),
    AngularFontAwesomeModule,
    NgxDatatableModule
  ],
  providers: [TableService],
  bootstrap: [AppComponent]
})
export class AppModule { }
