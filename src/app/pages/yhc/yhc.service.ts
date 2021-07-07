import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class YhcService {

  constructor(private http: HttpClient) { }

  electionsRegistration(type, membership) {
    return this.http.post(`/api/` + type, membership);
  }

  yhcMembership(membership) {
    return this.http.post(`/api/yhc-memberships`, membership);
  }
}
