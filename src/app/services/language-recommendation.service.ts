import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageRecommendationService {
  private apiUrl = '/api/language-recommendation/recommend';

  constructor(private http: HttpClient) {}
  recommendLanguage(inputData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, inputData);
  }
}
