import {Component, ViewEncapsulation} from 'angular2/core';
import {
  RouteConfig,
  ROUTER_DIRECTIVES
} from 'angular2/router';
// import {HTTP_PROVIDERS} from 'angular2/http';

import {DesktopAppCmp} from '../desktop/desktop';
import {HomeCmp} from '../home/home';

@Component({
  selector: 'app',
//   viewBindings: [],
  templateUrl: './components/app/app.html',
  styleUrls: ['./components/app/app.css'],
//   encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: '/', component: HomeCmp, as: 'Home' },
    { path: '/desktop/:id', component: DesktopAppCmp, as: 'Desktop' }
])

export class AppCmp {}
