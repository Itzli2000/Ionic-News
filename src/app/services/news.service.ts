import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseTopHeadlines } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) {}

  getTopHeadlines() {
    return this.http.get<ResponseTopHeadlines>(
      `http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=f230cb9491824028adeb7b2cbc5e1a23`
    );
  }
}
