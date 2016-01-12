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
var about_1 = require('../about/about');
var name_list_1 = require('../../services/name_list');
var AppCmp = (function () {
    function AppCmp() {
    }
    AppCmp = __decorate([
        core_1.Component({
            selector: 'app',
            viewProviders: [name_list_1.NameList],
            template: "\n\n    <router-outlet></router-outlet>\n  ",
            styles: ["\n    home{\n      width:100%;\n      height:100%;\n    }\n  "],
            encapsulation: core_1.ViewEncapsulation.None,
            directives: [router_1.ROUTER_DIRECTIVES]
        }),
        router_1.RouteConfig([
            { path: '/', component: desktop_1.DesktopAppCmp, as: 'Desktop' },
            { path: '/about', component: about_1.AboutCmp, as: 'About' }
        ]), 
        __metadata('design:paramtypes', [])
    ], AppCmp);
    return AppCmp;
})();
exports.AppCmp = AppCmp;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYXBwL2FwcC50cyJdLCJuYW1lcyI6WyJBcHBDbXAiLCJBcHBDbXAuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLHFCQUEyQyxlQUFlLENBQUMsQ0FBQTtBQUMzRCx1QkFHTyxpQkFBaUIsQ0FBQyxDQUFBO0FBR3pCLHdCQUE0QixvQkFBb0IsQ0FBQyxDQUFBO0FBQ2pELHNCQUF1QixnQkFBZ0IsQ0FBQyxDQUFBO0FBQ3hDLDBCQUF1QiwwQkFBMEIsQ0FBQyxDQUFBO0FBRWxEO0lBQUFBO0lBc0JxQkMsQ0FBQ0E7SUF0QnRCRDtRQUFDQSxnQkFBU0EsQ0FBQ0E7WUFDVEEsUUFBUUEsRUFBRUEsS0FBS0E7WUFDZkEsYUFBYUEsRUFBRUEsQ0FBQ0Esb0JBQVFBLENBQUNBO1lBQ3pCQSxRQUFRQSxFQUFFQSw2Q0FHVEE7WUFDREEsTUFBTUEsRUFBRUEsQ0FBQ0EsK0RBS1JBLENBQUNBO1lBQ0ZBLGFBQWFBLEVBQUVBLHdCQUFpQkEsQ0FBQ0EsSUFBSUE7WUFDckNBLFVBQVVBLEVBQUVBLENBQUNBLDBCQUFpQkEsQ0FBQ0E7U0FDaENBLENBQUNBO1FBRURBLG9CQUFXQSxDQUFDQTtZQUNUQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxTQUFTQSxFQUFFQSx1QkFBYUEsRUFBRUEsRUFBRUEsRUFBRUEsU0FBU0EsRUFBRUE7WUFDdERBLEVBQUVBLElBQUlBLEVBQUVBLFFBQVFBLEVBQUVBLFNBQVNBLEVBQUVBLGdCQUFRQSxFQUFFQSxFQUFFQSxFQUFFQSxPQUFPQSxFQUFFQTtTQUN2REEsQ0FBQ0E7O2VBRW9CQTtJQUFEQSxhQUFDQTtBQUFEQSxDQXRCckIsQUFzQnNCQSxJQUFBO0FBQVQsY0FBTSxTQUFHLENBQUEiLCJmaWxlIjoiY29tcG9uZW50cy9hcHAvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7XG4gIFJvdXRlQ29uZmlnLFxuICBST1VURVJfRElSRUNUSVZFU1xufSBmcm9tICdhbmd1bGFyMi9yb3V0ZXInO1xuLy8gaW1wb3J0IHtIVFRQX1BST1ZJREVSU30gZnJvbSAnYW5ndWxhcjIvaHR0cCc7XG5cbmltcG9ydCB7RGVza3RvcEFwcENtcH0gZnJvbSAnLi4vZGVza3RvcC9kZXNrdG9wJztcbmltcG9ydCB7QWJvdXRDbXB9IGZyb20gJy4uL2Fib3V0L2Fib3V0JztcbmltcG9ydCB7TmFtZUxpc3R9IGZyb20gJy4uLy4uL3NlcnZpY2VzL25hbWVfbGlzdCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcCcsXG4gIHZpZXdQcm92aWRlcnM6IFtOYW1lTGlzdF0sXG4gIHRlbXBsYXRlOiBgXG5cbiAgICA8cm91dGVyLW91dGxldD48L3JvdXRlci1vdXRsZXQ+XG4gIGAsXG4gIHN0eWxlczogW2BcbiAgICBob21le1xuICAgICAgd2lkdGg6MTAwJTtcbiAgICAgIGhlaWdodDoxMDAlO1xuICAgIH1cbiAgYF0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGRpcmVjdGl2ZXM6IFtST1VURVJfRElSRUNUSVZFU11cbn0pXG5cbkBSb3V0ZUNvbmZpZyhbXG4gICAgeyBwYXRoOiAnLycsIGNvbXBvbmVudDogRGVza3RvcEFwcENtcCwgYXM6ICdEZXNrdG9wJyB9LFxuICAgIHsgcGF0aDogJy9hYm91dCcsIGNvbXBvbmVudDogQWJvdXRDbXAsIGFzOiAnQWJvdXQnIH1cbl0pXG5cbmV4cG9ydCBjbGFzcyBBcHBDbXAge31cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==