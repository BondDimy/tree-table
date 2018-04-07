import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {LocalStorageService} from './local-storage.service';
import {TreeModule} from '@rign/angular2-tree';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [],
  exports: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    TreeModule
  ],
  providers: [LocalStorageService]
})
export class TreeLocalStorageModule {
}
