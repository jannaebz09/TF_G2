import { Injectable } from '@angular/core';
import { ExpCertificate } from '../models/ExpCertificate';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../environments/environment';
import { QuantityUserByInstitutionNameDTO } from '../models/QuantityUserByInstitutionNameDTO';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class ExpcertificateService {
  private url = `${base_url}/ExpCertificates`;
  private listaCambio = new Subject<ExpCertificate[]>();
  constructor(private httpClient: HttpClient) {}
  list() {
    return this.httpClient.get<ExpCertificate[]>(this.url);
  }
  insert(e: ExpCertificate) {
    return this.httpClient.post(this.url, e);
  }
  setList(listaNueva: ExpCertificate[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.httpClient.get<ExpCertificate>(`${this.url}/${id}`);
  }
  update(ue: ExpCertificate) {
    return this.httpClient.put(this.url, ue);
  }

  eliminar(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
  QuantityUserByInstitutionName(): Observable<QuantityUserByInstitutionNameDTO[]> {
    return this.httpClient.get<QuantityUserByInstitutionNameDTO[]>(`${this.url}/usuariosxinstitucion`);
  }
}
