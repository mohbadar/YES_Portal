import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PageService } from 'src/app/pages/page.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {

  lang;
  loading: boolean = false;
  profileId;
  profileDetails;
  slug;
  componentName = "profile_details";

  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService,
    private pageService: PageService,
    private router: Router,
  ) {
    console.log("Router", this.router.url);
    // this.slug = this.route.snapshot.url[0].path;
    // console.log("elected profile", this.slug);
    // this.profileId = this.route.snapshot.url[1].path;
    this.route.params.subscribe((params) => {
      this.profileId = params['id']
      console.log("🚀 ~ file: profile-details.component.ts ~ line 32 ~ ProfileDetailsComponent ~ profileId", this.profileId)
      this.slug = params['slug'];
      console.log("🚀 ~ file: profile-details.component.ts ~ line 34 ~ ProfileDetailsComponent ~ slug", this.slug)
      this.lang = this.translate.currentLang;
      this.getProfileDetails();
    })
  }

  ngOnInit(): void {
    // this.getProfileDetails();

  }

  getProfileDetails() {

    this.loading = true;
    const graphQuery = `
      {
        yhcProfileTypes(where: {slug: "${this.slug}"}) {
          yhc_profiles(where: {locale: "${this.lang}", id: "${this.profileId}"}) {
            name
            description
            brief
            photo {
              url
            }
           
          }
          
        }
      }
      
      `;
    console.log("🚀 ~ file: profile-details.component.ts ~ line 49 ~ ProfileDetailsComponent ~ getProfileDetails ~ graphQuery", graphQuery)

    this.pageService.getData(graphQuery).subscribe((res: any) => {
      this.loading = false;
      this.profileDetails = res.data.yhcProfileTypes[0].yhc_profiles[0];
      console.log("responseeeeeeeeeeeeees", this.profileDetails);
      console.log('data----------- ', res);

    });

  }
}
