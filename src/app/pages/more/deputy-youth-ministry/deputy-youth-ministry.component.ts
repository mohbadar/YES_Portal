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
  loading: boolean = true;
  youthActivites = [];
  youthActivitesArr = [];
  MAX_ACTIVITY_TITLE_LENGTH = 40;
  limit: number = 10;
  offset: number = 1;
  total: number = 1;

  constructor(
    private router: Router,
    private translate: TranslateService,
    private pageService: PageService
  ) { }

  ngOnInit(): void {
    this.lang = this.translate.currentLang;
    this.getTotal();
  }


  getTotal() {
    this.pageService.getTotalCount('youth-deputy-ministry-activities', this.lang).subscribe((res: any) => {
      this.total = res;
      this.getYouthMinistryActivities(this.offset);
    }, err => {
      this.loading = false;
      console.log(err);

    });
  }

  getYouthMinistryActivities(offset: number) {
    this.offset = offset;
    let start = (this.offset - 1) * this.limit;
    const graphqlQuery = `
    {
      youthDeputyMinistryActivities(locale: "${this.lang}",start:${start},limit:${this.limit}, sort: "published_at:DESC"){
        id
        title
        photos {
          url
        }
        publishedAt:published_at
      }
    }`;

    if ((this.youthActivitesArr.length < 1) || (this.youthActivitesArr.filter(d => d.page === this.offset)).length < 1) {
      this.pageService.getData(graphqlQuery).subscribe((res: any) => {
        this.loading = false;
        const newData = {
          page: offset,
          data: this.formatDate(res.data.youthDeputyMinistryActivities)
        };
        this.youthActivitesArr.push(newData);
        this.youthActivites = newData.data;
      }, err => {
        this.loading = false;
        console.log(err);

      });
    } else {
      this.youthActivites = (this.youthActivitesArr.filter(d => d.page === this.offset))[0].data;
    }
  }

  formatDate(data) {
    data.forEach(element => {
      element.title = this.getActivityTitle(element.title)
      const date = new Date(element.publishedAt);
      const year = date.getFullYear();
      const month = date.toLocaleString('default', { month: 'long' });
      const day = date.getDate();
      element.createdMonth = month;
      element.createdYear = year;
      element.createdDay = day;
    });
    return data;
  }

  getActivityTitle(data) {
    if (data && data.length > this.MAX_ACTIVITY_TITLE_LENGTH) {
      return data.substring(0, this.MAX_ACTIVITY_TITLE_LENGTH) + '...';
    } else {
      return data;
    }
  }

  pageChanged(page: number) {
    this.offset = page;
    this.getYouthMinistryActivities(page);
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
