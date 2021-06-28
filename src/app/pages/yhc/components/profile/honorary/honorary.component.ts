import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PageService } from 'src/app/pages/page.service';

@Component({
  selector: 'app-honorary',
  templateUrl: './honorary.component.html',
  styleUrls: ['./honorary.component.css']
})
export class HonoraryComponent implements OnInit {

  componentName = "yhc_honorary"
  lang;
  loading: boolean = false;
  honoraryProfiles: any[] = [];
  MAX_BRIEF_LENGTH = 40;
  honorary;


  constructor(
    private router: Router,
    private translate: TranslateService,
    private pageService: PageService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.lang = this.translate.currentLang;
    console.log("Router Profile", this.router.url);
    this.honorary = this.activatedRoute.snapshot.url[0].path;
    console.log("honorary profile", this.honorary);
    this.getHonoraryProfiles();

  }

  getHonoraryProfiles() {
    this.loading = true;
    const graphQuery = `
    {
      yhcProfileTypes(where: {slug: "${this.honorary}"}) {
        yhc_profiles(where: {locale: "${this.lang}"}) {
          id
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
      this.honoraryProfiles = res.data.yhcProfileTypes[0].yhc_profiles;
      console.log("responseeeeeeeeeeeeees", this.honoraryProfiles);
      for (let honorary of this.honoraryProfiles) {
        honorary.shortBrief = this.getBrief(honorary.brief);
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

  redirectToProfileDetails(id) {
    this.router.navigate(['/yhc/profile/profile-details/honorary', id])
  }

}
