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
  loading: boolean = true;
  blogs = [];
  blogsArr = [];
  MAX_BRIEF_LENGTH = 40;
  limit: number = 10;
  offset: number = 1;
  total: number = 1;


  constructor(
    private router: Router,
    private translate: TranslateService,
    private pageService: PageService
  ) { }

  ngOnInit(): void {
    this.lang = this.translate.currentLang;
    this.getTotal();
  }


  getTotal() {
    this.pageService.getTotalCount('blogs', this.lang).subscribe((res: any) => {
      this.total = res;
      this.getBlogs(this.offset);
    }, err => {
      this.loading = false;
      console.log(err);

    });
  }

  getBlogs(offset: number) {
    this.offset = offset;
    let start = (this.offset - 1) * this.limit;
    const graphqlQuery = `
      {
        blogs(locale:"${this.lang}",start:${start},limit:${this.limit}, sort: "published_at:DESC") 
        { 
          id title author brief content publishedAt: published_at photos{ url }
        }
      }
      `;

    if ((this.blogsArr.length < 1) || (this.blogsArr.filter(d => d.page === this.offset)).length < 1) {
      this.pageService.getData(graphqlQuery).subscribe((res: any) => {
        this.loading = false;
        const newData = {
          page: offset,
          data: this.formatDate(res.data.blogs)
        };
        this.blogsArr.push(newData);
        this.blogs = newData.data;
      }, err => {
        this.loading = false;
        console.log(err);

      });
    } else {
      this.blogs = (this.blogsArr.filter(d => d.page === this.offset))[0].data;
    }
  }

  getBrief(data) {
    if (data && data.length > this.MAX_BRIEF_LENGTH) {
      return data.substring(0, this.MAX_BRIEF_LENGTH) + '...';
    } else {
      return data;
    }
  }

  formatDate(data) {
    data.forEach(element => {
      element.title = this.getBrief(element.title)
      const date = new Date(element.publishedAt);
      const year = date.getFullYear();
      const month = date.toLocaleString('default', { month: 'long' });
      const day = date.getDate();
      element.createdMonth = month;
      element.createdYear = year;
      element.createdDay = day;
    });
    return data;
  }


  pageChanged(page: number) {
    this.offset = page;
    this.getBlogs(page);
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
