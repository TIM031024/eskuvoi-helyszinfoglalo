import { Component, ViewChild } from '@angular/core';
import { MatSidenav }           from '@angular/material/sidenav';
import { RouterModule }         from '@angular/router';

import { MaterialModule }       from './material.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MaterialModule,  // toolbar, sidenav, list, button, icon…
    RouterModule     // router-outlet, routerLink
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('drawer') drawer!: MatSidenav;
}
