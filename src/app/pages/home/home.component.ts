import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PageService } from '../page.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  coverDetails;
  lang;
  imageUrl = 'assets/images/afg-cover2.jpg';

  constructor(
    private pageService: PageService,
    private translate: TranslateService
  ) { }

  languages = [
    {
      name: 'English',
      icon: 'us.png',
      value: 'en'
    }, {
      name: 'پښتو',
      icon: 'afg.png',
      value: 'ps'
    }, {
      name: 'دری',
      icon: 'afg.png',
      value: 'dr'
    }
  ];


  ngOnInit(): void {

    this.lang = this.translate.currentLang;
    console.log('Current Lang: ', this.lang);
    this.getCoverDetails();
  }



  getCoverDetails() {
    const graphQuery = `{cover {slogan:slogan_${this.lang} quote:quote_${this.lang} quotee_name:quotee_name_${this.lang} media{url} }}`;
    this.pageService.getCoverDetails(graphQuery).subscribe((res: any) => {
      this.coverDetails = res.data.cover;
      console.log(' data: ', this.coverDetails);
    }, err => {
      console.log(err);

    });
  }

}
