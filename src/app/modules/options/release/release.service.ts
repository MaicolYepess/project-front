import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_RESOURCES } from 'app/core/const/api-resourses';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReleaseService {
  endpoint = environment.urlService;
  endpointItem = environment.urlServiceItem;
  item = API_RESOURCES.item;
  companyCo = API_RESOURCES.company;
  types = API_RESOURCES.types;
  stimation = API_RESOURCES.estimationMethod;
  sprint = API_RESOURCES.sprint;
  release = API_RESOURCES.release;
  headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept-Language', '');
  constructor(private http: HttpClient) {}

  getItems(id: any): Observable<any[]> {
      return this.http.get<any[]>(`${this.endpointItem}${this.item}${'/project/' + id}`, {
          headers: this.headers,
      });
  }

  getCompanies(): Observable<any[]> {
      return this.http.get<any[]>(`${this.endpoint}${this.companyCo}`, {
          headers: this.headers,
      });
  }

  saveRelease(release: any) {
      return this.http.post<any>(`${this.endpointItem}${this.release}`, release, {
          headers: this.headers,
      });
  }

  updateProject(project: any) {
      return this.http.put<any>(`${this.endpoint}${this.item}`, project, {
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

  getTypes(): Observable<any[]> {
      return this.http.get<any[]>(`${this.endpointItem}${this.types}`, {
          headers: this.headers,
      });
  }

  getEstimation(): Observable<any[]> {
      return this.http.get<any[]>(`${this.endpointItem}${this.stimation}`, {
          headers: this.headers,
      });
  }

  getReleases(id : any): Observable<any> {
       return this.http.get(`${this.endpointItem}${this.release}${'/project/' + id}`, {
           headers: this.headers,
       });
  }
}
