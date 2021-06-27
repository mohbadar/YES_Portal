import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PageService } from '../../page.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  componentName = "blogs";
  lang;
  loading: boolean = false;
  blogs;
  MAX_BRIEF_LENGTH = 60;


  constructor(
    private router: Router,
    private translate: TranslateService,
    private pageService: PageService
  ) { }

  ngOnInit(): void {
    this.lang = this.translate.currentLang;
    this.getBlogs();
  }


  getBlogs() {
    this.loading = true;
    const graphQuery = `
      {
        blogs(locale:"${this.lang}") 
        { 
          id title author brief content publishedAt: published_at photos{ url }
        }
      }
      `;
    this.pageService.getData(graphQuery).subscribe((res: any) => {
      this.loading = false;
      this.blogs = res.data.blogs;
      for (let blog of this.blogs) {
        blog.title = this.getBrief(blog.title);
      }
      this.formatDate();
    }, err => {
      this.loading = false;
      console.log(err);

    });
  }

  getBrief(data) {
    if (data && data.length > this.MAX_BRIEF_LENGTH) {
      return data.substring(0, this.MAX_BRIEF_LENGTH) + '...';
    } else {
      return data;
    }
  }

  formatDate() {
    this.blogs.forEach(element => {
      const date = new Date(element.publishedAt);
      const year = date.getFullYear();
      const month = date.toLocaleString('default', { month: 'long' });
      const day = date.getDate();
      element.createdMonth = month;
      element.createdYear = year;
      element.createdDay = day;
    });
  }

  imageError(el) {
    el.onerror = '';
    el.src = '../../../../assets/images/post-1.jpg';
    return true;
  }

  redirectToBlogDetails(id) {
    this.router.navigate(['//more/blogdetails/' + id])
  }
}
