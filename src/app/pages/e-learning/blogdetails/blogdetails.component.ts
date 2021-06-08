import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PageService } from '../../page.service';

@Component({
  selector: 'app-blogdetails',
  templateUrl: './blogdetails.component.html',
  styleUrls: ['./blogdetails.component.css']
})
export class BlogdetailsComponent implements OnInit {

  blogSlug;
  lang;
  blogId
  blogDetails;

  constructor(private pageService: PageService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.blogId = this.route.snapshot.paramMap.get('_id');
    this.blogSlug = this.route.snapshot.paramMap.get('slug');
    console.log("🚀 ~ file: blogdetails.component.ts ~ line 27 ~ BlogdetailsComponent ~ ngOnInit ~ blogSlug", this.blogSlug)
    console.log("blog id", this.blogId);

    this.lang = this.translate.currentLang;
    console.log('Current Lang: ', this.lang);
    this.getblogDetails();


  }


  getblogDetails() {
    this.spinner.show();
    const graphQuery = `
    {
      blogs(
        where:{ _id:"${this.blogId}" slug:"${this.blogSlug}"}
      ) {
        title: title_${this.lang},
        brief: brief_${this.lang},
        body: body_${this.lang},
         author: author_${this.lang}
       image {
         url
       }
       
      }
   }`;
    this.pageService.getRecentBlogs(graphQuery).subscribe((res: any) => {
      this.spinner.hide();
      console.log('blog Details->: ', res);
      this.blogDetails = res.data.blogs[0];
    }, err => {
      this.spinner.hide();
      console.log(err);

    })
  }

  imageError(el) {
    el.onerror = '';
    el.src = '../../assets/img/placeholders/img-avatar.png';
    return true;
  }

}
