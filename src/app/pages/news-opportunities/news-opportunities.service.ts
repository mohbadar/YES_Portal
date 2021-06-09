import { Injectable } from '@angular/core';
import { PageService } from '../page.service';

@Injectable({
    providedIn: 'root'
})
export class NewsOpportunitiesService {

    constructor(private pageService: PageService) { }

    getSuccessStories(graphQuery) {
        return this.pageService.getGraphQueryData(graphQuery);
    }

}
