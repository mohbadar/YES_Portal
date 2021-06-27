import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PageService } from '../../page.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  componentName = "events";
  lang;
  loading: boolean = false;
  events;


  constructor(
    private translate: TranslateService,
    private pageService: PageService
  ) { }

  ngOnInit(): void {
    this.lang = this.translate.currentLang;
    this.getEvents();
  }


  getEvents() {
    this.loading = true;
    const graphQuery = `
    {
      events(locale:"${this.lang}") {
        name
        EndDate
        start_date
        location
        description
      }
    }
    `;
    this.pageService.getData(graphQuery).subscribe((res: any) => {
      this.loading = false;
      this.events = res.data.events;
      console.log("🚀 ~ file: events.component.ts ~ line 45 ~ EventsComponent ~ this.pageService.getData ~ events", this.events)
    }, err => {
      this.loading = false;
      console.log(err);

    });
  }

}
