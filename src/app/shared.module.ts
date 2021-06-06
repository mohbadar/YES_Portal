import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from './safi-pipe';
import { ParseHtmlPipe } from './parse-html-pipe';



@NgModule({
  declarations: [
    SafePipe,
    ParseHtmlPipe
  ],
  exports: [
    SafePipe,
    ParseHtmlPipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
