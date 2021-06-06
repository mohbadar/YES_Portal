import { Pipe } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
@Pipe({
    name: 'safe'
})
export class SafePipe {

    constructor(protected sanitizer: DomSanitizer) { }

    transform(htmlString: string): any {
        if (htmlString) {
            return this.sanitizer.bypassSecurityTrustHtml(htmlString);
        }
        return null;
    }
}