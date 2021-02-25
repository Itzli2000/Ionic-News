import { NewsService } from './../../services/news.service';
import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { ResponseTopHeadlines } from 'src/app/models/interfaces';

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

  constructor(
    private newService: NewsService,
  ) {}

  ngOnInit() {
    this.newService.getTopHeadlinesCategory(this.categories[0]).subscribe((resp) => {
      console.log(resp)
    });
  }

  ngAfterViewInit() {
    this.segment.value = this.categories[0];
  }
}
