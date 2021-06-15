import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PageService } from '../../page.service';

@Component({
  selector: 'app-motivational-videos',
  templateUrl: './motivational-videos.component.html',
  styleUrls: ['./motivational-videos.component.css']
})
export class MotivationalVideosComponent implements OnInit {

  lang;
  loading: boolean = false;


  constructor(
    private router: Router,
    private translate: TranslateService,
    private pageService: PageService
  ) { }

  ngOnInit(): void {
    this.lang = this.translate.currentLang;
  }

}
