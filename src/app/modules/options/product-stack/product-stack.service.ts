import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_RESOURCES } from 'app/core/const/api-resourses';
import { Item } from 'app/core/models/item';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductStackService {
  endpoint = environment.urlService;
  item = API_RESOURCES.item;
  companyCo = API_RESOURCES.company;
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept-Language', '');
  constructor(private http: HttpClient) {}

  getProjects(): Observable<Item[]> {
      return this.http.get<Item[]>(`${this.endpoint}${this.item}`, {headers: this.headers});
  }

  getCompanies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.endpoint}${this.companyCo}`, {headers: this.headers});
}

  saveProject(project: Item) {
      return this.http.post<Item>(`${this.endpoint}${this.item}`, project, {headers: this.headers});
  }

  updateProject(project: Item) {
      return this.http.put<Item>(`${this.endpoint}${this.item}`, project, {headers: this.headers});
  }

  deleteProject(id: string) {
      return this.http.delete(`${this.endpoint}${this.item}${'/'+ id }`, {headers: this.headers});
  }
}
