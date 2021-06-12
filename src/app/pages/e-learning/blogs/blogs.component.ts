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

  lang;
  loading: boolean = false;
  blogs;


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
      this.formatDate();
    });
  }

  formatDate() {
    this.blogs.forEach(element => {
      const date = new Date(element.publishedAt);
      const year = date.getFullYear();
      const month = date.toLocaleString('default', { month: 'long' });
      const day = date.getDay();
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
    this.router.navigate(['//e-learning/blogdetails/' + id])
  }
}
