import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from './safi-pipe';
import { ParseHtmlPipe } from './parse-html-pipe';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}



@NgModule({
  declarations: [
    SafePipe,
    ParseHtmlPipe
  ],
  exports: [
    SafePipe,
    ParseHtmlPipe,
    TranslateModule,
    ReactiveFormsModule
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
