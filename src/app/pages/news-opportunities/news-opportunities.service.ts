import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NewsOpportunitiesService {

    constructor(private http: HttpClient) { }

    uploadApplication(application) {
        return this.http.post(`/api/applications`, application);
    }

}
