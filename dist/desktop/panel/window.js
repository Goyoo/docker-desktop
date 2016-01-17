var util_1 = require('../tools/util');
var dock_1 = require('../../desktop/taskbar/dock');
window['ZINDEX'] = window['ZINDEX'] || 100;
exports.windowTemplate = "\n    <div id=\"{{config && config._id}}\" (mousedown)=\"focus(config && config._id)\" [ngStyle]=\"{'width': width+'px', 'height': height+'px', 'z-index': zindex}\"  class=\"panel desktop-window\"  > \n        <div class=\"header\" style=\"position: absolute;\"> \n            <div class=\"icon {{config.icon}}\"></div> \n            <div class=\"title\">{{config.title}}</div> \n            <div class=\"panel-title-buttons\"> \n                <div class=\"icon-min\" (click)=\"min()\"> </div> \n                <div class=\"icon-max\" (click)=\"max()\"> </div> \n                <div class=\"icon-close\" (click)=\"destroy()\"> </div> \n            </div> \n        </div>\n        \n        {{__body__}}\n        \n        <div class=\"design-resize-left design-resize\"></div>\n        <div class=\"design-resize-right design-resize\"></div>\n        <div class=\"design-resize-bottom design-resize\"></div>\n        <div class=\"design-resize-right-bottom design-resize\"></div>\n        <div class=\"design-resize-left-bottom design-resize\"></div>\n    </div> \n";
var WindowCmp = (function () {
    function WindowCmp() {
        var _this = this;
        this.width = 900;
        this.height = 300;
        setTimeout(function () {
            _this.focus(1);
        });
    }
    WindowCmp.prototype.setDialog = function () {
        util_1.dialog({
            top: 50 + (Math.random() * 100),
            left: 100 + (Math.random() * 100),
            taskBarHeight: 42,
            element: $(this.element).find('.panel')[0],
            eventEl: $(this.element).find('.header')[0],
            onMove: function () {
            },
            onMouseUp: function () {
            },
            onResize: function () {
            }
        });
    };
    WindowCmp.prototype.setTitle = function (title) {
        $(this.element).find('.title').html(title);
    };
    WindowCmp.prototype.focus = function (id) {
        $(this.element).find('.panel').css('z-index', window['ZINDEX']++);
        $('.panel').removeClass('focus');
        $(this.element).find('.panel').addClass('focus');
    };
    WindowCmp.prototype.destroy = function () {
        var _this = this;
        this.config.componentList.forEach(function (item, index) {
            if (item._id === _this.config._id)
                _this.config.componentList.splice(index, 1);
        });
        if (this.config.componentList.length)
            return;
        dock_1.dockAppList.forEach(function (item, index) {
            if (item._id === _this.config.type)
                dock_1.dockAppList.splice(index, 1);
        });
    };
    WindowCmp.prototype.min = function () {
        $(this.element).find('.panel').hide();
    };
    WindowCmp.prototype.max = function () {
    };
    return WindowCmp;
})();
exports.WindowCmp = WindowCmp;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlc2t0b3AvcGFuZWwvd2luZG93LnRzIl0sIm5hbWVzIjpbIldpbmRvd0NtcCIsIldpbmRvd0NtcC5jb25zdHJ1Y3RvciIsIldpbmRvd0NtcC5zZXREaWFsb2ciLCJXaW5kb3dDbXAuc2V0VGl0bGUiLCJXaW5kb3dDbXAuZm9jdXMiLCJXaW5kb3dDbXAuZGVzdHJveSIsIldpbmRvd0NtcC5taW4iLCJXaW5kb3dDbXAubWF4Il0sIm1hcHBpbmdzIjoiQUFFQSxxQkFBcUIsZUFBZSxDQUFDLENBQUE7QUFDckMscUJBQTRCLDRCQUE0QixDQUFDLENBQUE7QUFJekQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLENBQUE7QUFFL0Isc0JBQWMsR0FBRyxnakNBb0IzQixDQUFBO0FBRUQ7SUFLSUE7UUFMSkMsaUJBNkRDQTtRQTFEQUEsVUFBS0EsR0FBR0EsR0FBR0EsQ0FBQUE7UUFDWEEsV0FBTUEsR0FBR0EsR0FBR0EsQ0FBQUE7UUFFTEEsVUFBVUEsQ0FBQ0E7WUFDUEEsS0FBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQUE7UUFDakJBLENBQUNBLENBQUNBLENBQUFBO0lBQ05BLENBQUNBO0lBQ0RELDZCQUFTQSxHQUFUQTtRQUVJRSxhQUFNQSxDQUFDQTtZQUNIQSxHQUFHQSxFQUFFQSxFQUFFQSxHQUFFQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxFQUFFQSxHQUFDQSxHQUFHQSxDQUFDQTtZQUM1QkEsSUFBSUEsRUFBRUEsR0FBR0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsRUFBRUEsR0FBQ0EsR0FBR0EsQ0FBQ0E7WUFDL0JBLGFBQWFBLEVBQUVBLEVBQUVBO1lBQ2pCQSxPQUFPQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUMxQ0EsT0FBT0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDM0NBLE1BQU1BLEVBQUVBO1lBRWpCQSxDQUFDQTtZQUNEQSxTQUFTQSxFQUFFQTtZQUVYQSxDQUFDQTtZQUNRQSxRQUFRQSxFQUFFQTtZQUVWQSxDQUFDQTtTQUNKQSxDQUFDQSxDQUFBQTtJQUNOQSxDQUFDQTtJQUVERiw0QkFBUUEsR0FBUkEsVUFBU0EsS0FBS0E7UUFDVkcsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQUE7SUFFOUNBLENBQUNBO0lBRURILHlCQUFLQSxHQUFMQSxVQUFNQSxFQUFFQTtRQUNKSSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxTQUFTQSxFQUFFQSxNQUFNQSxDQUFDQSxRQUFRQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtRQUNsRUEsQ0FBQ0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7UUFDakNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLFFBQVFBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO0lBQ3JEQSxDQUFDQTtJQUVESiwyQkFBT0EsR0FBUEE7UUFBQUssaUJBYUNBO1FBWkdBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLGFBQWFBLENBQUNBLE9BQU9BLENBQUNBLFVBQUNBLElBQUlBLEVBQUVBLEtBQUtBO1lBQzFDQSxFQUFFQSxDQUFBQSxDQUFFQSxJQUFJQSxDQUFDQSxHQUFHQSxLQUFLQSxLQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxHQUFJQSxDQUFDQTtnQkFDOUJBLEtBQUlBLENBQUNBLE1BQU1BLENBQUNBLGFBQWFBLENBQUNBLE1BQU1BLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBLENBQUNBLENBQUFBO1FBQ2xEQSxDQUFDQSxDQUFDQSxDQUFBQTtRQUVGQSxFQUFFQSxDQUFBQSxDQUFFQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxhQUFhQSxDQUFDQSxNQUFPQSxDQUFDQTtZQUNsQ0EsTUFBTUEsQ0FBQUE7UUFFVkEsa0JBQVdBLENBQUNBLE9BQU9BLENBQUNBLFVBQUNBLElBQUlBLEVBQUVBLEtBQUtBO1lBQzVCQSxFQUFFQSxDQUFBQSxDQUFFQSxJQUFJQSxDQUFDQSxHQUFHQSxLQUFLQSxLQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFLQSxDQUFDQTtnQkFDL0JBLGtCQUFXQSxDQUFDQSxNQUFNQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFBQTtRQUNwQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQUE7SUFDTkEsQ0FBQ0E7SUFDREwsdUJBQUdBLEdBQUhBO1FBQ0lNLENBQUNBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLElBQUlBLEVBQUVBLENBQUFBO0lBQ3pDQSxDQUFDQTtJQUNETix1QkFBR0EsR0FBSEE7SUFFQU8sQ0FBQ0E7SUFDTFAsZ0JBQUNBO0FBQURBLENBN0RBLEFBNkRDQSxJQUFBO0FBN0RZLGlCQUFTLFlBNkRyQixDQUFBIiwiZmlsZSI6ImRlc2t0b3AvcGFuZWwvd2luZG93LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEluamVjdCwgRWxlbWVudFJlZn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge05nU3R5bGV9IGZyb20gJ2FuZ3VsYXIyL2NvbW1vbic7XG5pbXBvcnQge2RpYWxvZ30gZnJvbSAnLi4vdG9vbHMvdXRpbCc7XG5pbXBvcnQgeyBkb2NrQXBwTGlzdCB9IGZyb20gJy4uLy4uL2Rlc2t0b3AvdGFza2Jhci9kb2NrJztcblxuZGVjbGFyZSB2YXIgJFxuXG53aW5kb3dbJ1pJTkRFWCddID0gd2luZG93WydaSU5ERVgnXSB8fCAxMDBcblxuZXhwb3J0IHZhciB3aW5kb3dUZW1wbGF0ZSA9IGBcbiAgICA8ZGl2IGlkPVwie3tjb25maWcgJiYgY29uZmlnLl9pZH19XCIgKG1vdXNlZG93bik9XCJmb2N1cyhjb25maWcgJiYgY29uZmlnLl9pZClcIiBbbmdTdHlsZV09XCJ7J3dpZHRoJzogd2lkdGgrJ3B4JywgJ2hlaWdodCc6IGhlaWdodCsncHgnLCAnei1pbmRleCc6IHppbmRleH1cIiAgY2xhc3M9XCJwYW5lbCBkZXNrdG9wLXdpbmRvd1wiICA+IFxuICAgICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyXCIgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7XCI+IFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImljb24ge3tjb25maWcuaWNvbn19XCI+PC9kaXY+IFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpdGxlXCI+e3tjb25maWcudGl0bGV9fTwvZGl2PiBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC10aXRsZS1idXR0b25zXCI+IFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpY29uLW1pblwiIChjbGljayk9XCJtaW4oKVwiPiA8L2Rpdj4gXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImljb24tbWF4XCIgKGNsaWNrKT1cIm1heCgpXCI+IDwvZGl2PiBcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaWNvbi1jbG9zZVwiIChjbGljayk9XCJkZXN0cm95KClcIj4gPC9kaXY+IFxuICAgICAgICAgICAgPC9kaXY+IFxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgXG4gICAgICAgIHt7X19ib2R5X199fVxuICAgICAgICBcbiAgICAgICAgPGRpdiBjbGFzcz1cImRlc2lnbi1yZXNpemUtbGVmdCBkZXNpZ24tcmVzaXplXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJkZXNpZ24tcmVzaXplLXJpZ2h0IGRlc2lnbi1yZXNpemVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRlc2lnbi1yZXNpemUtYm90dG9tIGRlc2lnbi1yZXNpemVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRlc2lnbi1yZXNpemUtcmlnaHQtYm90dG9tIGRlc2lnbi1yZXNpemVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRlc2lnbi1yZXNpemUtbGVmdC1ib3R0b20gZGVzaWduLXJlc2l6ZVwiPjwvZGl2PlxuICAgIDwvZGl2PiBcbmBcblxuZXhwb3J0IGNsYXNzIFdpbmRvd0NtcHtcbiAgICBjb25maWc6YW55O1xuICAgIGVsZW1lbnQ6IGFueTtcblx0d2lkdGggPSA5MDBcblx0aGVpZ2h0ID0gMzAwXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc2V0VGltZW91dCgoKT0+e1xuICAgICAgICAgICAgdGhpcy5mb2N1cygxKVxuICAgICAgICB9KVxuICAgIH1cbiAgICBzZXREaWFsb2coKVxuICAgIHtcbiAgICAgICAgZGlhbG9nKHtcbiAgICAgICAgICAgIHRvcDogNTArIChNYXRoLnJhbmRvbSgpKjEwMCksXG4gICAgICAgICAgICBsZWZ0OiAxMDAgKyAoTWF0aC5yYW5kb20oKSoxMDApLFxuICAgICAgICAgICAgdGFza0JhckhlaWdodDogNDIsXG4gICAgICAgICAgICBlbGVtZW50OiAkKHRoaXMuZWxlbWVudCkuZmluZCgnLnBhbmVsJylbMF0sXG4gICAgICAgICAgICBldmVudEVsOiAkKHRoaXMuZWxlbWVudCkuZmluZCgnLmhlYWRlcicpWzBdLFxuICAgICAgICAgICAgb25Nb3ZlOiAoKSA9PiB7XG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdG9uTW91c2VVcDogKCkgPT4ge1xuXHRcdFx0XHRcblx0XHRcdH0sXG4gICAgICAgICAgICBvblJlc2l6ZTogKCkgPT4ge1xuXHRcdFx0XHRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG4gICAgXG4gICAgc2V0VGl0bGUodGl0bGUpe1xuICAgICAgICAkKHRoaXMuZWxlbWVudCkuZmluZCgnLnRpdGxlJykuaHRtbCh0aXRsZSlcbiAgICAgICAgLy8gdGhpcy5jb25maWcudGl0bGUgPSB0aXRsZVxuICAgIH1cbiAgICBcbiAgICBmb2N1cyhpZCl7XG4gICAgICAgICQodGhpcy5lbGVtZW50KS5maW5kKCcucGFuZWwnKS5jc3MoJ3otaW5kZXgnLCB3aW5kb3dbJ1pJTkRFWCddKyspO1xuICAgICAgICAkKCcucGFuZWwnKS5yZW1vdmVDbGFzcygnZm9jdXMnKTtcbiAgICAgICAgJCh0aGlzLmVsZW1lbnQpLmZpbmQoJy5wYW5lbCcpLmFkZENsYXNzKCdmb2N1cycpO1xuICAgIH1cbiAgICBcbiAgICBkZXN0cm95KCl7XG4gICAgICAgIHRoaXMuY29uZmlnLmNvbXBvbmVudExpc3QuZm9yRWFjaCgoaXRlbSwgaW5kZXgpPT57XG4gICAgICAgICAgICBpZiggaXRlbS5faWQgPT09IHRoaXMuY29uZmlnLl9pZCApXG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWcuY29tcG9uZW50TGlzdC5zcGxpY2UoaW5kZXgsIDEpXG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgICAgICBpZiggdGhpcy5jb25maWcuY29tcG9uZW50TGlzdC5sZW5ndGggKVxuICAgICAgICAgICAgcmV0dXJuIFxuICAgICAgICBcbiAgICAgICAgZG9ja0FwcExpc3QuZm9yRWFjaCgoaXRlbSwgaW5kZXgpPT57XG4gICAgICAgICAgICBpZiggaXRlbS5faWQgPT09IHRoaXMuY29uZmlnLnR5cGUgKVxuICAgICAgICAgICAgICAgIGRvY2tBcHBMaXN0LnNwbGljZShpbmRleCwgMSlcbiAgICAgICAgfSlcbiAgICB9XG4gICAgbWluKCl7XG4gICAgICAgICQodGhpcy5lbGVtZW50KS5maW5kKCcucGFuZWwnKS5oaWRlKClcbiAgICB9XG4gICAgbWF4KCl7XG4gICAgICAgIFxuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==