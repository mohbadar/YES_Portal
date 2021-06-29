import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PageService } from '../../page.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  componentName = "surveys";
  lang;
  loading: boolean = false;
  surveys;
  showLinks = false;

  constructor(
    private translate: TranslateService,
    private pageService: PageService
  ) {
  }

  ngOnInit(): void {
    this.lang = this.translate.currentLang;
    this.getDiasporaDetails();
    let currentDate = new Date();
    console.log("🚀 ~ file: survey.component.ts ~ line 27 ~ SurveyComponent ~ ngOnInit ~ currentDate", currentDate)

  }

  getDiasporaDetails() {
    this.loading = true;
    const graphqlQuery = `
    {
      surveys(locale: "${this.lang}") {
        title
        description
        start_date
        link
        end_date
        attachment {
          url
        }
      }
    }
  `;
    this.pageService.getData(graphqlQuery).subscribe((res: any) => {
      this.loading = false;
      this.surveys = res.data.surveys;
      this.formatDate(this.surveys);
      console.log("🚀 ~ file: survey.component.ts ~ line 46 ~ SurveyComponent ~ this.pageService.getData ~ surveys", this.surveys)
    }, err => {
      this.loading = false;
      console.log(err);

    });

  }


  formatDate(data) {
    if (data) {
      data.forEach(element => {
        const date = new Date(element.end_date);
        console.log("🚀 ~ file: survey.component.ts ~ line 66 ~ SurveyComponent ~ formatDate ~ date neewdate", date);
        let currenDate = new Date();
        if (currenDate > date) {
          element.showLinks = false;
        } else {
          element.showLinks = true;
        }

      });
    }
  }

}
