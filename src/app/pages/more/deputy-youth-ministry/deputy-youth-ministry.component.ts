import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PageService } from '../../page.service';

@Component({
  selector: 'app-deputy-youth-ministry',
  templateUrl: './deputy-youth-ministry.component.html',
  styleUrls: ['./deputy-youth-ministry.component.css']
})
export class DeputyYouthMinistryComponent implements OnInit {

  componentName = "deputy_ministry_of_youth_affairs";
  lang;
  loading: boolean = false;
  youthActivites;
  MAX_ACTIVITY_TITLE_LENGTH = 40;

  constructor(
    private router: Router,
    private translate: TranslateService,
    private pageService: PageService
  ) { }

  ngOnInit(): void {
    this.lang = this.translate.currentLang;
    this.getYouthMinistryActivities();
  }

  getYouthMinistryActivities() {
    this.loading = true;
    const graphqlQuery = `
    {
      youthDeputyMinistryActivities(locale: "${this.lang}"){
        id
        title
        photos {
          url
        }
        publishedAt:published_at
      }
    }`;
    this.pageService.getData(graphqlQuery).subscribe((res: any) => {
      this.loading = false;
      console.log('youthActivites ', res.data);
      this.youthActivites = res.data.youthDeputyMinistryActivities;
      console.log("🚀 ~ file: deputy-youth-ministry.component.ts ~ line 46 ~ DeputyYouthMinistryComponent ~ this.pageService.getData ~ youthActivites", this.youthActivites)
      for (let activity of this.youthActivites) {
        activity.title = this.getActivityTitle(activity.title)
      }
      this.formatDate(this.youthActivites);
    }, err => {
      this.loading = false;
      console.log(err);

    });
  }

  getActivityTitle(data) {
    if (data && data.length > this.MAX_ACTIVITY_TITLE_LENGTH) {
      return data.substring(0, this.MAX_ACTIVITY_TITLE_LENGTH) + '...';
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

  showActivityDetails(id) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['//more/activity-details/' + id])

    )
  }

}
