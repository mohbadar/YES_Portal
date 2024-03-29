import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'video'
})
export class VideoPipe implements PipeTransform {
  constructor(protected sanitizer: DomSanitizer) { }

  transform(url): any {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
