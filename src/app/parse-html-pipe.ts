import { Pipe } from '@angular/core';
@Pipe({
    name: 'parsehtml'
})
export class ParseHtmlPipe {

    constructor() { }

    transform(htmlString: string): any {
        if (htmlString) {
            return htmlString.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
        }
        return null;
    }
}