import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {TreeOneNodeServiceService} from './tree-one-node-service.service';
import {TreeActionsService, TreeModule} from '@rign/angular2-tree';
import { NavItemComponent } from './nav-item.component';
import {TreeComponent} from './tree.component';
import {TreeLocalStorageModule} from '../local-storage/treeLocalStorage.module';

@NgModule({
  declarations: [NavItemComponent, TreeComponent],
  exports: [TreeComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TreeLocalStorageModule,
    ReactiveFormsModule,
    TreeModule,
  ],
  providers: [TreeOneNodeServiceService]
})
export class TreeOneModule {
}
