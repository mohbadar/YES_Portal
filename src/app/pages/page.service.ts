import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PageService {

    language = 'en';

    constructor(
        private http: HttpClient
    ) { }

    complainForm(complain) {
        return this.http.post(`/api//complains`, complain);
    }
    getInTouchForm(message) {
        return this.http.post(`/api//get-in-touches`, message);
    }

    submitIdearForm(idea) {
        return this.http.post(`/api//ideas`, idea);
    }
    submitInventorForm(idea) {
        return this.http.post(`/api//inventions`, idea);
    }
    submitEcpertiseForm(expertise) {
        return this.http.post(`/api//perilesional-expertises`, expertise);
    }

    getMenuList(graphQuery) {
        // console.log("Menue", graphQuery);
        return this.getGraphQueryData(graphQuery)
    }

    getData(graphQuery) {
        return this.getGraphQueryData(graphQuery);
    }

    getTotalCount(contentType, locale) {
        return this.http.get(`/api/${contentType}/count?_locale=${locale}`);
    }

    getGraphQueryData(query) {
        return this.http.get(`/graphql`, {
            params: { query }
        }).pipe(map(m => {
            return m;
        }));
    }
}
