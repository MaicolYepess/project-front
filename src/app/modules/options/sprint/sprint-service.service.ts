import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_RESOURCES } from 'app/core/const/api-resourses';
import { Item } from 'app/core/models/item';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SprintServiceService {
  endpoint = environment.urlService;
  endpointItem = environment.urlServiceItem;
  item = API_RESOURCES.item;
  companyCo = API_RESOURCES.company;
  types = API_RESOURCES.types;
  stimation = API_RESOURCES.estimationMethod;
  sprint = API_RESOURCES.sprint;
  headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept-Language', '');
  constructor(private http: HttpClient) {}

  saveSprint(sprint: any) {
      return this.http.post<Item>(`${this.endpointItem}${this.sprint}`, sprint, {
          headers: this.headers,
      });
  }

  updateProject(project: Item) {
      return this.http.put<Item>(`${this.endpoint}${this.item}`, project, {
          headers: this.headers,
      });
  }

  deleteProject(id: string) {
      return this.http.delete(`${this.endpoint}${this.item}${'/' + id}`, {
          headers: this.headers,
      });
  }

  getSprintsProject(id: string) {
      return this.http.get(`${this.endpointItem}${this.sprint}${'/' + id}`, {
          headers: this.headers,
      });
  }
}
