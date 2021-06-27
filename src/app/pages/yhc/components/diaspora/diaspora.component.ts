import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PageService } from 'src/app/pages/page.service';

@Component({
  selector: 'app-diaspora',
  templateUrl: './diaspora.component.html',
  styleUrls: ['./diaspora.component.css']
})
export class DiasporaComponent implements OnInit {

  lang;
  loading: boolean = false;
  diaspora;
  componentName = "diaspora"

  constructor(
    private translate: TranslateService,
    private pageService: PageService
  ) { }

  ngOnInit(): void {
    this.lang = this.translate.currentLang;
    this.getDiasporaDetails();
  }

  getDiasporaDetails() {
    this.loading = true;
    const graphqlQuery = `{
      diaspora(locale: "${this.lang}") {
      title
      message
      info
      link
      link_name
    }
  } `;
    this.pageService.getData(graphqlQuery).subscribe((res: any) => {
      this.loading = false;
      this.diaspora = res.data.diaspora;
      console.log("🚀 ~ file: diaspora.component.ts ~ line 39 ~ DiasporaComponent ~ this.pageService.getData ~ diaspora", this.diaspora)
    }, err => {
      this.loading = false;
      console.log(err);

    });

  }

}
