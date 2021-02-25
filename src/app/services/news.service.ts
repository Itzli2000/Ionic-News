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
  headLinesPage: number = 0;
  currentCategiory: string = '';
  categoryPage: number = 0;

  constructor(private http: HttpClient) {}

  private runQuery<T>(query: string) {
    query = apiUrl + query;
    return this.http.get<T>(query, { headers: headers });
  }

  getTopHeadlines(country: string = countryDefault) {
    this.headLinesPage++;
    return this.runQuery<ResponseTopHeadlines>(
      `/top-headlines?country=${country}&page=${this.headLinesPage}`
    );
  }

  getTopHeadlinesCategory(category: string, country: string = countryDefault) {
    if (this.currentCategiory === category) {
      this.categoryPage++;
    } else {
      this.categoryPage = 1;
      this.currentCategiory = category;
    }
    return this.runQuery<ResponseTopHeadlines>(
      `/top-headlines?country=${country}&category=${category}&page=${this.categoryPage}`
    );
  }
}
