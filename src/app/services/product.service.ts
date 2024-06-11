import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/Product';
import { Subject } from 'rxjs';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private url = `${base_url}/Products`;
  private listaCambio = new Subject<Product[]>();
  constructor(private httpClient: HttpClient) {}
  list() {
    return this.httpClient.get<Product[]>(this.url);
  }
  insert(p: Product) {
    return this.httpClient.post(this.url, p);
  }
  setList(listaNueva: Product[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.httpClient.get<Product>(`${this.url}/${id}`);
  }
  update(up: Product) {
    return this.httpClient.put(this.url, up);
  }

  eliminar(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

}