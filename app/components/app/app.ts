import {Component, ViewEncapsulation} from 'angular2/core';
import {
  RouteConfig,
  ROUTER_DIRECTIVES
} from 'angular2/router';
// import {HTTP_PROVIDERS} from 'angular2/http';

import {DesktopAppCmp} from '../desktop/desktop';
import {AboutCmp} from '../about/about';
import {NameList} from '../../services/name_list';

@Component({
  selector: 'app',
  viewProviders: [NameList],
  templateUrl: './components/app/app.html',
  styleUrls: ['./components/app/app.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: '/', component: DesktopAppCmp, as: 'Desktop' },
    { path: '/about', component: AboutCmp, as: 'About' }
])

export class AppCmp {}
