import { Injectable } from '@angular/core';
import { SpRecipe } from '../models/Sp-recipe';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { OrderByQualificationAverageDTO } from '../models/OrderByQualificationAverageDTO';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class SpRecipeService {
  private url = `${base_url}/Sp_recipes`;
  private listaCambio = new Subject<SpRecipe[]>();
  constructor(private httpClient: HttpClient) {}
  list() {
    return this.httpClient.get<SpRecipe[]>(this.url);
  }
  insert(s: SpRecipe) {
    return this.httpClient.post(this.url, s);
  }
  setList(listaNueva: SpRecipe[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.httpClient.get<SpRecipe>(`${this.url}/${id}`);
  }
  update(us: SpRecipe) {
    return this.httpClient.put(this.url, us);
  }

  eliminar(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
  orderbyqualification() {
    return this.httpClient.get<OrderByQualificationAverageDTO>(`${this.url}/mejoresrecetas`);
  }
}