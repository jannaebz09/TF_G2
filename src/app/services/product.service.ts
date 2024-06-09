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
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Product[]>(this.url);
  }

  insert(p: Product) {
    return this.http.post(this.url, p);
  }
  setList(listaNueva: Product[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable()
  }

}