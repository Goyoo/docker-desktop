var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('angular2/core');
var common_1 = require('angular2/common');
var menu_1 = require('../../desktop/menu/menu');
var ShortcutCmp = (function () {
    function ShortcutCmp(elementRef) {
        var _this = this;
        this._id = 'start';
        this._rename = false;
        this.element = elementRef.nativeElement;
        setTimeout(function () {
            _this.shortcut.obj = _this;
        }, 10);
    }
    ShortcutCmp.prototype.click = function () {
        $('.icon-active').removeClass('icon-active');
        $(this.element).find('.icon-block').addClass('icon-active');
    };
    ShortcutCmp.prototype.keydown = function (event) {
        if (event.keyCode == 27) {
            this._rename = false;
        }
        if (event.keyCode == 13) {
            $(this.element).find('input').blur();
        }
    };
    ShortcutCmp.prototype.blur = function () {
        this._rename = false;
        this.shortcut.text = $(this.element).find('input').val();
        this.shortcut.rename($(this.element).find('input').val());
    };
    ShortcutCmp.prototype.rename = function () {
        var _this = this;
        this._rename = true;
        setTimeout(function () {
            $(_this.element).find('input').focus();
            $(_this.element).find('input').select();
        }, 10);
    };
    ShortcutCmp.prototype.rightClick = function (event) {
        $('.icon-active').removeClass('icon-active');
        $(this.element).find('.icon-block').addClass('icon-active');
        if (!this.shortcut.menu)
            return;
        menu_1.menuList.splice(0, 100);
        menu_1.menuList.push({
            top: event.pageY - 10,
            left: event.pageX,
            items: this.shortcut.menu
        });
        event.returnvalue = false;
        event.stopPropagation();
        return false;
    };
    ShortcutCmp.prototype.hideMenu = function () {
        menu_1.menuList.splice(0, 100);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ShortcutCmp.prototype, "shortcut", void 0);
    ShortcutCmp = __decorate([
        core_1.Component({
            selector: 'shortcut',
            template: "\n        <div id=\"\" class=\"desktop-icon\" style=\"height:80px\">\n            <div *ngIf=\"shortcut\" class=\"icon-block\" (click)=\"click()\" (dblclick)=\"shortcut&&shortcut.dblclick && shortcut.dblclick()\" (contextmenu)=\"rightClick($event)\" (click)=\"hideMenu()\">\n                <div class=\"icon-bg {{shortcut && shortcut.icon}}\" ></div>\n                <div *ngIf=\"!_rename\" class=\"icon-text{{shortcut && shortcut.shadow?'-shadow':''}}\">{{shortcut.text}}</div>\n                <div *ngIf=\"_rename\" class=\"icon-text{{shortcut && shortcut.shadow?'-shadow':''}}\">\n                    <input (blur)=\"blur()\" (keydown)=\"keydown($event)\" (load)=\"alert(1)\" style=\"border: 0px;width:100%;height: 15px;\" value=\"{{shortcut.text}}\">\n                </div>\n            </div>\n        </div>\n    ",
            styles: ["\n\n      .desktop-icon .icon-block{\n          margin: 5px 5px 5px 5px;\n      /*    border:1px;*/\n          height: 70px;\n          width: 70px;\n          border:1px solid #000;\n          border-color: rgba(100, 140, 197, 0);\n      }\n\n      .desktop-icon .icon-block:hover{\n          background: none repeat scroll 0 0 rgba(160, 186, 220, 0.5);\n          border:1px solid #000;\n          transition: 0.2s linear;\n      }\n\n      .desktop-icon .icon-block:active{\n          background: none repeat scroll 0 0 rgba(160, 186, 220, 0.5);\n          border:1px solid #000;\n          transition: 0.2s linear;\n      }\n\n      .desktop-icon .icon-bg{\n          margin-left: 10px;\n          height: 50px;\n          width: 50px;\n          background-size: 50px 50px;\n    \n      }\n\n      .desktop-icon .icon-text-shadow{\n          font-size: 11px;\n          text-align: center;\n          color: #fff;\n          text-shadow: 3px 0px 3px #000;\n      }\n\n      .desktop-icon .icon-text{\n          font-size: 11px;\n          text-align: center;\n          color: #000;\n          text-overflow:ellipsis;\n          white-space:nowrap;\n          overflow:hidden;\n          margin-top: 3px;\n      }\n\n      .desktop-icon .icon-active:hover{\n          border:1px solid #ccc;\n          transition: 0.2s linear;\n      }\n\n      .desktop-icon .icon-active{\n          border:1px solid #ccc;\n          transition: 0.2s linear;\n      }\n    "],
            directives: [common_1.CORE_DIRECTIVES]
        }),
        __param(0, core_1.Inject(core_1.ElementRef)), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], ShortcutCmp);
    return ShortcutCmp;
})();
exports.ShortcutCmp = ShortcutCmp;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlc2t0b3Avc2hvcnRjdXQvc2hvcnRjdXQudHMiXSwibmFtZXMiOlsiU2hvcnRjdXRDbXAiLCJTaG9ydGN1dENtcC5jb25zdHJ1Y3RvciIsIlNob3J0Y3V0Q21wLmNsaWNrIiwiU2hvcnRjdXRDbXAua2V5ZG93biIsIlNob3J0Y3V0Q21wLmJsdXIiLCJTaG9ydGN1dENtcC5yZW5hbWUiLCJTaG9ydGN1dENtcC5yaWdodENsaWNrIiwiU2hvcnRjdXRDbXAuaGlkZU1lbnUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHFCQUFxRCxlQUFlLENBQUMsQ0FBQTtBQUNyRSx1QkFBZ0MsaUJBQWlCLENBQUMsQ0FBQTtBQUNsRCxxQkFBd0IseUJBQXlCLENBQUMsQ0FBQTtBQUlsRDtJQWtGSUEscUJBQWdDQSxVQUFzQkE7UUFsRjFEQyxpQkE0SUNBO1FBOURHQSxRQUFHQSxHQUFHQSxPQUFPQSxDQUFDQTtRQUdkQSxZQUFPQSxHQUFHQSxLQUFLQSxDQUFBQTtRQUVYQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxVQUFVQSxDQUFDQSxhQUFhQSxDQUFBQTtRQUN2Q0EsVUFBVUEsQ0FBQ0E7WUFDUEEsS0FBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsR0FBR0EsR0FBR0EsS0FBSUEsQ0FBQUE7UUFDNUJBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBLENBQUNBO0lBQ1hBLENBQUNBO0lBRURELDJCQUFLQSxHQUFMQTtRQUNJRSxDQUFDQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQSxXQUFXQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFBQTtRQUNsREEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQUE7SUFDekRBLENBQUNBO0lBRURGLDZCQUFPQSxHQUFQQSxVQUFRQSxLQUFLQTtRQUNURyxFQUFFQSxDQUFBQSxDQUFDQSxLQUFLQSxDQUFDQSxPQUFPQSxJQUFFQSxFQUFFQSxDQUFDQSxDQUFBQSxDQUFDQTtZQUNsQkEsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsS0FBS0EsQ0FBQUE7UUFDeEJBLENBQUNBO1FBQ0RBLEVBQUVBLENBQUFBLENBQUNBLEtBQUtBLENBQUNBLE9BQU9BLElBQUVBLEVBQUVBLENBQUNBLENBQUFBLENBQUNBO1lBQ2xCQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFBQTtRQUN4Q0EsQ0FBQ0E7SUFDTEEsQ0FBQ0E7SUFFREgsMEJBQUlBLEdBQUpBO1FBQ0lJLElBQUlBLENBQUNBLE9BQU9BLEdBQUdBLEtBQUtBLENBQUFBO1FBQ3BCQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFBQTtRQUN4REEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0EsQ0FBQUE7SUFDN0RBLENBQUNBO0lBRURKLDRCQUFNQSxHQUFOQTtRQUFBSyxpQkFNQ0E7UUFMR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQUE7UUFDbkJBLFVBQVVBLENBQUNBO1lBQ1BBLENBQUNBLENBQUNBLEtBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLEtBQUtBLEVBQUVBLENBQUFBO1lBQ3JDQSxDQUFDQSxDQUFDQSxLQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFBQTtRQUMxQ0EsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0E7SUFDWEEsQ0FBQ0E7SUFFREwsZ0NBQVVBLEdBQVZBLFVBQVdBLEtBQUtBO1FBRVpNLENBQUNBLENBQUNBLGNBQWNBLENBQUNBLENBQUNBLFdBQVdBLENBQUNBLGFBQWFBLENBQUNBLENBQUFBO1FBQ2xEQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQSxRQUFRQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFBQTtRQUVyREEsRUFBRUEsQ0FBQUEsQ0FBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsSUFBS0EsQ0FBQ0E7WUFDckJBLE1BQU1BLENBQUFBO1FBRVZBLGVBQVFBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLEVBQUVBLEdBQUdBLENBQUNBLENBQUFBO1FBQ3ZCQSxlQUFRQSxDQUFDQSxJQUFJQSxDQUFDQTtZQUNWQSxHQUFHQSxFQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxHQUFDQSxFQUFFQTtZQUNsQkEsSUFBSUEsRUFBRUEsS0FBS0EsQ0FBQ0EsS0FBS0E7WUFDakJBLEtBQUtBLEVBQUVBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLElBQUlBO1NBQzVCQSxDQUFDQSxDQUFBQTtRQUVGQSxLQUFLQSxDQUFDQSxXQUFXQSxHQUFDQSxLQUFLQSxDQUFDQTtRQUN4QkEsS0FBS0EsQ0FBQ0EsZUFBZUEsRUFBRUEsQ0FBQUE7UUFDdkJBLE1BQU1BLENBQUNBLEtBQUtBLENBQUFBO0lBQ2hCQSxDQUFDQTtJQUVETiw4QkFBUUEsR0FBUkE7UUFDSU8sZUFBUUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsRUFBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQUE7SUFDMUJBLENBQUNBO0lBM0REUDtRQUFDQSxZQUFLQSxFQUFFQTs7T0FBQ0EsaUNBQVFBLFVBQUNBO0lBaEZ0QkE7UUFBQ0EsZ0JBQVNBLENBQUNBO1lBQ1BBLFFBQVFBLEVBQUVBLFVBQVVBO1lBQ3BCQSxRQUFRQSxFQUFFQSx5ekJBVVRBO1lBQ0RBLE1BQU1BLEVBQUVBLENBQUNBLHc3Q0F5RFJBLENBQUNBO1lBQ0ZBLFVBQVVBLEVBQUVBLENBQUNBLHdCQUFlQSxDQUFDQTtTQUNoQ0EsQ0FBQ0E7UUFVY0EsV0FBQ0EsYUFBTUEsQ0FBQ0EsaUJBQVVBLENBQUNBLENBQUFBOztvQkEwRGxDQTtJQUFEQSxrQkFBQ0E7QUFBREEsQ0E1SUEsQUE0SUNBLElBQUE7QUFoRVksbUJBQVcsY0FnRXZCLENBQUEiLCJmaWxlIjoiZGVza3RvcC9zaG9ydGN1dC9zaG9ydGN1dC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5qZWN0LCBFbGVtZW50UmVmLCBJbnB1dCB9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHsgQ09SRV9ESVJFQ1RJVkVTIH0gZnJvbSAnYW5ndWxhcjIvY29tbW9uJztcbmltcG9ydCB7IG1lbnVMaXN0fSBmcm9tICcuLi8uLi9kZXNrdG9wL21lbnUvbWVudSc7XG5cbmRlY2xhcmUgdmFyICRcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdzaG9ydGN1dCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBpZD1cIlwiIGNsYXNzPVwiZGVza3RvcC1pY29uXCIgc3R5bGU9XCJoZWlnaHQ6ODBweFwiPlxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cInNob3J0Y3V0XCIgY2xhc3M9XCJpY29uLWJsb2NrXCIgKGNsaWNrKT1cImNsaWNrKClcIiAoZGJsY2xpY2spPVwic2hvcnRjdXQmJnNob3J0Y3V0LmRibGNsaWNrICYmIHNob3J0Y3V0LmRibGNsaWNrKClcIiAoY29udGV4dG1lbnUpPVwicmlnaHRDbGljaygkZXZlbnQpXCIgKGNsaWNrKT1cImhpZGVNZW51KClcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaWNvbi1iZyB7e3Nob3J0Y3V0ICYmIHNob3J0Y3V0Lmljb259fVwiID48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiIV9yZW5hbWVcIiBjbGFzcz1cImljb24tdGV4dHt7c2hvcnRjdXQgJiYgc2hvcnRjdXQuc2hhZG93Pyctc2hhZG93JzonJ319XCI+e3tzaG9ydGN1dC50ZXh0fX08L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiX3JlbmFtZVwiIGNsYXNzPVwiaWNvbi10ZXh0e3tzaG9ydGN1dCAmJiBzaG9ydGN1dC5zaGFkb3c/Jy1zaGFkb3cnOicnfX1cIj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IChibHVyKT1cImJsdXIoKVwiIChrZXlkb3duKT1cImtleWRvd24oJGV2ZW50KVwiIChsb2FkKT1cImFsZXJ0KDEpXCIgc3R5bGU9XCJib3JkZXI6IDBweDt3aWR0aDoxMDAlO2hlaWdodDogMTVweDtcIiB2YWx1ZT1cInt7c2hvcnRjdXQudGV4dH19XCI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBzdHlsZXM6IFtgXG5cbiAgICAgIC5kZXNrdG9wLWljb24gLmljb24tYmxvY2t7XG4gICAgICAgICAgbWFyZ2luOiA1cHggNXB4IDVweCA1cHg7XG4gICAgICAvKiAgICBib3JkZXI6MXB4OyovXG4gICAgICAgICAgaGVpZ2h0OiA3MHB4O1xuICAgICAgICAgIHdpZHRoOiA3MHB4O1xuICAgICAgICAgIGJvcmRlcjoxcHggc29saWQgIzAwMDtcbiAgICAgICAgICBib3JkZXItY29sb3I6IHJnYmEoMTAwLCAxNDAsIDE5NywgMCk7XG4gICAgICB9XG5cbiAgICAgIC5kZXNrdG9wLWljb24gLmljb24tYmxvY2s6aG92ZXJ7XG4gICAgICAgICAgYmFja2dyb3VuZDogbm9uZSByZXBlYXQgc2Nyb2xsIDAgMCByZ2JhKDE2MCwgMTg2LCAyMjAsIDAuNSk7XG4gICAgICAgICAgYm9yZGVyOjFweCBzb2xpZCAjMDAwO1xuICAgICAgICAgIHRyYW5zaXRpb246IDAuMnMgbGluZWFyO1xuICAgICAgfVxuXG4gICAgICAuZGVza3RvcC1pY29uIC5pY29uLWJsb2NrOmFjdGl2ZXtcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBub25lIHJlcGVhdCBzY3JvbGwgMCAwIHJnYmEoMTYwLCAxODYsIDIyMCwgMC41KTtcbiAgICAgICAgICBib3JkZXI6MXB4IHNvbGlkICMwMDA7XG4gICAgICAgICAgdHJhbnNpdGlvbjogMC4ycyBsaW5lYXI7XG4gICAgICB9XG5cbiAgICAgIC5kZXNrdG9wLWljb24gLmljb24tYmd7XG4gICAgICAgICAgbWFyZ2luLWxlZnQ6IDEwcHg7XG4gICAgICAgICAgaGVpZ2h0OiA1MHB4O1xuICAgICAgICAgIHdpZHRoOiA1MHB4O1xuICAgICAgICAgIGJhY2tncm91bmQtc2l6ZTogNTBweCA1MHB4O1xuICAgIFxuICAgICAgfVxuXG4gICAgICAuZGVza3RvcC1pY29uIC5pY29uLXRleHQtc2hhZG93e1xuICAgICAgICAgIGZvbnQtc2l6ZTogMTFweDtcbiAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgICAgICAgdGV4dC1zaGFkb3c6IDNweCAwcHggM3B4ICMwMDA7XG4gICAgICB9XG5cbiAgICAgIC5kZXNrdG9wLWljb24gLmljb24tdGV4dHtcbiAgICAgICAgICBmb250LXNpemU6IDExcHg7XG4gICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgIGNvbG9yOiAjMDAwO1xuICAgICAgICAgIHRleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7XG4gICAgICAgICAgd2hpdGUtc3BhY2U6bm93cmFwO1xuICAgICAgICAgIG92ZXJmbG93OmhpZGRlbjtcbiAgICAgICAgICBtYXJnaW4tdG9wOiAzcHg7XG4gICAgICB9XG5cbiAgICAgIC5kZXNrdG9wLWljb24gLmljb24tYWN0aXZlOmhvdmVye1xuICAgICAgICAgIGJvcmRlcjoxcHggc29saWQgI2NjYztcbiAgICAgICAgICB0cmFuc2l0aW9uOiAwLjJzIGxpbmVhcjtcbiAgICAgIH1cblxuICAgICAgLmRlc2t0b3AtaWNvbiAuaWNvbi1hY3RpdmV7XG4gICAgICAgICAgYm9yZGVyOjFweCBzb2xpZCAjY2NjO1xuICAgICAgICAgIHRyYW5zaXRpb246IDAuMnMgbGluZWFyO1xuICAgICAgfVxuICAgIGBdLFxuICAgIGRpcmVjdGl2ZXM6IFtDT1JFX0RJUkVDVElWRVNdXG59KVxuXG5cblxuZXhwb3J0IGNsYXNzIFNob3J0Y3V0Q21wIFxue1xuICAgIF9pZCA9ICdzdGFydCc7XG4gICAgZWxlbWVudDogYW55IFxuICAgIEBJbnB1dCgpIHNob3J0Y3V0O1xuICAgIF9yZW5hbWUgPSBmYWxzZVxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoRWxlbWVudFJlZikgZWxlbWVudFJlZjogRWxlbWVudFJlZil7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCAgICBcbiAgICAgICAgc2V0VGltZW91dCgoKT0+IHtcbiAgICAgICAgICAgIHRoaXMuc2hvcnRjdXQub2JqID0gdGhpc1xuICAgICAgICB9LCAxMCk7ICAgICBcbiAgICB9XG4gICAgXG4gICAgY2xpY2soKXtcbiAgICAgICAgJCgnLmljb24tYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ2ljb24tYWN0aXZlJylcblx0XHQkKHRoaXMuZWxlbWVudCkuZmluZCgnLmljb24tYmxvY2snKS5hZGRDbGFzcygnaWNvbi1hY3RpdmUnKVxuICAgIH1cbiAgICAgXG4gICAga2V5ZG93bihldmVudCl7XG4gICAgICAgIGlmKGV2ZW50LmtleUNvZGU9PTI3KXtcbiAgICAgICAgICAgIHRoaXMuX3JlbmFtZSA9IGZhbHNlXG4gICAgICAgIH0gICBcbiAgICAgICAgaWYoZXZlbnQua2V5Q29kZT09MTMpe1xuICAgICAgICAgICAgJCh0aGlzLmVsZW1lbnQpLmZpbmQoJ2lucHV0JykuYmx1cigpXG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgYmx1cigpe1xuICAgICAgICB0aGlzLl9yZW5hbWUgPSBmYWxzZVxuICAgICAgICB0aGlzLnNob3J0Y3V0LnRleHQgPSAkKHRoaXMuZWxlbWVudCkuZmluZCgnaW5wdXQnKS52YWwoKVxuICAgICAgICB0aGlzLnNob3J0Y3V0LnJlbmFtZSgkKHRoaXMuZWxlbWVudCkuZmluZCgnaW5wdXQnKS52YWwoKSlcbiAgICB9XG4gICAgXG4gICAgcmVuYW1lKCl7XG4gICAgICAgIHRoaXMuX3JlbmFtZSA9IHRydWVcbiAgICAgICAgc2V0VGltZW91dCgoKT0+IHtcbiAgICAgICAgICAgICQodGhpcy5lbGVtZW50KS5maW5kKCdpbnB1dCcpLmZvY3VzKClcbiAgICAgICAgICAgICQodGhpcy5lbGVtZW50KS5maW5kKCdpbnB1dCcpLnNlbGVjdCgpXG4gICAgICAgIH0sIDEwKTtcbiAgICB9XG4gICAgXG4gICAgcmlnaHRDbGljayhldmVudCl7XG4gICAgICAgIFxuICAgICAgICAkKCcuaWNvbi1hY3RpdmUnKS5yZW1vdmVDbGFzcygnaWNvbi1hY3RpdmUnKVxuXHRcdCQodGhpcy5lbGVtZW50KS5maW5kKCcuaWNvbi1ibG9jaycpLmFkZENsYXNzKCdpY29uLWFjdGl2ZScpXG4gICAgICAgIFxuICAgICAgICBpZiggIXRoaXMuc2hvcnRjdXQubWVudSApXG4gICAgICAgICAgICByZXR1cm4gXG4gICAgICAgICAgICBcbiAgICAgICAgbWVudUxpc3Quc3BsaWNlKDAsIDEwMClcbiAgICAgICAgbWVudUxpc3QucHVzaCh7XG4gICAgICAgICAgICB0b3A6ZXZlbnQucGFnZVktMTAsXG4gICAgICAgICAgICBsZWZ0OiBldmVudC5wYWdlWCxcbiAgICAgICAgICAgIGl0ZW1zOiB0aGlzLnNob3J0Y3V0Lm1lbnUgXG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgICAgICBldmVudC5yZXR1cm52YWx1ZT1mYWxzZTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIFxuICAgIGhpZGVNZW51KCl7XG4gICAgICAgIG1lbnVMaXN0LnNwbGljZSgwLDEwMClcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=