import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PageService } from 'src/app/pages/page.service';

@Component({
  selector: 'app-perilesional-expertise',
  templateUrl: './perilesional-expertise.component.html',
  styleUrls: ['./perilesional-expertise.component.css']
})
export class PerilesionalExpertiseComponent implements OnInit {

  limit: number = 10;
  offset: number = 1;
  total: number = 1;
  lang;
  loading: boolean = true;
  perilesionalExpertises = [];
  perilesionalExpertisesArr = [];
  MAX_INVENTION_LENGTH = 40;
  componentName = "perilesional_expertises";


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
    this.pageService.getTotalCount('perilesional-expertises', this.lang).subscribe((res: any) => {
      this.total = res;
      this.getPerilesionalExpertises(this.offset);
    }, err => {
      this.loading = false;
      console.log(err);

    });
  }

  getPerilesionalExpertises(offset: number) {
    this.offset = offset;
    let start = (this.offset - 1) * this.limit;
    const graphqlQuery = `
    {
      perilesionalExpertises(locale: "${this.lang}",start:${start},limit:${this.limit}, sort: "published_at:DESC") {
        id
        name
        title
        photos {
          url
        }
      }
    }`;

    if ((this.perilesionalExpertisesArr.length < 1) || (this.perilesionalExpertisesArr.filter(d => d.page === this.offset)).length < 1) {
      this.pageService.getData(graphqlQuery).subscribe((res: any) => {
        this.loading = false;
        const newData = {
          page: offset,
          data: res.data.perilesionalExpertises
        };
        this.perilesionalExpertisesArr.push(newData);
        this.perilesionalExpertises = newData.data;
        console.log("🚀 ~ file: perilesional-expertise.component.ts ~ line 70 ~ PerilesionalExpertiseComponent ~ this.pageService.getData ~ perilesionalExpertisesArr", this.perilesionalExpertisesArr)
      }, err => {
        this.loading = false;
        console.log(err);

      });
    } else {
      this.perilesionalExpertises = (this.perilesionalExpertisesArr.filter(d => d.page === this.offset))[0].data;
    }
  }

  pageChanged(page: number) {
    this.offset = page;
    this.getPerilesionalExpertises(page);
  }


  imageError(el) {
    el.onerror = '';
    el.src = '../../../assets/images/placeholder/img-avatar.png';
    return true;
  }

  redirectToExpertiseDetails(id) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['//inventors-platform/expertise-details/' + id])

    )
  }

  addExpert() {
    this.router.navigateByUrl('/inventors-platform/add-expertise');
  }

}
