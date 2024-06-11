import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Comment } from '../models/Comment';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private url = `${base_url}/Comments`;
  private listaCambio = new Subject<Comment[]>();
  constructor(private httpClient: HttpClient) {}
  list() {
    return this.httpClient.get<Comment[]>(this.url);
  }
  insert(s: Comment) {
    return this.httpClient.post(this.url, s);
  }
  setList(listaNueva: Comment[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.httpClient.get<Comment>(`${this.url}/${id}`);
  }
  update(us: Comment) {
    return this.httpClient.put(this.url, us);
  }

  eliminar(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}