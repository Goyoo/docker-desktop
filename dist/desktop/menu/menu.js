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
var util_1 = require('../tools/util');
var hideTimeout = 0;
exports.menuList = [];
var MenuCmp = (function () {
    function MenuCmp(elementRef) {
        var _this = this;
        this.element = elementRef.nativeElement;
        setTimeout(function () {
            _this.config.items.forEach(function (item) {
                item._id = util_1.getUid(16);
            });
        });
    }
    MenuCmp.prototype.mouseoutItem = function (event, item) {
        var _this = this;
        if (!item.items)
            return;
        hideTimeout = setTimeout(function () {
            if (_this.config.mouseoutHide)
                return;
            exports.menuList.forEach(function (item, index) {
                if (item._id === 'p' + $(event.target).attr('_id')) {
                    exports.menuList.splice(index, 1);
                }
            });
        }, 1);
    };
    MenuCmp.prototype.handler = function (item) {
        exports.menuList.splice(0, 100);
        setTimeout(function () {
            item.handler();
        }, 10);
    };
    MenuCmp.prototype.mouseenter = function () {
        clearTimeout(hideTimeout);
    };
    MenuCmp.prototype.mouseout = function () {
        var _this = this;
        if (!this.config.mouseoutHide)
            return;
        exports.menuList.forEach(function (item, index) {
            if (item._id === _this.config._id) {
                exports.menuList.splice(index, 1);
            }
        });
    };
    MenuCmp.prototype.mouseenterItem = function (items, event) {
        var liPosition = $(event.target).position();
        var menuPosition = $(this.element).find('.content-menu').position();
        var top = liPosition.top + menuPosition.top;
        var left = liPosition.left + menuPosition.left + $(this.element).find('.content-menu').width();
        if (!items)
            return;
        exports.menuList.push({
            _id: 'p' + $(event.target).attr('_id'),
            mouseoutHide: true,
            top: top,
            left: left,
            items: items
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MenuCmp.prototype, "config", void 0);
    MenuCmp = __decorate([
        core_1.Component({
            selector: 'menu',
            template: "\n        <div *ngIf=\"config\" id=\"{{config._id}}\" class=\"content-menu\" [ngStyle]=\"{'top': config.top+'px', 'left': config.left+'px'}\" (mouseenter)=\"mouseenter()\" (mouseleave)=\"mouseout()\" >\n            <ul id=\"-body\">\n                <li *ngFor=\"#item of config.items\" (click)=\"handler(item)\" id=\"{{item._id}}\" (mouseenter)=\"mouseenterItem(item.items, $event)\" (mouseleave)=\"mouseoutItem($event, item)\">\n                    <a>{{item.text}}</a><div *ngIf=\"item.items\"  class=\"right-arrows\"></div>\n                </li>\n            </ul>\n        </div>\n    ",
            styles: ["\n      .content-menu\n      {\n          position:absolute;\n          z-index:100000;\n          width:150px;\n          background:#fff;\n          top:100px;\n          left:300px;box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);\n      }\n      .content-menu a\n      {\n          font-family: 'Segoe UI', 'Open Sans', Verdana, Arial, Helvetica, sans-serif;\n          font-weight: 400;\n          line-height: 14pt;\n          font-smooth: always;\n          display: block;\n          padding: 3px 20px;\n          white-space: nowrap;\n          font-size: 14px;\n          cursor: pointer;\n          position: relative;\n      }\n\n      .content-menu a:hover\n      {\n          background: #bb4d45;\n          color: #fff;\n      }\n\n      .content-menu li\n      {\n          display: list-item;\n          line-height: 20px;\n          margin-top:5px;\n          list-style-type:none;\n          position: relative;\n      }\n      .content-menu ul\n      {\n          display: block;\n          position: static;\n          margin-bottom: 5px;\n          margin-left: 0;\n          padding-left: 0;\n      }\n\n      .content-menu .divider {\n          height: 1px;\n          margin: 9px 1px;\n          overflow: hidden;\n          background-color: #E5E5E5;\n      }\n\n      .content-menu .disabled a:hover{\n    \n          background-color: #fff;\n          color: #999;\n          cursor: auto;\n      }\n\n      .right-arrows\n      {\n          background-image: url(\"../../resource/images/windows8/youjiantou.png\");\n          height: 11px;\n          top: 7px;\n          position: absolute;\n          right: 10px;\n          width: 8px;\n      }\n    "],
            directives: [common_1.NgStyle]
        }),
        __param(0, core_1.Inject(core_1.ElementRef)), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], MenuCmp);
    return MenuCmp;
})();
exports.MenuCmp = MenuCmp;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlc2t0b3AvbWVudS9tZW51LnRzIl0sIm5hbWVzIjpbIk1lbnVDbXAiLCJNZW51Q21wLmNvbnN0cnVjdG9yIiwiTWVudUNtcC5tb3VzZW91dEl0ZW0iLCJNZW51Q21wLmhhbmRsZXIiLCJNZW51Q21wLm1vdXNlZW50ZXIiLCJNZW51Q21wLm1vdXNlb3V0IiwiTWVudUNtcC5tb3VzZWVudGVySXRlbSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEscUJBQW1ELGVBQWUsQ0FBQyxDQUFBO0FBQ25FLHVCQUFzQixpQkFBaUIsQ0FBQyxDQUFBO0FBQ3hDLHFCQUFxQixlQUFlLENBQUMsQ0FBQTtBQUdyQyxJQUFJLFdBQVcsR0FBTyxDQUFDLENBQUM7QUFFYixnQkFBUSxHQUFHLEVBQUUsQ0FBQTtBQUV4QjtJQXdGSUEsaUJBQWdDQSxVQUFzQkE7UUF4RjFEQyxpQkE0SkNBO1FBbkVPQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxVQUFVQSxDQUFDQSxhQUFhQSxDQUFBQTtRQUV2Q0EsVUFBVUEsQ0FBQ0E7WUFDUEEsS0FBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsVUFBQ0EsSUFBSUE7Z0JBQzNCQSxJQUFJQSxDQUFDQSxHQUFHQSxHQUFHQSxhQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFBQTtZQUN6QkEsQ0FBQ0EsQ0FBQ0EsQ0FBQUE7UUFDTkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDVkEsQ0FBQ0E7SUFFRUQsOEJBQVlBLEdBQVpBLFVBQWFBLEtBQUtBLEVBQUVBLElBQUlBO1FBQXhCRSxpQkFlQ0E7UUFiR0EsRUFBRUEsQ0FBQUEsQ0FBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBTUEsQ0FBQ0E7WUFDYkEsTUFBTUEsQ0FBQUE7UUFFVkEsV0FBV0EsR0FBR0EsVUFBVUEsQ0FBQ0E7WUFDckJBLEVBQUVBLENBQUFBLENBQUVBLEtBQUlBLENBQUNBLE1BQU1BLENBQUNBLFlBQWFBLENBQUNBO2dCQUMxQkEsTUFBTUEsQ0FBQUE7WUFFVkEsZ0JBQVFBLENBQUNBLE9BQU9BLENBQUNBLFVBQUNBLElBQUlBLEVBQUVBLEtBQUtBO2dCQUN6QkEsRUFBRUEsQ0FBQUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsS0FBS0EsR0FBR0EsR0FBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQUEsQ0FBQ0E7b0JBQzlDQSxnQkFBUUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQUE7Z0JBQzdCQSxDQUFDQTtZQUNMQSxDQUFDQSxDQUFDQSxDQUFBQTtRQUNOQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUNWQSxDQUFDQTtJQUVERix5QkFBT0EsR0FBUEEsVUFBUUEsSUFBSUE7UUFDUkcsZ0JBQVFBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLEVBQUVBLEdBQUdBLENBQUNBLENBQUFBO1FBQ3ZCQSxVQUFVQSxDQUFDQTtZQUNQLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUNsQixDQUFDLEVBQUVBLEVBQUVBLENBQUNBLENBQUNBO0lBQ1hBLENBQUNBO0lBRURILDRCQUFVQSxHQUFWQTtRQUNJSSxZQUFZQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFBQTtJQUM3QkEsQ0FBQ0E7SUFFREosMEJBQVFBLEdBQVJBO1FBQUFLLGlCQVVDQTtRQVJHQSxFQUFFQSxDQUFBQSxDQUFFQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxZQUFhQSxDQUFDQTtZQUMzQkEsTUFBTUEsQ0FBQUE7UUFFVkEsZ0JBQVFBLENBQUNBLE9BQU9BLENBQUNBLFVBQUNBLElBQUlBLEVBQUVBLEtBQUtBO1lBQ3pCQSxFQUFFQSxDQUFBQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxLQUFLQSxLQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFBQSxDQUFDQTtnQkFDN0JBLGdCQUFRQSxDQUFDQSxNQUFNQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFBQTtZQUM3QkEsQ0FBQ0E7UUFDTEEsQ0FBQ0EsQ0FBQ0EsQ0FBQUE7SUFDTkEsQ0FBQ0E7SUFFREwsZ0NBQWNBLEdBQWRBLFVBQWVBLEtBQUtBLEVBQUVBLEtBQUtBO1FBRXZCTSxJQUFJQSxVQUFVQSxHQUFHQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxRQUFRQSxFQUFFQSxDQUFBQTtRQUMzQ0EsSUFBSUEsWUFBWUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsQ0FBQ0EsUUFBUUEsRUFBRUEsQ0FBQUE7UUFDbkVBLElBQUlBLEdBQUdBLEdBQUdBLFVBQVVBLENBQUNBLEdBQUdBLEdBQUdBLFlBQVlBLENBQUNBLEdBQUdBLENBQUFBO1FBQzNDQSxJQUFJQSxJQUFJQSxHQUFHQSxVQUFVQSxDQUFDQSxJQUFJQSxHQUFHQSxZQUFZQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxlQUFlQSxDQUFDQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFBQTtRQUU5RkEsRUFBRUEsQ0FBQUEsQ0FBRUEsQ0FBQ0EsS0FBTUEsQ0FBQ0E7WUFDUkEsTUFBTUEsQ0FBQUE7UUFFVkEsZ0JBQVFBLENBQUNBLElBQUlBLENBQUNBO1lBQ1ZBLEdBQUdBLEVBQUVBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBO1lBQ3RDQSxZQUFZQSxFQUFFQSxJQUFJQTtZQUNsQkEsR0FBR0EsRUFBRUEsR0FBR0E7WUFDUkEsSUFBSUEsRUFBRUEsSUFBSUE7WUFDVkEsS0FBS0EsRUFBRUEsS0FBS0E7U0FDZkEsQ0FBQ0EsQ0FBQUE7SUFDTkEsQ0FBQ0E7SUFyRUROO1FBQUNBLFlBQUtBLEVBQUVBOztPQUFDQSwyQkFBTUEsVUFBQ0E7SUF0RnBCQTtRQUFDQSxnQkFBU0EsQ0FBQ0E7WUFDUEEsUUFBUUEsRUFBRUEsTUFBTUE7WUFDaEJBLFFBQVFBLEVBQUVBLGlsQkFRVEE7WUFDREEsTUFBTUEsRUFBRUEsQ0FBQ0EsMm9EQXNFUkEsQ0FBQ0E7WUFDRkEsVUFBVUEsRUFBRUEsQ0FBQ0EsZ0JBQU9BLENBQUNBO1NBQ3hCQSxDQUFDQTtRQUtjQSxXQUFDQSxhQUFNQSxDQUFDQSxpQkFBVUEsQ0FBQ0EsQ0FBQUE7O2dCQW9FbENBO0lBQURBLGNBQUNBO0FBQURBLENBNUpBLEFBNEpDQSxJQUFBO0FBdkVZLGVBQU8sVUF1RW5CLENBQUEiLCJmaWxlIjoiZGVza3RvcC9tZW51L21lbnUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIEluamVjdCwgRWxlbWVudFJlZn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge05nU3R5bGV9IGZyb20gJ2FuZ3VsYXIyL2NvbW1vbic7XG5pbXBvcnQge2dldFVpZH0gZnJvbSAnLi4vdG9vbHMvdXRpbCc7XG5cbmRlY2xhcmUgdmFyICRcbnZhciBoaWRlVGltZW91dDphbnkgPSAwO1xuXG5leHBvcnQgdmFyIG1lbnVMaXN0ID0gW11cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtZW51JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2ICpuZ0lmPVwiY29uZmlnXCIgaWQ9XCJ7e2NvbmZpZy5faWR9fVwiIGNsYXNzPVwiY29udGVudC1tZW51XCIgW25nU3R5bGVdPVwieyd0b3AnOiBjb25maWcudG9wKydweCcsICdsZWZ0JzogY29uZmlnLmxlZnQrJ3B4J31cIiAobW91c2VlbnRlcik9XCJtb3VzZWVudGVyKClcIiAobW91c2VsZWF2ZSk9XCJtb3VzZW91dCgpXCIgPlxuICAgICAgICAgICAgPHVsIGlkPVwiLWJvZHlcIj5cbiAgICAgICAgICAgICAgICA8bGkgKm5nRm9yPVwiI2l0ZW0gb2YgY29uZmlnLml0ZW1zXCIgKGNsaWNrKT1cImhhbmRsZXIoaXRlbSlcIiBpZD1cInt7aXRlbS5faWR9fVwiIChtb3VzZWVudGVyKT1cIm1vdXNlZW50ZXJJdGVtKGl0ZW0uaXRlbXMsICRldmVudClcIiAobW91c2VsZWF2ZSk9XCJtb3VzZW91dEl0ZW0oJGV2ZW50LCBpdGVtKVwiPlxuICAgICAgICAgICAgICAgICAgICA8YT57e2l0ZW0udGV4dH19PC9hPjxkaXYgKm5nSWY9XCJpdGVtLml0ZW1zXCIgIGNsYXNzPVwicmlnaHQtYXJyb3dzXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgc3R5bGVzOiBbYFxuICAgICAgLmNvbnRlbnQtbWVudVxuICAgICAge1xuICAgICAgICAgIHBvc2l0aW9uOmFic29sdXRlO1xuICAgICAgICAgIHotaW5kZXg6MTAwMDAwO1xuICAgICAgICAgIHdpZHRoOjE1MHB4O1xuICAgICAgICAgIGJhY2tncm91bmQ6I2ZmZjtcbiAgICAgICAgICB0b3A6MTAwcHg7XG4gICAgICAgICAgbGVmdDozMDBweDtib3gtc2hhZG93OiAwIDAgMTBweCByZ2JhKDAsIDAsIDAsIDAuNik7XG4gICAgICB9XG4gICAgICAuY29udGVudC1tZW51IGFcbiAgICAgIHtcbiAgICAgICAgICBmb250LWZhbWlseTogJ1NlZ29lIFVJJywgJ09wZW4gU2FucycsIFZlcmRhbmEsIEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgICAgICAgICBsaW5lLWhlaWdodDogMTRwdDtcbiAgICAgICAgICBmb250LXNtb290aDogYWx3YXlzO1xuICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgIHBhZGRpbmc6IDNweCAyMHB4O1xuICAgICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICB9XG5cbiAgICAgIC5jb250ZW50LW1lbnUgYTpob3ZlclxuICAgICAge1xuICAgICAgICAgIGJhY2tncm91bmQ6ICNiYjRkNDU7XG4gICAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgICB9XG5cbiAgICAgIC5jb250ZW50LW1lbnUgbGlcbiAgICAgIHtcbiAgICAgICAgICBkaXNwbGF5OiBsaXN0LWl0ZW07XG4gICAgICAgICAgbGluZS1oZWlnaHQ6IDIwcHg7XG4gICAgICAgICAgbWFyZ2luLXRvcDo1cHg7XG4gICAgICAgICAgbGlzdC1zdHlsZS10eXBlOm5vbmU7XG4gICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgfVxuICAgICAgLmNvbnRlbnQtbWVudSB1bFxuICAgICAge1xuICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgIHBvc2l0aW9uOiBzdGF0aWM7XG4gICAgICAgICAgbWFyZ2luLWJvdHRvbTogNXB4O1xuICAgICAgICAgIG1hcmdpbi1sZWZ0OiAwO1xuICAgICAgICAgIHBhZGRpbmctbGVmdDogMDtcbiAgICAgIH1cblxuICAgICAgLmNvbnRlbnQtbWVudSAuZGl2aWRlciB7XG4gICAgICAgICAgaGVpZ2h0OiAxcHg7XG4gICAgICAgICAgbWFyZ2luOiA5cHggMXB4O1xuICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI0U1RTVFNTtcbiAgICAgIH1cblxuICAgICAgLmNvbnRlbnQtbWVudSAuZGlzYWJsZWQgYTpob3ZlcntcbiAgICBcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICAgICAgICAgIGNvbG9yOiAjOTk5O1xuICAgICAgICAgIGN1cnNvcjogYXV0bztcbiAgICAgIH1cblxuICAgICAgLnJpZ2h0LWFycm93c1xuICAgICAge1xuICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIi4uLy4uL3Jlc291cmNlL2ltYWdlcy93aW5kb3dzOC95b3VqaWFudG91LnBuZ1wiKTtcbiAgICAgICAgICBoZWlnaHQ6IDExcHg7XG4gICAgICAgICAgdG9wOiA3cHg7XG4gICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgIHJpZ2h0OiAxMHB4O1xuICAgICAgICAgIHdpZHRoOiA4cHg7XG4gICAgICB9XG4gICAgYF0sXG4gICAgZGlyZWN0aXZlczogW05nU3R5bGVdXG59KVxuXG5leHBvcnQgY2xhc3MgTWVudUNtcCB7XG4gICAgQElucHV0KCkgY29uZmlnO1xuICAgIGVsZW1lbnQ6IGFueVxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoRWxlbWVudFJlZikgZWxlbWVudFJlZjogRWxlbWVudFJlZil7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudFxuICAgICAgICBcbiAgICAgICAgc2V0VGltZW91dCgoKT0+IHtcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLml0ZW1zLmZvckVhY2goKGl0ZW0pPT57XG4gICAgICAgICAgICAgICAgaXRlbS5faWQgPSBnZXRVaWQoMTYpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcblx0fVxuICAgIFxuICAgIG1vdXNlb3V0SXRlbShldmVudCwgaXRlbSlcbiAgICB7XG4gICAgICAgIGlmKCAhaXRlbS5pdGVtcyApXG4gICAgICAgICAgICByZXR1cm4gXG4gICAgICAgIFxuICAgICAgICBoaWRlVGltZW91dCA9IHNldFRpbWVvdXQoKCk9PiB7XG4gICAgICAgICAgICBpZiggdGhpcy5jb25maWcubW91c2VvdXRIaWRlIClcbiAgICAgICAgICAgICAgICByZXR1cm4gXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBtZW51TGlzdC5mb3JFYWNoKChpdGVtLCBpbmRleCk9PntcbiAgICAgICAgICAgICAgICBpZihpdGVtLl9pZCA9PT0gJ3AnKyAkKGV2ZW50LnRhcmdldCkuYXR0cignX2lkJykpe1xuICAgICAgICAgICAgICAgICAgICBtZW51TGlzdC5zcGxpY2UoaW5kZXgsIDEpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSwgMSk7XG4gICAgfVxuICAgIFxuICAgIGhhbmRsZXIoaXRlbSl7XG4gICAgICAgIG1lbnVMaXN0LnNwbGljZSgwLCAxMDApXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpdGVtLmhhbmRsZXIoKVxuICAgICAgICB9LCAxMCk7XG4gICAgfVxuICAgIFxuICAgIG1vdXNlZW50ZXIoKXtcbiAgICAgICAgY2xlYXJUaW1lb3V0KGhpZGVUaW1lb3V0KVxuICAgIH1cbiAgICBcbiAgICBtb3VzZW91dCgpXG4gICAge1xuICAgICAgICBpZiggIXRoaXMuY29uZmlnLm1vdXNlb3V0SGlkZSApXG4gICAgICAgICAgICByZXR1cm4gXG4gICAgICAgIFxuICAgICAgICBtZW51TGlzdC5mb3JFYWNoKChpdGVtLCBpbmRleCk9PntcbiAgICAgICAgICAgIGlmKGl0ZW0uX2lkID09PSB0aGlzLmNvbmZpZy5faWQpe1xuICAgICAgICAgICAgICAgIG1lbnVMaXN0LnNwbGljZShpbmRleCwgMSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG4gICAgXG4gICAgbW91c2VlbnRlckl0ZW0oaXRlbXMsIGV2ZW50KVxuICAgIHtcbiAgICAgICAgdmFyIGxpUG9zaXRpb24gPSAkKGV2ZW50LnRhcmdldCkucG9zaXRpb24oKVxuICAgICAgICB2YXIgbWVudVBvc2l0aW9uID0gJCh0aGlzLmVsZW1lbnQpLmZpbmQoJy5jb250ZW50LW1lbnUnKS5wb3NpdGlvbigpXG4gICAgICAgIHZhciB0b3AgPSBsaVBvc2l0aW9uLnRvcCArIG1lbnVQb3NpdGlvbi50b3BcbiAgICAgICAgdmFyIGxlZnQgPSBsaVBvc2l0aW9uLmxlZnQgKyBtZW51UG9zaXRpb24ubGVmdCArICQodGhpcy5lbGVtZW50KS5maW5kKCcuY29udGVudC1tZW51Jykud2lkdGgoKVxuICAgICAgICBcbiAgICAgICAgaWYoICFpdGVtcyApXG4gICAgICAgICAgICByZXR1cm4gXG4gICAgICAgIFxuICAgICAgICBtZW51TGlzdC5wdXNoKHtcbiAgICAgICAgICAgIF9pZDogJ3AnICsgJChldmVudC50YXJnZXQpLmF0dHIoJ19pZCcpLFxuICAgICAgICAgICAgbW91c2VvdXRIaWRlOiB0cnVlLFxuICAgICAgICAgICAgdG9wOiB0b3AsXG4gICAgICAgICAgICBsZWZ0OiBsZWZ0LFxuICAgICAgICAgICAgaXRlbXM6IGl0ZW1zXG4gICAgICAgIH0pXG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9