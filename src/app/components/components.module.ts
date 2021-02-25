import { IonicModule } from '@ionic/angular';
import { ArticleComponent } from './article/article.component';
import { NewsComponent } from './news/news.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [NewsComponent, ArticleComponent],
  exports: [NewsComponent, ArticleComponent],
  imports: [CommonModule, IonicModule],
})
export class ComponentsModule {}
