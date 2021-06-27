import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PageService } from 'src/app/pages/page.service';

@Component({
    selector: 'app-cover',
    templateUrl: './cover.component.html',
    styleUrls: ['./cover.component.css']
})
export class CoverComponent implements OnInit {

    @Input() componentName;
    loading: boolean = false;
    lang;
    cover = "";

    constructor(private translate: TranslateService, private pageService: PageService) { }

    ngOnInit(): void {
        this.lang = this.translate.currentLang;
        this.getCoverPhotoDetails();
    }

    getCoverPhotoDetails() {
        if (this.componentName) {
            const graphqlQuery = `
            {
                coverPhotos(where:{name:"${this.componentName}"}){
                    name
                    cover {
                       url
                    }
                }
            }`;

            this.pageService.getData(graphqlQuery).subscribe((res: any) => {
                this.cover = res?.data?.coverPhotos[0]?.cover?.url;
                console.log("🚀 ~ file: cover.component.ts ~ line 38 ~ CoverComponent ~ this.pageService.getData ~  this.cover ", this.cover)
                this.loading = false;
            }, err => {
                this.loading = false;
                console.log(err);

            });
        }
    }

    imageError(el) {
        el.onerror = '';
        el.src = '../../../assets/images/post-1.jpg';
        return true;
    }



}
