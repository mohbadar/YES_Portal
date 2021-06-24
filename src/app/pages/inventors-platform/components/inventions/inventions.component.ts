import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PageService } from 'src/app/pages/page.service';

@Component({
  selector: 'app-inventions',
  templateUrl: './inventions.component.html',
  styleUrls: ['./inventions.component.css']
})
export class InventionsComponent implements OnInit {

  lang;
  loading: boolean = false;
  inventors;
  MAX_INVENTION_LENGTH = 40;

  constructor(
    private router: Router,
    private translate: TranslateService,
    private pageService: PageService
  ) { }

  ngOnInit(): void {
    this.lang = this.translate.currentLang;
    this.getInventors();
  }

  getInventors() {
    this.loading = true;
    const graphqlQuery = `
    {
      inventions(locale: "${this.lang}") {
        id
        title
        contents
        inventor_name
        photos {
          url
        }
      }
    }`;
    this.pageService.getData(graphqlQuery).subscribe((res: any) => {
      this.loading = false;
      console.log('inventions ', res.data);
      this.inventors = res.data.inventions;
      console.log("🚀 ~ file: inventions.component.ts ~ line 46 ~ InventionsComponent ~ this.pageService.getData ~ inventors", this.inventors)
      for (let inventor of this.inventors) {
        inventor.contents = this.getInventorContents(inventor.contents)
        console.log("🚀 ~ file: inventions.component.ts ~ line 49 ~ InventionsComponent ~ this.pageService.getData ~ inventor", inventor)
      }

    }, err => {
      this.loading = false;
      console.log(err);

    });
  }

  getInventorContents(data) {
    if (data && data.length > this.MAX_INVENTION_LENGTH) {
      return data.substring(0, this.MAX_INVENTION_LENGTH) + '...';
    } else {
      return data;
    }
  }


  imageError(el) {
    el.onerror = '';
    el.src = '../../../assets/images/placeholder/img-avatar.png';
    return true;
  }

  redirectToInventorDetails(id) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['//inventors-platform/inventor-details/' + id])

    )
  }

  addInventor() {
    this.router.navigateByUrl('/inventors-platform/add-inventor');
  }

}
