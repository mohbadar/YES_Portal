import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class YhcService {

  constructor(private http: HttpClient) { }

  yhcMembership(membership) {
    return this.http.post(`/api/yhc-memberships`, membership);
  }
}
