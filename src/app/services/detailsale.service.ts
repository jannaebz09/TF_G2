import { Injectable } from '@angular/core';
import { DetailSale } from '../models/DetailSale';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from '../environments/environment';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class DetailsaleService {
  private url = `${base_url}/DetailSales`;
  private listaCambio = new Subject<DetailSale[]>();
  constructor(private httpClient: HttpClient) {}
  list() {
    return this.httpClient.get<DetailSale[]>(this.url);
  }
  insert(d: DetailSale) {
    return this.httpClient.post(this.url, d);
  }
  setList(listaNueva: DetailSale[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.httpClient.get<DetailSale>(`${this.url}/${id}`);
  }
  update(ud: DetailSale) {
    return this.httpClient.put(this.url, ud);
  }

  eliminar(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
