import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { districts } from 'src/assets/data/districts';
import { provinces } from 'src/assets/data/provinces';

@Injectable({
    providedIn: 'root'
})
export class PageService {

    language = 'en';

    constructor(
        private http: HttpClient
    ) { }

    complainForm(complain) {
        return this.http.post(`/api/complains`, complain);
    }
    getInTouchForm(message) {
        return this.http.post(`/api/get-in-touches`, message);
    }

    submitIdearForm(idea) {
        return this.http.post(`/api/ideas`, idea);
    }
    submitInventorForm(idea) {
        return this.http.post(`/api/inventions`, idea);
    }
    submitEcpertiseForm(expertise) {
        return this.http.post(`/api/perilesional-expertises`, expertise);
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

    getProvinces() {
        return provinces;
    }

    getDistricts(provinceId) {
        const ds = districts.filter(d => d.province == provinceId);
        if (ds.length) {
            return of(ds[0].districts);
        }
        return of(null);
    }
}
