import { Article } from './../../models/interfaces';
import { NewsService } from './../../services/news.service';
import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit, AfterViewInit {
  @ViewChild(IonSegment) segment: IonSegment;

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
  }

  ngAfterViewInit() {
    this.segment.value = this.categories[0];
  }

  segmentChanged(event: CustomEvent) {
    const { value } = event.detail;
    this.news = [];
    this.loadNews(value);
  }

  loadNews(category: string) {
    this.newService
      .getTopHeadlinesCategory(category)
      .subscribe((resp) => this.news.push(...resp.articles));
  }
}
