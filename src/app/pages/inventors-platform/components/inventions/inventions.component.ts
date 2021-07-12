import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PageService } from 'src/app/pages/page.service';

@Component({
  selector: 'app-inventions',
  templateUrl: './inventions.component.html',
  styleUrls: ['./inventions.component.css']
})
export class InventionsComponent implements OnInit {

  lang;
  loading: boolean = true;
  inventors = [];
  inventorsArr = [];
  MAX_INVENTION_LENGTH = 30;
  componentName = "inventions";
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
    this.pageService.getTotalCount('inventions', this.lang).subscribe((res: any) => {
      this.total = res;
      this.getInventors(this.offset);
    }, err => {
      this.loading = false;
      console.log(err);

    });
  }

  getInventors(offset: number) {
    this.offset = offset;
    let start = (this.offset - 1) * this.limit;
    const graphqlQuery = `
    {
      inventions(locale: "${this.lang}",start:${start},limit:${this.limit}, sort: "published_at:DESC") {
        id
        title
        contents
        inventor_name
        photos {
          url
        }
      }
    }`;

    if ((this.inventorsArr.length < 1) || (this.inventorsArr.filter(d => d.page === this.offset)).length < 1) {
      this.pageService.getData(graphqlQuery).subscribe((res: any) => {
        this.loading = false;
        const newData = {
          page: offset,
          data: this.formatTitle(res.data.inventions)
        };
        this.inventorsArr.push(newData);
        this.inventors = newData.data;
      }, err => {
        this.loading = false;
        console.log(err);

      });
    } else {
      this.inventors = (this.inventorsArr.filter(d => d.page === this.offset))[0].data;
    }
  }

  pageChanged(page: number) {
    this.offset = page;
    this.getInventors(page);
  }

  formatTitle(data) {
    data.forEach(element => {
      element.title = this.getInventionTitle(element.title)
    });
    return data;
  }

  getInventionTitle(data) {
    if (data && data.length > this.MAX_INVENTION_LENGTH) {
      return data.substring(0, this.MAX_INVENTION_LENGTH) + '...';
    } else {
      return data;
    }
  }

  imageError(el) {
    el.onerror = '';
    el.src = '../../../assets/images/placeholder/img-avatar.png';
    return true;
  }

  redirectToInventorDetails(id) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['//inventors-platform/inventor-details/' + id])

    )
  }

  addInventor() {
    this.router.navigateByUrl('/inventors-platform/add-inventor');
  }

}
