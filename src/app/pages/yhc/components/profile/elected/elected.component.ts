import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PageService } from 'src/app/pages/page.service';

@Component({
  selector: 'app-elected',
  templateUrl: './elected.component.html',
  styleUrls: ['./elected.component.css']
})
export class ElectedComponent implements OnInit {

  componentName = "yhc_elected"
  lang;
  loading: boolean = false;
  electedProfiles: any[] = [];
  MAX_BRIEF_LENGTH = 40;
  elected;


  constructor(
    private router: Router,
    private translate: TranslateService,
    private pageService: PageService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.lang = this.translate.currentLang;
    console.log("Router Profile", this.router.url);
    this.elected = this.activatedRoute.snapshot.url[0].path;
    console.log("elected profile", this.elected);
    this.getElectedProfiles();

  }

  getElectedProfiles() {
    this.loading = true;
    const graphQuery = `
    {
      yhcProfileTypes(where: {slug: "${this.elected}"}) {
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
      this.electedProfiles = res.data.yhcProfileTypes[0].yhc_profiles;
      console.log("responseeeeeeeeeeeeee", this.electedProfiles);

      console.log("🚀 ~ file: elected.component.ts ~ line 41 ~ ElectedComponent ~ this.pageService.getData ~ electedProfiles", this.electedProfiles)
      for (let elected of this.electedProfiles) {
        elected.shortBrief = this.getBrief(elected.brief);
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

  // redirectToStoryDetails(id) {
  //     console.log("🚀 ~ file: success-stories.component.ts ~ line 56 ~ SuccessStoriesComponent ~ redirectToStoryDetails ~ id", id)
  //     this.router.navigate(['//', id])
  // }

}
