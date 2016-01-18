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
var StartCmp = (function () {
    function StartCmp() {
        this._id = 'start';
    }
    StartCmp.prototype.clickStart = function () {
        alert('敬请期待!');
    };
    StartCmp = __decorate([
        core_1.Component({
            selector: 'start',
            template: "\n        <div class=\"task-start\"> \n            <div class=\"start-button\" (click)=\"clickStart()\"></div> \n            <div class=\"task-search\"> \n                <input type=\"text\" placeholder=\"Search the web and Windows\">  \n            </div>\n            \n        </div>\n    ",
            styles: ["\n\n      .task-start .start-button{\n          background-image:url(\"../../resource/images/start.png\");\n          background-size: contain;\n          float: left;\n          width: 50px;\n          height: 40px;\n      }\n\n      .task-start .start-button:hover{\n          transition: 0.5s linear;\n          background-image:url(\"../../resource/images/start-hover.png\");\n      }\n\n      .task-start .task-search{\n          float: left;\n          margin-left: 5px;\n      /*    background: rgba(48,74,109,0.9);*/\n      }\n\n      .task-start .task-search input{\n          height: 28px;\n          width: 300px;\n          background: rgba(82,101,127,1);\n          border: 0px;\n          font-size: 14px;\n          padding-left: 5px;\n          margin: 5px 12px;\n      } \n\n      .task-start .task-search input:focus{\n          background:none;\n          background: #fff;\n          outline:none;\n      }\n    "],
            directives: [common_1.NgStyle]
        }), 
        __metadata('design:paramtypes', [])
    ], StartCmp);
    return StartCmp;
})();
exports.StartCmp = StartCmp;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlc2t0b3AvdGFza2Jhci9zdGFydC50cyJdLCJuYW1lcyI6WyJTdGFydENtcCIsIlN0YXJ0Q21wLmNvbnN0cnVjdG9yIiwiU3RhcnRDbXAuY2xpY2tTdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEscUJBQXdCLGVBQWUsQ0FBQyxDQUFBO0FBQ3hDLHVCQUFzQixpQkFBaUIsQ0FBQyxDQUFBO0FBRXhDO0lBQUFBO1FBb0RJQyxRQUFHQSxHQUFHQSxPQUFPQSxDQUFDQTtJQUlsQkEsQ0FBQ0E7SUFIR0QsNkJBQVVBLEdBQVZBO1FBQ0lFLEtBQUtBLENBQUNBLE9BQU9BLENBQUNBLENBQUFBO0lBQ2xCQSxDQUFDQTtJQXZETEY7UUFBQ0EsZ0JBQVNBLENBQUNBO1lBQ1BBLFFBQVFBLEVBQUVBLE9BQU9BO1lBQ2pCQSxRQUFRQSxFQUFFQSx1U0FRVEE7WUFDREEsTUFBTUEsRUFBRUEsQ0FBQ0EsczZCQW9DUkEsQ0FBQ0E7WUFDRkEsVUFBVUEsRUFBRUEsQ0FBQ0EsZ0JBQU9BLENBQUNBO1NBQ3hCQSxDQUFDQTs7aUJBT0RBO0lBQURBLGVBQUNBO0FBQURBLENBeERBLEFBd0RDQSxJQUFBO0FBTFksZ0JBQVEsV0FLcEIsQ0FBQSIsImZpbGUiOiJkZXNrdG9wL3Rhc2tiYXIvc3RhcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge05nU3R5bGV9IGZyb20gJ2FuZ3VsYXIyL2NvbW1vbic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnc3RhcnQnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YXNrLXN0YXJ0XCI+IFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXJ0LWJ1dHRvblwiIChjbGljayk9XCJjbGlja1N0YXJ0KClcIj48L2Rpdj4gXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFzay1zZWFyY2hcIj4gXG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJTZWFyY2ggdGhlIHdlYiBhbmQgV2luZG93c1wiPiAgXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIFxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIHN0eWxlczogW2BcblxuICAgICAgLnRhc2stc3RhcnQgLnN0YXJ0LWJ1dHRvbntcbiAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOnVybChcIi4uLy4uL3Jlc291cmNlL2ltYWdlcy9zdGFydC5wbmdcIik7XG4gICAgICAgICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xuICAgICAgICAgIGZsb2F0OiBsZWZ0O1xuICAgICAgICAgIHdpZHRoOiA1MHB4O1xuICAgICAgICAgIGhlaWdodDogNDBweDtcbiAgICAgIH1cblxuICAgICAgLnRhc2stc3RhcnQgLnN0YXJ0LWJ1dHRvbjpob3ZlcntcbiAgICAgICAgICB0cmFuc2l0aW9uOiAwLjVzIGxpbmVhcjtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOnVybChcIi4uLy4uL3Jlc291cmNlL2ltYWdlcy9zdGFydC1ob3Zlci5wbmdcIik7XG4gICAgICB9XG5cbiAgICAgIC50YXNrLXN0YXJ0IC50YXNrLXNlYXJjaHtcbiAgICAgICAgICBmbG9hdDogbGVmdDtcbiAgICAgICAgICBtYXJnaW4tbGVmdDogNXB4O1xuICAgICAgLyogICAgYmFja2dyb3VuZDogcmdiYSg0OCw3NCwxMDksMC45KTsqL1xuICAgICAgfVxuXG4gICAgICAudGFzay1zdGFydCAudGFzay1zZWFyY2ggaW5wdXR7XG4gICAgICAgICAgaGVpZ2h0OiAyOHB4O1xuICAgICAgICAgIHdpZHRoOiAzMDBweDtcbiAgICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKDgyLDEwMSwxMjcsMSk7XG4gICAgICAgICAgYm9yZGVyOiAwcHg7XG4gICAgICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgICAgIHBhZGRpbmctbGVmdDogNXB4O1xuICAgICAgICAgIG1hcmdpbjogNXB4IDEycHg7XG4gICAgICB9IFxuXG4gICAgICAudGFzay1zdGFydCAudGFzay1zZWFyY2ggaW5wdXQ6Zm9jdXN7XG4gICAgICAgICAgYmFja2dyb3VuZDpub25lO1xuICAgICAgICAgIGJhY2tncm91bmQ6ICNmZmY7XG4gICAgICAgICAgb3V0bGluZTpub25lO1xuICAgICAgfVxuICAgIGBdLFxuICAgIGRpcmVjdGl2ZXM6IFtOZ1N0eWxlXVxufSlcblxuZXhwb3J0IGNsYXNzIFN0YXJ0Q21wIHtcbiAgICBfaWQgPSAnc3RhcnQnO1xuICAgIGNsaWNrU3RhcnQoKXtcbiAgICAgICAgYWxlcnQoJ+aVrOivt+acn+W+hSEnKVxuICAgIH1cbn1cblxuICAgICAgICAgICAgLy8gPGRpdiBzdHlsZT1cImJvcmRlcjogMXB4IHNvbGlkICMwMDA7d2lkdGg6NDUlO2hlaWdodDo0MDBweDtwb3NpdGlvbjphYnNvbHV0ZTtib3R0b206NDBweDtvcGFjaXR5OiAwLjk7YmFja2dyb3VuZDpyZ2JhKDMxLDQ5LDc1LDEpXCI+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIDwvZGl2PiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==