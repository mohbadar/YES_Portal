import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'yes-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    selectedLang;
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

    constructor(private translate: TranslateService,) { }

    ngOnInit(): void {
        if (localStorage.getItem('lang')) {
            this.selectedLang = localStorage.getItem('lang');
        } else {
            this.selectedLang = this.translate.getDefaultLang
        }
    }

    changeLang(lang) {
        console.log('Change Language: ', lang);
        this.selectedLang = lang;
        this.translate.use(lang);
        localStorage.setItem('lang', lang);
        window.location.reload();
    }

}
