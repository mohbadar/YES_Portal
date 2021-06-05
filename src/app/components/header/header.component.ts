import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PageService } from 'src/app/pages/page.service';

@Component({
    selector: 'yes-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    menuList;
    selectedLang;
    lang;
    menuQuery;


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

    constructor(private translate: TranslateService,
        private pageService: PageService) { }

    ngOnInit(): void {



        if (localStorage.getItem('lang')) {
            this.lang = localStorage.getItem('lang');
        } else {
            this.lang = this.translate.getDefaultLang
        }
        console.log('------ language: ', this.lang);

        this.menuQuery = `{categories(sort: "order") { _id, title:title_${this.lang},slug, subcategories { title:title_${this.lang}, slug}}}`;

        this.getMenuList();
    }

    changeLang(lang) {
        console.log('Change Language: ', lang);
        this.selectedLang = lang;
        this.translate.use(lang);
        localStorage.setItem('lang', lang);
        window.location.reload();
    }

    getMenuList() {
        this.pageService.getMenuList(this.menuQuery).subscribe((menuList: any) => {
            console.log('Menu List : ', menuList);
            this.menuList = menuList.data.categories;
        });

    }

}
