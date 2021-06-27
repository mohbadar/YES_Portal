import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PageService } from '../../../page.service';

@Component({
  selector: 'app-blogdetails',
  templateUrl: './blogdetails.component.html',
  styleUrls: ['./blogdetails.component.css']
})
export class BlogdetailsComponent implements OnInit {

  componentName = "blog-details";
  lang;
  blogId
  blogDetails;
  loading: boolean = false;

  constructor(private pageService: PageService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private translate: TranslateService) {
    this.blogId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.lang = this.translate.currentLang;
    console.log('Current Lang: ', this.lang);
    this.getblogDetails();
  }


  getblogDetails() {
    this.loading = true;
    const graphQuery = `
    {
      blog(id: "${this.blogId}")
      {
        id 
        title 
        author 
        brief
        content
        publishedAt: published_at 
        photos
        {
          url
        } 
        localizations(where: { locale: "${this.lang}" }) {id title author brief content publishedAt: published_at photos { url }}}}
    `;
    this.pageService.getData(graphQuery).subscribe((res: any) => {
      this.loading = false;
      if (res.data.blog.localizations.length > 0) {
        this.blogDetails = res.data.blog.localizations[0];
        console.log("🚀 ~ file: blogdetails.component.ts ~ line 54 ~ BlogdetailsComponent ~ this.pageService.getRecentBlogs ~ blogDetails", this.blogDetails)
      } else {
        this.blogDetails = res.data.blog;
        console.log("🚀 ~ file: blogdetails.component.ts ~ line 57 ~ BlogdetailsComponent ~ this.pageService.getRecentBlogs ~ blogDetails", this.blogDetails)
      }
      const date = new Date(this.blogDetails.publishedAt);
      console.log("🚀 ~ file: blogdetails.component.ts ~ line 61 ~ BlogdetailsComponent ~ this.pageService.getData ~ date", date)
      const year = date.getFullYear();
      const day = date.getDate();
      const month = date.toLocaleString('default', { month: 'long' });
      this.blogDetails.createdMonth = month;
      this.blogDetails.createdYear = year;
      this.blogDetails.createdDay = day;
    }, err => {
      this.loading = false;
      console.log(err);

    })
  }

  imageError(el) {
    el.onerror = '';
    el.src = '../../assets/img/placeholders/img-avatar.png';
    return true;
  }

}
