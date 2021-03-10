import { Article } from './../../models/interfaces';
import { NewsService } from './../../services/news.service';
import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { IonInfiniteScroll, IonSegment } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit, AfterViewInit {
  @ViewChild(IonSegment) segment: IonSegment;
  @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll;

  loadingCategory: string;
  currentCategory: string;
  categories: string[] = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology',
  ];
  news: Article[] = [];

  constructor(private newService: NewsService) {}

  ngOnInit() {
    this.loadNews(this.categories[0]);
    this.currentCategory = this.categories[0];
    this.loadingCategory = `Cargando ${this.categories[0]}...`;
  }

  ngAfterViewInit() {
    this.segment.value = this.categories[0];
  }

  segmentChanged(event: any) {
    const { value } = event.detail;
    this.news = [];
    this.currentCategory = value;
    this.infinite.disabled = false;
    this.loadNews(value, undefined);
  }

  loadNews(category: string, event?: any) {
    this.newService.getTopHeadlinesCategory(category).subscribe((resp) => {
      if (event && resp.articles.length === 0) {
        event.target.complete();
        event.target.disabled = true;
        return;
      }
      this.news.push(...resp.articles);
      if (event) {
        event.target.complete();
        return;
      }
    });
  }

  loadData(event?: any) {
    this.loadNews(this.currentCategory, event);
  }
}
