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


    // baseUrl = 'http://localhost:1337';

    getMenuList(graphQuery) {
        // console.log("Menue", graphQuery);
        return this.getGraphQueryData(graphQuery)
    }

    getData(graphQuery) {
        return this.getGraphQueryData(graphQuery);
    }

    getGraphQueryData(query) {
        return this.http.get(`/graphql`, {
            params: { query }
        }).pipe(map(m => {
            return m;
        }));
    }
}
