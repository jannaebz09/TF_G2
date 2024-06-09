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
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<OptionPay[]>(this.url);
  }

  insert(o: OptionPay) {
    return this.http.post(this.url, o);
  }
  setList(listaNueva: OptionPay[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable()
  }
}