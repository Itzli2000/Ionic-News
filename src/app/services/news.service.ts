import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseTopHeadlines } from '../models/interfaces';
import { environment } from './../../environments/environment';

const apiKey: string = environment.apiKey;
const apiUrl: string = environment.apiUrl;
const countryDefault: string = environment.country;

const headers = new HttpHeaders({
  'X-Api-key': apiKey,
});

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) {}

  private runQuery<T>(query: string) {
    query = apiUrl + query;
    return this.http.get<T>(query, { headers: headers });
  }

  getTopHeadlines(country: string = countryDefault) {
    return this.runQuery<ResponseTopHeadlines>(`/top-headlines?country=${country}`);
  }

  getTopHeadlinesCategory(category: string, country: string = countryDefault) {
    return this.runQuery<ResponseTopHeadlines>(`/top-headlines?country=${country}&category=${category}`);
  }
}
