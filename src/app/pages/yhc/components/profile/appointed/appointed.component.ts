import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PageService } from 'src/app/pages/page.service';

@Component({
  selector: 'app-appointed',
  templateUrl: './appointed.component.html',
  styleUrls: ['./appointed.component.css']
})
export class AppointedComponent implements OnInit {


  lang;
  loading: boolean = false;
  appointedProfiles: any[] = [];
  MAX_BRIEF_LENGTH = 40;
  appointed;


  constructor(
    private router: Router,
    private translate: TranslateService,
    private pageService: PageService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.lang = this.translate.currentLang;
    console.log("Router Profile", this.router.url);
    this.appointed = this.activatedRoute.snapshot.url[0].path;
    console.log("appointed profile", this.appointed);
    this.getAppointedProfiles();

  }

  getAppointedProfiles() {
    this.loading = true;
    const graphQuery = `
    {
      yhcProfileTypes(where: {slug: "${this.appointed}"}) {
        yhc_profiles(where: {locale: "${this.lang}"}) {
          name
          brief
          photo {
            url
          }
         
        }
        
      }
    }
    `;
    this.pageService.getData(graphQuery).subscribe((res: any) => {
      this.loading = false;
      this.appointedProfiles = res.data.yhcProfileTypes[0].yhc_profiles;
      console.log("responseeeeeeeeeeeeees", this.appointedProfiles);
      for (let appointed of this.appointedProfiles) {
        appointed.shortBrief = this.getBrief(appointed.brief);
      }
    });
  }

  getBrief(data) {
    if (data && data.length > this.MAX_BRIEF_LENGTH) {
      return data.substring(0, this.MAX_BRIEF_LENGTH) + '...';
    } else {
      return data;
    }
  }

  imageError(el) {
    el.onerror = '';
    el.src = '../../../../../assets/images/post-1.jpg';
    return true;
  }

}
