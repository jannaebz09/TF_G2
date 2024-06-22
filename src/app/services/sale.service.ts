import { Injectable } from '@angular/core';
import { Sale } from '../models/Sale';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { SaleByUserDTO } from '../models/SaleByUserDTO';
import { TopUsersWithMostSalesDTO } from '../models/TopUsersWithMostSalesDTO';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class SaleService {
  private url = `${base_url}/Sales`;
  private listaCambio = new Subject<Sale[]>();
  constructor(private httpClient: HttpClient) {}
  list() {
    return this.httpClient.get<Sale[]>(this.url);
  }
  insert(s: Sale) {
    return this.httpClient.post(this.url, s);
  }
  setList(listaNueva: Sale[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.httpClient.get<Sale>(`${this.url}/${id}`);
  }
  update(us: Sale) {
    return this.httpClient.put(this.url, us);
  }

  eliminar(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
  getTotalSalebyDate(startDate: string, endDate: string) {
    let params = new HttpParams().set('Dia_inicial', startDate).set('Dia_final', endDate);
    return this.httpClient.get<number>(`${this.url}/sumatotal`, { params });
  }
  saleByUser(): Observable<SaleByUserDTO[]> {
    return this.httpClient.get<SaleByUserDTO[]>(`${this.url}/cantidades`);
  }
  TopUsersWithMostSales(Dia_inicial: string, Dia_final: string): Observable<TopUsersWithMostSalesDTO[]> {
    let params = new HttpParams().set('Dia_inicial', Dia_inicial).set('Dia_final', Dia_final);
    return this.httpClient.get<TopUsersWithMostSalesDTO[]>(`${this.url}/UsuariosTop`, {params});
  }
  
}
