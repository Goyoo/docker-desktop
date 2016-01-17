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
            { path: '/desktop/:id', component: desktop_1.DesktopAppCmp, as: 'Desktop' }
        ]), 
        __metadata('design:paramtypes', [])
    ], AppCmp);
    return AppCmp;
})();
exports.AppCmp = AppCmp;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYXBwL2FwcC50cyJdLCJuYW1lcyI6WyJBcHBDbXAiLCJBcHBDbXAuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLHFCQUEyQyxlQUFlLENBQUMsQ0FBQTtBQUMzRCx1QkFHTyxpQkFBaUIsQ0FBQyxDQUFBO0FBR3pCLHdCQUE0QixvQkFBb0IsQ0FBQyxDQUFBO0FBQ2pELHFCQUFzQixjQUFjLENBQUMsQ0FBQTtBQUVyQztJQUFBQTtJQStCcUJDLENBQUNBO0lBL0J0QkQ7UUFBQ0EsZ0JBQVNBLENBQUNBO1lBQ1RBLFFBQVFBLEVBQUVBLEtBQUtBO1lBRWZBLFFBQVFBLEVBQUVBLDZSQVlUQTtZQUNEQSxNQUFNQSxFQUFFQSxDQUFDQSwrREFLUkEsQ0FBQ0E7WUFFRkEsVUFBVUEsRUFBRUEsQ0FBQ0EsMEJBQWlCQSxDQUFDQTtTQUNoQ0EsQ0FBQ0E7UUFFREEsb0JBQVdBLENBQUNBO1lBQ1RBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLEVBQUVBLFNBQVNBLEVBQUVBLGNBQU9BLEVBQUVBLEVBQUVBLEVBQUVBLE1BQU1BLEVBQUVBO1lBQzdDQSxFQUFFQSxJQUFJQSxFQUFFQSxjQUFjQSxFQUFFQSxTQUFTQSxFQUFFQSx1QkFBYUEsRUFBRUEsRUFBRUEsRUFBRUEsU0FBU0EsRUFBRUE7U0FDcEVBLENBQUNBOztlQUVvQkE7SUFBREEsYUFBQ0E7QUFBREEsQ0EvQnJCLEFBK0JzQkEsSUFBQTtBQUFULGNBQU0sU0FBRyxDQUFBIiwiZmlsZSI6ImNvbXBvbmVudHMvYXBwL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge1xuICBSb3V0ZUNvbmZpZyxcbiAgUk9VVEVSX0RJUkVDVElWRVNcbn0gZnJvbSAnYW5ndWxhcjIvcm91dGVyJztcbi8vIGltcG9ydCB7SFRUUF9QUk9WSURFUlN9IGZyb20gJ2FuZ3VsYXIyL2h0dHAnO1xuXG5pbXBvcnQge0Rlc2t0b3BBcHBDbXB9IGZyb20gJy4uL2Rlc2t0b3AvZGVza3RvcCc7XG5pbXBvcnQge0hvbWVDbXB9IGZyb20gJy4uL2hvbWUvaG9tZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcCcsXG4vLyAgIHZpZXdCaW5kaW5nczogW10sXG4gIHRlbXBsYXRlOiBgXG4gICAgPCEtLTxyb3V0ZXJPdXRsZXQ+PC9yb3V0ZXJPdXRsZXQ+LS0+XG5cblxuICAgIDxzZWN0aW9uIGNsYXNzPVwic2FtcGxlLWFwcC1jb250ZW50XCI+XG4gICAgICA8bmF2PlxuICAgICAgICA8IS0tPGEgW3JvdXRlckxpbmtdPVwiWycvSG9tZSddXCI+SG9tZTwvYT5cbiAgICAgICAgPGEgW3JvdXRlckxpbmtdPVwiWycvQWJvdXQnXVwiPkFib3V0PC9hPi0tPlxuICAgICAgPC9uYXY+XG5cbiAgICAgIDxyb3V0ZXItb3V0bGV0Pjwvcm91dGVyLW91dGxldD5cbiAgICA8L3NlY3Rpb24+XG4gIGAsXG4gIHN0eWxlczogW2BcbiAgICBob21le1xuICAgICAgd2lkdGg6MTAwJTtcbiAgICAgIGhlaWdodDoxMDAlO1xuICAgIH1cbiAgYF0sXG4vLyAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGRpcmVjdGl2ZXM6IFtST1VURVJfRElSRUNUSVZFU11cbn0pXG5cbkBSb3V0ZUNvbmZpZyhbXG4gICAgeyBwYXRoOiAnLycsIGNvbXBvbmVudDogSG9tZUNtcCwgYXM6ICdIb21lJyB9LFxuICAgIHsgcGF0aDogJy9kZXNrdG9wLzppZCcsIGNvbXBvbmVudDogRGVza3RvcEFwcENtcCwgYXM6ICdEZXNrdG9wJyB9XG5dKVxuXG5leHBvcnQgY2xhc3MgQXBwQ21wIHt9XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=