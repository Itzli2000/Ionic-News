import { ResponseTopHeadlines } from './../../models/interfaces';
import { Component } from '@angular/core';
import { Article } from 'src/app/models/interfaces';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  news: Article[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService.getTopHeadlines().subscribe((resp) => {
      this.news.push(...resp.articles);
    });
  }
}
