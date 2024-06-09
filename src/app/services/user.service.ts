import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/User';
import { environment } from '../environments/environment';
const base_url=environment.base;
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = `${base_url}/Users`;
  private listaCambio = new Subject<User[]>();
  constructor(private httpClient: HttpClient) {}
  list() {
    return this.httpClient.get<User[]>(this.url);
  }
  insert(u: User) {
    return this.httpClient.post(this.url, u);
  }
  setList(listaNueva: User[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.httpClient.get<User>(`${this.url}/${id}`);
  }
  update(uu: User) {
    return this.httpClient.put(this.url, uu);
  }

  eliminar(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
