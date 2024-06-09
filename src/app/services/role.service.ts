import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Role } from '../models/Role';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const base_url=environment.base;
@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private url = `${base_url}/Roles`;
  private listaCambio = new Subject<Role[]>();
  constructor(private httpClient: HttpClient) {}
  list() {
    return this.httpClient.get<Role[]>(this.url);
  }
  insert(r: Role) {
    return this.httpClient.post(this.url, r);
  }
  setList(listaNueva: Role[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.httpClient.get<Role>(`${this.url}/${id}`);
  }
  update(ur: Role) {
    return this.httpClient.put(this.url, ur);
  }

  eliminar(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
