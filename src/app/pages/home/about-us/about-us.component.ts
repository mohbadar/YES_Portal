import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PageService } from '../../page.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  lang;
  loading: boolean = false;
  aboutUs;


  constructor(
    private translate: TranslateService,
    private pageService: PageService
  ) { }

  ngOnInit(): void {
    this.lang = this.translate.currentLang;
    this.getAboutUsDetails();
  }


  getAboutUsDetails() {
    this.loading = true;
    const graphQuery = `{
        aboutUs(locale: "${this.lang}") {
        id
        title
        brief
        mission
        vision
        description
        photos {
          url
        }
      }
    }`;
    this.pageService.getData(graphQuery).subscribe((res: any) => {
      this.loading = false;
      this.aboutUs = res.data.aboutUs;
      console.log('ABOUT-US: ', this.aboutUs);
    }, err => {
      this.loading = false;
      console.log(err);

    });
  }

}
