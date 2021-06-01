import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'YES';

  lang;


  constructor(
    private translate: TranslateService,
  ) { }


  ngOnInit(): void {
    this.translate.setDefaultLang('dr');
    this.languageListener();
    if (localStorage.getItem('lang')) {
      this.lang = localStorage.getItem('lang');
    } else {
      // default is dari
      console.log('No lang selected: ');

      this.lang = 'dr';
      localStorage.setItem('lang', this.lang);
    }

    this.translate.use(this.lang);
  }


  changeAppDirection(lang) {

    console.log('Change Application Direction: ', lang);

    if (lang == 'en') {
      document.body.classList.remove('rtl');
      document.body.classList.add('ltr');
      document.body.dir = 'ltr';

    } else {
      document.body.classList.remove('ltr');
      document.body.classList.add('rtl');
      document.body.dir = 'rtl';
    }
  }

  languageListener() {
    this.translate.onLangChange.subscribe(lang => {
      console.log('Language Listener: ', lang);

      localStorage.setItem('lang', lang.lang);
      this.changeAppDirection(lang.lang);
    })
  }


}
