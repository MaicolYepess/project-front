import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_RESOURCES } from 'app/core/const/api-resourses';
import { Project } from 'app/core/models/proyect';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  endpoint = environment.urlService;
  project = API_RESOURCES.project;
  companyCo = API_RESOURCES.company;
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept-Language', '');
  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
      return this.http.get<Project[]>(`${this.endpoint}${this.project}`, {headers: this.headers});
  }

  getCompanies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.endpoint}${this.companyCo}`, {headers: this.headers});
}

  saveProject(project: Project) {
      return this.http.post<Project>(`${this.endpoint}${this.project}`, project, {headers: this.headers});
  }

  updateProject(project: Project) {
      return this.http.put<Project>(`${this.endpoint}${this.project}`, project, {headers: this.headers});
  }

  deleteProject(id: string) {
      return this.http.delete(`${this.endpoint}${this.project}${'/'+ id }`, {headers: this.headers});
  }
}
