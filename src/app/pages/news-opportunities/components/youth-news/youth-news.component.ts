import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PageService } from 'src/app/pages/page.service';

@Component({
  selector: 'app-youth-news',
  templateUrl: './youth-news.component.html',
  styleUrls: ['./youth-news.component.css']
})
export class YouthNewsComponent implements OnInit {

  lang;
  loading: boolean = false;
  youthNews;
  MAX_NEWS_TITLE_LENGTH = 40;

  constructor(
    private router: Router,
    private translate: TranslateService,
    private pageService: PageService
  ) { }

  ngOnInit(): void {
    this.lang = this.translate.currentLang;
    this.getYouthNews();
  }

  getYouthNews() {
    this.loading = true;
    const graphqlQuery = `
    {
        youthNews(locale: "${this.lang}") {
        id
        title
        contents
        photos {
          url
        }
        publishedAt:published_at
      }
    }`;
    this.pageService.getData(graphqlQuery).subscribe((res: any) => {
      this.loading = false;
      console.log('YouthNews ', res.data);
      this.youthNews = res.data.youthNews;
      for (let news of this.youthNews) {
        news.title = this.getNewsTitle(news.title)
      }
      console.log("🚀 ~ file: youth-news.component.ts ~ line 47 ~ YouthNewsComponent ~ this.pageService.getData ~ youthNews", this.youthNews)
      this.formatDate(this.youthNews);
    }, err => {
      this.loading = false;
      console.log(err);

    });
  }

  getNewsTitle(data) {
    if (data && data.length > this.MAX_NEWS_TITLE_LENGTH) {
      return data.substring(0, this.MAX_NEWS_TITLE_LENGTH) + '...';
    } else {
      return data;
    }
  }

  formatDate(data) {
    data.forEach(element => {
      const date = new Date(element.publishedAt);
      const year = date.getFullYear();
      const month = date.toLocaleString('default', { month: 'long' });
      const day = date.getDate();
      element.createdMonth = month;
      element.createdYear = year;
      element.createdDay = day;
    });
  }

  imageError(el) {
    el.onerror = '';
    el.src = '../../../assets/images/placeholder/img-avatar.png';
    return true;
  }

  showNewsDetails(id) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['//news-opportunities/news-details/' + id])

    )
  }

}
