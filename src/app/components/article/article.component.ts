import { LocalDataService } from './../../services/local-data.service';
import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/models/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  @Input() article: Article;
  @Input() index: number;

  constructor(
    private iab: InAppBrowser,
    private socialSharing: SocialSharing,
    private localDataService: LocalDataService,
    public actionSheetController: ActionSheetController,
  ) {}

  ngOnInit() {}

  openArticle() {
    const browser = this.iab.create(this.article.url, '_system');
  }

  async launchMenu() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: 'Compartir',
          icon: 'share-outline',
          cssClass: 'action-dark',
          handler: () => {
            this.socialSharing.share(
              this.article.title,
              this.article.source.name,
              '',
              this.article.url
            );
          },
        },
        {
          text: 'Favorito',
          icon: 'star-outline',
          cssClass: 'action-dark',
          handler: () => {
            console.log('Favorite clicked');
            this.localDataService.saveNews(this.article);
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          cssClass: 'action-dark',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await actionSheet.present();
  }
}
