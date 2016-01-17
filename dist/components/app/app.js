var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var router_1 = require('angular2/router');
var desktop_1 = require('../desktop/desktop');
var home_1 = require('../home/home');
var AppCmp = (function () {
    function AppCmp() {
    }
    AppCmp = __decorate([
        core_1.Component({
            selector: 'app',
            template: "\n    <!--<routerOutlet></routerOutlet>-->\n\n\n    <section class=\"sample-app-content\">\n      <nav>\n        <!--<a [routerLink]=\"['/Home']\">Home</a>\n        <a [routerLink]=\"['/About']\">About</a>-->\n      </nav>\n\n      <router-outlet></router-outlet>\n    </section>\n  ",
            styles: ["\n    home{\n      width:100%;\n      height:100%;\n    }\n  "],
            directives: [router_1.ROUTER_DIRECTIVES]
        }),
        router_1.RouteConfig([
            { path: '/', component: home_1.HomeCmp, as: 'Home' },
            { path: '/desktop/:id/:ip/:port', component: desktop_1.DesktopAppCmp, as: 'Desktop' }
        ]), 
        __metadata('design:paramtypes', [])
    ], AppCmp);
    return AppCmp;
})();
exports.AppCmp = AppCmp;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYXBwL2FwcC50cyJdLCJuYW1lcyI6WyJBcHBDbXAiLCJBcHBDbXAuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLHFCQUEyQyxlQUFlLENBQUMsQ0FBQTtBQUMzRCx1QkFHTyxpQkFBaUIsQ0FBQyxDQUFBO0FBR3pCLHdCQUE0QixvQkFBb0IsQ0FBQyxDQUFBO0FBQ2pELHFCQUFzQixjQUFjLENBQUMsQ0FBQTtBQUVyQztJQUFBQTtJQStCcUJDLENBQUNBO0lBL0J0QkQ7UUFBQ0EsZ0JBQVNBLENBQUNBO1lBQ1RBLFFBQVFBLEVBQUVBLEtBQUtBO1lBRWZBLFFBQVFBLEVBQUVBLDZSQVlUQTtZQUNEQSxNQUFNQSxFQUFFQSxDQUFDQSwrREFLUkEsQ0FBQ0E7WUFFRkEsVUFBVUEsRUFBRUEsQ0FBQ0EsMEJBQWlCQSxDQUFDQTtTQUNoQ0EsQ0FBQ0E7UUFFREEsb0JBQVdBLENBQUNBO1lBQ1RBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLEVBQUVBLFNBQVNBLEVBQUVBLGNBQU9BLEVBQUVBLEVBQUVBLEVBQUVBLE1BQU1BLEVBQUVBO1lBQzdDQSxFQUFFQSxJQUFJQSxFQUFFQSx3QkFBd0JBLEVBQUVBLFNBQVNBLEVBQUVBLHVCQUFhQSxFQUFFQSxFQUFFQSxFQUFFQSxTQUFTQSxFQUFFQTtTQUM5RUEsQ0FBQ0E7O2VBRW9CQTtJQUFEQSxhQUFDQTtBQUFEQSxDQS9CckIsQUErQnNCQSxJQUFBO0FBQVQsY0FBTSxTQUFHLENBQUEiLCJmaWxlIjoiY29tcG9uZW50cy9hcHAvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7XG4gIFJvdXRlQ29uZmlnLFxuICBST1VURVJfRElSRUNUSVZFU1xufSBmcm9tICdhbmd1bGFyMi9yb3V0ZXInO1xuLy8gaW1wb3J0IHtIVFRQX1BST1ZJREVSU30gZnJvbSAnYW5ndWxhcjIvaHR0cCc7XG5cbmltcG9ydCB7RGVza3RvcEFwcENtcH0gZnJvbSAnLi4vZGVza3RvcC9kZXNrdG9wJztcbmltcG9ydCB7SG9tZUNtcH0gZnJvbSAnLi4vaG9tZS9ob21lJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwJyxcbi8vICAgdmlld0JpbmRpbmdzOiBbXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8IS0tPHJvdXRlck91dGxldD48L3JvdXRlck91dGxldD4tLT5cblxuXG4gICAgPHNlY3Rpb24gY2xhc3M9XCJzYW1wbGUtYXBwLWNvbnRlbnRcIj5cbiAgICAgIDxuYXY+XG4gICAgICAgIDwhLS08YSBbcm91dGVyTGlua109XCJbJy9Ib21lJ11cIj5Ib21lPC9hPlxuICAgICAgICA8YSBbcm91dGVyTGlua109XCJbJy9BYm91dCddXCI+QWJvdXQ8L2E+LS0+XG4gICAgICA8L25hdj5cblxuICAgICAgPHJvdXRlci1vdXRsZXQ+PC9yb3V0ZXItb3V0bGV0PlxuICAgIDwvc2VjdGlvbj5cbiAgYCxcbiAgc3R5bGVzOiBbYFxuICAgIGhvbWV7XG4gICAgICB3aWR0aDoxMDAlO1xuICAgICAgaGVpZ2h0OjEwMCU7XG4gICAgfVxuICBgXSxcbi8vICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgZGlyZWN0aXZlczogW1JPVVRFUl9ESVJFQ1RJVkVTXVxufSlcblxuQFJvdXRlQ29uZmlnKFtcbiAgICB7IHBhdGg6ICcvJywgY29tcG9uZW50OiBIb21lQ21wLCBhczogJ0hvbWUnIH0sXG4gICAgeyBwYXRoOiAnL2Rlc2t0b3AvOmlkLzppcC86cG9ydCcsIGNvbXBvbmVudDogRGVza3RvcEFwcENtcCwgYXM6ICdEZXNrdG9wJyB9XG5dKVxuXG5leHBvcnQgY2xhc3MgQXBwQ21wIHt9XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=