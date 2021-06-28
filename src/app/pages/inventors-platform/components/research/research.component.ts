import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PageService } from 'src/app/pages/page.service';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})
export class ResearchComponent implements OnInit {

  lang;
  loading: boolean = true;
  research = [];
  researchArr = [];
  MAX_RESEARCH_LENGTH = 30;
  componentName = "research_papers";
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
    this.pageService.getTotalCount('research-papers', this.lang).subscribe((res: any) => {
      this.total = res;
      this.getResearchers(this.offset);
    }, err => {
      this.loading = false;
      console.log(err);

    });
  }

  getResearchers(offset: number) {
    this.offset = offset;
    let start = (this.offset - 1) * this.limit;
    const graphqlQuery = `
    {
      researchPapers(locale: "${this.lang}",start:${start},limit:${this.limit}, sort: "published_at:DESC") {
        id
        name
        title
        photos {
          url
        }
      }
    }`;

    if ((this.researchArr.length < 1) || (this.researchArr.filter(d => d.page === this.offset)).length < 1) {
      this.pageService.getData(graphqlQuery).subscribe((res: any) => {
        this.loading = false;
        const newData = {
          page: offset,
          data: this.formatTitle(res.data.researchPapers)
        };
        this.researchArr.push(newData);
        this.research = newData.data;

      }, err => {
        this.loading = false;
        console.log(err);

      });
    } else {
      this.research = (this.researchArr.filter(d => d.page === this.offset))[0].data;
    }
  }

  pageChanged(page: number) {
    this.offset = page;
    this.getResearchers(page);
  }

  formatTitle(data) {
    data.forEach(element => {
      element.title = this.getResearchTitle(element.title)
    });
    return data;
  }

  getResearchTitle(data) {
    if (data && data.length > this.MAX_RESEARCH_LENGTH) {
      return data.substring(0, this.MAX_RESEARCH_LENGTH) + '...';
    } else {
      return data;
    }
  }


  imageError(el) {
    el.onerror = '';
    el.src = '../../../assets/images/placeholder/img-avatar.png';
    return true;
  }


  redirectToResearchDetails(id) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['//inventors-platform/research-details/' + id])

    )
  }

  addResearch() {
    this.router.navigateByUrl('/inventors-platform/add-research');
  }

}
