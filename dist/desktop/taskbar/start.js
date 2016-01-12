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
    StartCmp = __decorate([
        core_1.Component({
            selector: 'start',
            template: "\n        <div class=\"task-start\"> \n            <div class=\"start-button\"></div> \n            <div class=\"task-search\"> \n                <input type=\"text\" placeholder=\"Search the web and Windows\">  \n            </div> \n        </div>\n    ",
            styles: ["\n\n      .task-start .start-button{\n          background-image:url(\"../../resource/images/start.png\");\n          background-size: contain;\n          float: left;\n          width: 50px;\n          height: 40px;\n      }\n\n      .task-start .start-button:hover{\n          transition: 0.5s linear;\n          background-image:url(\"../../resource/images/start-hover.png\");\n      }\n\n      .task-start .task-search{\n          float: left;\n          margin-left: 5px;\n      /*    background: rgba(48,74,109,0.9);*/\n      }\n\n      .task-start .task-search input{\n          height: 28px;\n          width: 300px;\n          background: rgba(82,101,127,1);\n          border: 0px;\n          font-size: 14px;\n          padding-left: 5px;\n          margin: 5px 12px;\n      } \n\n      .task-start .task-search input:focus{\n          background:none;\n          background: #fff;\n          outline:none;\n      }\n    "],
            directives: [common_1.NgStyle]
        }), 
        __metadata('design:paramtypes', [])
    ], StartCmp);
    return StartCmp;
})();
exports.StartCmp = StartCmp;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlc2t0b3AvdGFza2Jhci9zdGFydC50cyJdLCJuYW1lcyI6WyJTdGFydENtcCIsIlN0YXJ0Q21wLmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxxQkFBd0IsZUFBZSxDQUFDLENBQUE7QUFDeEMsdUJBQXNCLGlCQUFpQixDQUFDLENBQUE7QUFFeEM7SUFBQUE7UUFtRElDLFFBQUdBLEdBQUdBLE9BQU9BLENBQUNBO0lBQ2xCQSxDQUFDQTtJQXBEREQ7UUFBQ0EsZ0JBQVNBLENBQUNBO1lBQ1BBLFFBQVFBLEVBQUVBLE9BQU9BO1lBQ2pCQSxRQUFRQSxFQUFFQSxpUUFPVEE7WUFDREEsTUFBTUEsRUFBRUEsQ0FBQ0EsczZCQW9DUkEsQ0FBQ0E7WUFDRkEsVUFBVUEsRUFBRUEsQ0FBQ0EsZ0JBQU9BLENBQUNBO1NBQ3hCQSxDQUFDQTs7aUJBSURBO0lBQURBLGVBQUNBO0FBQURBLENBcERBLEFBb0RDQSxJQUFBO0FBRlksZ0JBQVEsV0FFcEIsQ0FBQSIsImZpbGUiOiJkZXNrdG9wL3Rhc2tiYXIvc3RhcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge05nU3R5bGV9IGZyb20gJ2FuZ3VsYXIyL2NvbW1vbic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnc3RhcnQnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YXNrLXN0YXJ0XCI+IFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXJ0LWJ1dHRvblwiPjwvZGl2PiBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YXNrLXNlYXJjaFwiPiBcbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaCB0aGUgd2ViIGFuZCBXaW5kb3dzXCI+ICBcbiAgICAgICAgICAgIDwvZGl2PiBcbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBzdHlsZXM6IFtgXG5cbiAgICAgIC50YXNrLXN0YXJ0IC5zdGFydC1idXR0b257XG4gICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTp1cmwoXCIuLi8uLi9yZXNvdXJjZS9pbWFnZXMvc3RhcnQucG5nXCIpO1xuICAgICAgICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcbiAgICAgICAgICBmbG9hdDogbGVmdDtcbiAgICAgICAgICB3aWR0aDogNTBweDtcbiAgICAgICAgICBoZWlnaHQ6IDQwcHg7XG4gICAgICB9XG5cbiAgICAgIC50YXNrLXN0YXJ0IC5zdGFydC1idXR0b246aG92ZXJ7XG4gICAgICAgICAgdHJhbnNpdGlvbjogMC41cyBsaW5lYXI7XG4gICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTp1cmwoXCIuLi8uLi9yZXNvdXJjZS9pbWFnZXMvc3RhcnQtaG92ZXIucG5nXCIpO1xuICAgICAgfVxuXG4gICAgICAudGFzay1zdGFydCAudGFzay1zZWFyY2h7XG4gICAgICAgICAgZmxvYXQ6IGxlZnQ7XG4gICAgICAgICAgbWFyZ2luLWxlZnQ6IDVweDtcbiAgICAgIC8qICAgIGJhY2tncm91bmQ6IHJnYmEoNDgsNzQsMTA5LDAuOSk7Ki9cbiAgICAgIH1cblxuICAgICAgLnRhc2stc3RhcnQgLnRhc2stc2VhcmNoIGlucHV0e1xuICAgICAgICAgIGhlaWdodDogMjhweDtcbiAgICAgICAgICB3aWR0aDogMzAwcHg7XG4gICAgICAgICAgYmFja2dyb3VuZDogcmdiYSg4MiwxMDEsMTI3LDEpO1xuICAgICAgICAgIGJvcmRlcjogMHB4O1xuICAgICAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDVweDtcbiAgICAgICAgICBtYXJnaW46IDVweCAxMnB4O1xuICAgICAgfSBcblxuICAgICAgLnRhc2stc3RhcnQgLnRhc2stc2VhcmNoIGlucHV0OmZvY3Vze1xuICAgICAgICAgIGJhY2tncm91bmQ6bm9uZTtcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAjZmZmO1xuICAgICAgICAgIG91dGxpbmU6bm9uZTtcbiAgICAgIH1cbiAgICBgXSxcbiAgICBkaXJlY3RpdmVzOiBbTmdTdHlsZV1cbn0pXG5cbmV4cG9ydCBjbGFzcyBTdGFydENtcCB7XG4gICAgX2lkID0gJ3N0YXJ0Jztcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==