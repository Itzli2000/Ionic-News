import { Component } from '@angular/core';
import { Article, AsyncEvent } from 'src/app/models/interfaces';
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
    this.loadNews();
  }

  loadNews(event?: AsyncEvent) {
    this.newsService.getTopHeadlines().subscribe((resp) => {
      if(event && resp.articles.length === 0) {
        event.target.complete();
        event.target.disabled = true;
        return;
      }
      this.news.push(...resp.articles);
      if(event) {
        event.target.complete();
        return;
      }
    });
  }

  loadData(event: any) {
    this.loadNews(event);
  }
}
