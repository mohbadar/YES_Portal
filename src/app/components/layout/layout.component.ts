import { Component, OnInit } from '@angular/core';
import { MenuConfig } from './config/menue.config';
import { MenuConfigService } from './services/menu-config.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

    constructor(private menuConfigService: MenuConfigService) {
        this.menuConfigService.loadConfigs(new MenuConfig().configs);
    }

    ngOnInit(): void { }

}
