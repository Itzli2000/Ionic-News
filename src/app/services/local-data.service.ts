import { Article } from 'src/app/models/interfaces';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class LocalDataService {
  news: Article[] = [];

  constructor(private storage: Storage) {
    this.loadNews();
  }

  saveNews(article: Article) {
    const exist = this.news.find(
      (localArticle: Article) => localArticle.title === article.title
    );
    if (!exist) {
      this.news.unshift(article);
    }
    this.storage.set('favorites', this.news);
  }

  async loadNews() {
    const favs = await this.storage.get('favorites');
    if (favs) {
      this.news = favs;
    }
  }

  deleteNews(article: Article) {
    this.news = this.news.filter(
      (articleInner) => articleInner.title !== article.title
    );
    this.storage.set('favorites', this.news);
  }
}
