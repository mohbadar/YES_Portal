import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PageService } from 'src/app/pages/page.service';

@Component({
  selector: 'app-memory-sport',
  templateUrl: './memory-sport.component.html',
  styleUrls: ['./memory-sport.component.css']
})
export class MemorySportComponent implements OnInit {

  lang;
  loading: boolean = false;


  constructor(
    private translate: TranslateService,
    private pageService: PageService
  ) { }

  ngOnInit(): void {
    this.lang = this.translate.currentLang;
  }

}
