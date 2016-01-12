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
var name_list_1 = require('../../services/name_list');
var AboutCmp = (function () {
    function AboutCmp(list) {
        this.list = list;
    }
    AboutCmp.prototype.addName = function (newname) {
        this.list.add(newname.value);
        newname.value = '';
        return false;
    };
    AboutCmp = __decorate([
        core_1.Component({
            selector: 'about',
            template: "\n    <p>\n      For reward, here is a list of awesome computer scientists!\n    </p>\n\n    <p>\n      You want more? Add them yourself!\n    </p>\n    <form (submit)=\"addName(newname)\">\n      <input #newname>\n      <button type=\"submit\">Add</button>\n    </form>\n    <ul>\n      <li *ngFor=\"#name of list.get()\">{{name}}</li>\n    </ul>\n  "
        }), 
        __metadata('design:paramtypes', [name_list_1.NameList])
    ], AboutCmp);
    return AboutCmp;
})();
exports.AboutCmp = AboutCmp;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYWJvdXQvYWJvdXQudHMiXSwibmFtZXMiOlsiQWJvdXRDbXAiLCJBYm91dENtcC5jb25zdHJ1Y3RvciIsIkFib3V0Q21wLmFkZE5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLHFCQUF3QixlQUFlLENBQUMsQ0FBQTtBQUV4QywwQkFBdUIsMEJBQTBCLENBQUMsQ0FBQTtBQUVsRDtJQW9CRUEsa0JBQW1CQSxJQUFjQTtRQUFkQyxTQUFJQSxHQUFKQSxJQUFJQSxDQUFVQTtJQUFHQSxDQUFDQTtJQUtyQ0QsMEJBQU9BLEdBQVBBLFVBQVFBLE9BQU9BO1FBQ2JFLElBQUlBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1FBQzdCQSxPQUFPQSxDQUFDQSxLQUFLQSxHQUFHQSxFQUFFQSxDQUFDQTtRQUNuQkEsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7SUFDZkEsQ0FBQ0E7SUE3QkhGO1FBQUNBLGdCQUFTQSxDQUFDQTtZQUNUQSxRQUFRQSxFQUFFQSxPQUFPQTtZQUNqQkEsUUFBUUEsRUFBRUEsaVdBZVRBO1NBQ0ZBLENBQUNBOztpQkFZREE7SUFBREEsZUFBQ0E7QUFBREEsQ0E5QkEsQUE4QkNBLElBQUE7QUFYWSxnQkFBUSxXQVdwQixDQUFBIiwiZmlsZSI6ImNvbXBvbmVudHMvYWJvdXQvYWJvdXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5cbmltcG9ydCB7TmFtZUxpc3R9IGZyb20gJy4uLy4uL3NlcnZpY2VzL25hbWVfbGlzdCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Fib3V0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8cD5cbiAgICAgIEZvciByZXdhcmQsIGhlcmUgaXMgYSBsaXN0IG9mIGF3ZXNvbWUgY29tcHV0ZXIgc2NpZW50aXN0cyFcbiAgICA8L3A+XG5cbiAgICA8cD5cbiAgICAgIFlvdSB3YW50IG1vcmU/IEFkZCB0aGVtIHlvdXJzZWxmIVxuICAgIDwvcD5cbiAgICA8Zm9ybSAoc3VibWl0KT1cImFkZE5hbWUobmV3bmFtZSlcIj5cbiAgICAgIDxpbnB1dCAjbmV3bmFtZT5cbiAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPkFkZDwvYnV0dG9uPlxuICAgIDwvZm9ybT5cbiAgICA8dWw+XG4gICAgICA8bGkgKm5nRm9yPVwiI25hbWUgb2YgbGlzdC5nZXQoKVwiPnt7bmFtZX19PC9saT5cbiAgICA8L3VsPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIEFib3V0Q21wIHtcbiAgY29uc3RydWN0b3IocHVibGljIGxpc3Q6IE5hbWVMaXN0KSB7fVxuIC8qXG4gKiBAcGFyYW0gbmV3bmFtZSAgYW55IHRleHQgYXMgaW5wdXQuXG4gKiBAcmV0dXJucyByZXR1cm4gZmFsc2UgdG8gcHJldmVudCBkZWZhdWx0IGZvcm0gc3VibWl0IGJlaGF2aW9yIHRvIHJlZnJlc2ggdGhlIHBhZ2UuXG4gKi9cbiAgYWRkTmFtZShuZXduYW1lKTogYm9vbGVhbiB7XG4gICAgdGhpcy5saXN0LmFkZChuZXduYW1lLnZhbHVlKTtcbiAgICBuZXduYW1lLnZhbHVlID0gJyc7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=