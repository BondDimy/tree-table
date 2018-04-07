import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {TreeOneNodeServiceService} from './tree-one-node-service.service';
import {TreeModule} from '@rign/angular2-tree';
import { NavItemComponent } from './nav-item.component';
import {TreeComponent} from './tree.component';
import {TreeLocalStorageModule} from '../local-storage/treeLocalStorage.module';
import {TableComponent} from '../table/table.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [NavItemComponent, TreeComponent, TableComponent],
  exports: [TreeComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TreeLocalStorageModule,
    ReactiveFormsModule,
    TreeModule,
    NgxDatatableModule

  ],
  providers: [TreeOneNodeServiceService]
})
export class TreeOneModule {
}
