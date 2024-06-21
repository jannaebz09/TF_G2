import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Subject } from 'rxjs';
import { OptionPay } from '../models/OptionPay';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class OptionPayService {
  private url = `${base_url}/OptionPays`;
  private listaCambio = new Subject<OptionPay[]>();

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<OptionPay[]>(this.url);
  }

  insert(o: OptionPay) {
    return this.httpClient.post(this.url, o);
  }

  setList(listaNueva: OptionPay[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.httpClient.get<OptionPay>(`${this.url}/${id}`);
  }

  update(ou: OptionPay) {
    return this.httpClient.put(this.url, ou);
  }

  eliminar(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getlistByCard() {
    return this.httpClient.get<OptionPay[]>(`${this.url}/listarportarjeta`);
  }
}
