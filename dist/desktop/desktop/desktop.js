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
var common_1 = require('angular2/common');
var shortcut_1 = require('../shortcut/shortcut');
var menu_1 = require('../../desktop/menu/menu');
var DesktopCmp = (function () {
    function DesktopCmp() {
        this._id = 'desktop';
        this.shortcuts = [];
    }
    DesktopCmp.prototype.click = function () {
        menu_1.menuList.splice(0, 100);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DesktopCmp.prototype, "shortcuts", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DesktopCmp.prototype, "background_image", void 0);
    DesktopCmp = __decorate([
        core_1.Component({
            selector: 'desktop',
            template: "\n        <div id=\"{{_id}}\" style=\"width:100%;height:100%\" (mousedown)=\"click()\">\n            <div class=\"fullscreen_post_bg\" [ngStyle]=\"{'background-image': 'url(' + background_image + ') '}\">\n            </div> \n            <div class=\"body\">\n                <div class=\"layout-table\">\n                    <div class=\"horizontal\">\n                        <shortcut *ngFor=\"#shortcut of shortcuts\" [shortcut]=\"shortcut\"></shortcut>\n                    </div>\n                </div>\n            </div>\n        </div>\n    ",
            styles: ["\n\n      .fullscreen_post_bg img {\n          display: none;\n      }\n\n      .fullscreen_post_bg {\n          background-position: 50% 50%;\n          background-size: cover;\n          bottom: 0;\n          left: 0;\n          position: fixed;\n          right: 0;\n          top: 0;\n          z-index:-1;\n      }\n\n\n      .horizontal{\n          float: left;\n      }\n    "],
            directives: [common_1.CORE_DIRECTIVES, shortcut_1.ShortcutCmp]
        }), 
        __metadata('design:paramtypes', [])
    ], DesktopCmp);
    return DesktopCmp;
})();
exports.DesktopCmp = DesktopCmp;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlc2t0b3AvZGVza3RvcC9kZXNrdG9wLnRzIl0sIm5hbWVzIjpbIkRlc2t0b3BDbXAiLCJEZXNrdG9wQ21wLmNvbnN0cnVjdG9yIiwiRGVza3RvcENtcC5jbGljayJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEscUJBQWlDLGVBQWUsQ0FBQyxDQUFBO0FBQ2pELHVCQUFnQyxpQkFBaUIsQ0FBQyxDQUFBO0FBQ2xELHlCQUE0QixzQkFBc0IsQ0FBQyxDQUFBO0FBQ25ELHFCQUF3Qix5QkFBeUIsQ0FBQyxDQUFBO0FBR2xEO0lBNENJQTtRQUhBQyxRQUFHQSxHQUFHQSxTQUFTQSxDQUFDQTtRQUlaQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxFQUFFQSxDQUFBQTtJQUN2QkEsQ0FBQ0E7SUFFREQsMEJBQUtBLEdBQUxBO1FBQ0lFLGVBQVFBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLEVBQUNBLEdBQUdBLENBQUNBLENBQUFBO0lBQzFCQSxDQUFDQTtJQVJERjtRQUFDQSxZQUFLQSxFQUFFQTs7T0FBQ0EsaUNBQVNBLFVBQUNBO0lBQ25CQTtRQUFDQSxZQUFLQSxFQUFFQTs7T0FBQ0Esd0NBQWdCQSxVQUFDQTtJQTNDOUJBO1FBQUNBLGdCQUFTQSxDQUFDQTtZQUNQQSxRQUFRQSxFQUFFQSxTQUFTQTtZQUNuQkEsUUFBUUEsRUFBRUEsMGlCQVlUQTtZQUNEQSxNQUFNQSxFQUFFQSxDQUFDQSxnWUFxQlJBLENBQUNBO1lBQ0ZBLFVBQVVBLEVBQUVBLENBQUNBLHdCQUFlQSxFQUFFQSxzQkFBV0EsQ0FBQ0E7U0FDN0NBLENBQUNBOzttQkFhREE7SUFBREEsaUJBQUNBO0FBQURBLENBbkRBLEFBbURDQSxJQUFBO0FBWFksa0JBQVUsYUFXdEIsQ0FBQSIsImZpbGUiOiJkZXNrdG9wL2Rlc2t0b3AvZGVza3RvcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7IENPUkVfRElSRUNUSVZFUyB9IGZyb20gJ2FuZ3VsYXIyL2NvbW1vbic7XG5pbXBvcnQgeyBTaG9ydGN1dENtcCB9IGZyb20gJy4uL3Nob3J0Y3V0L3Nob3J0Y3V0JztcbmltcG9ydCB7IG1lbnVMaXN0fSBmcm9tICcuLi8uLi9kZXNrdG9wL21lbnUvbWVudSc7XG5kZWNsYXJlIHZhciAkXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZGVza3RvcCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBpZD1cInt7X2lkfX1cIiBzdHlsZT1cIndpZHRoOjEwMCU7aGVpZ2h0OjEwMCVcIiAobW91c2Vkb3duKT1cImNsaWNrKClcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmdWxsc2NyZWVuX3Bvc3RfYmdcIiBbbmdTdHlsZV09XCJ7J2JhY2tncm91bmQtaW1hZ2UnOiAndXJsKCcgKyBiYWNrZ3JvdW5kX2ltYWdlICsgJykgJ31cIj5cbiAgICAgICAgICAgIDwvZGl2PiBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJib2R5XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxheW91dC10YWJsZVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaG9yaXpvbnRhbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNob3J0Y3V0ICpuZ0Zvcj1cIiNzaG9ydGN1dCBvZiBzaG9ydGN1dHNcIiBbc2hvcnRjdXRdPVwic2hvcnRjdXRcIj48L3Nob3J0Y3V0PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIHN0eWxlczogW2BcblxuICAgICAgLmZ1bGxzY3JlZW5fcG9zdF9iZyBpbWcge1xuICAgICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICB9XG5cbiAgICAgIC5mdWxsc2NyZWVuX3Bvc3RfYmcge1xuICAgICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDUwJSA1MCU7XG4gICAgICAgICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgICAgICAgICBib3R0b206IDA7XG4gICAgICAgICAgbGVmdDogMDtcbiAgICAgICAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgICAgdG9wOiAwO1xuICAgICAgICAgIHotaW5kZXg6LTE7XG4gICAgICB9XG5cblxuICAgICAgLmhvcml6b250YWx7XG4gICAgICAgICAgZmxvYXQ6IGxlZnQ7XG4gICAgICB9XG4gICAgYF0sXG4gICAgZGlyZWN0aXZlczogW0NPUkVfRElSRUNUSVZFUywgU2hvcnRjdXRDbXBdXG59KVxuXG5leHBvcnQgY2xhc3MgRGVza3RvcENtcCB7XG4gICAgX2lkID0gJ2Rlc2t0b3AnOyBcbiAgICBASW5wdXQoKSBzaG9ydGN1dHM7XG4gICAgQElucHV0KCkgYmFja2dyb3VuZF9pbWFnZTtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLnNob3J0Y3V0cyA9IFtdXG4gICAgfVxuICAgIFxuICAgIGNsaWNrKCl7XG4gICAgICAgIG1lbnVMaXN0LnNwbGljZSgwLDEwMClcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=