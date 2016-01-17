import {Component} from 'angular2/core';
import { Http, HTTP_PROVIDERS, Headers} from 'angular2/http';
import { NgStyle, NgFor } from 'angular2/common';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_BINDINGS, RouteParams} from 'angular2/router';
declare var $

var postOptions = { headers:  new Headers({
	'Content-Type': 'application/json'
})}

@Component({
    selector: 'home',
    templateUrl: './components/home/home.html',
    directives: [NgFor, ROUTER_DIRECTIVES],
    viewProviders: [HTTP_PROVIDERS]
})
export class HomeCmp 
{
    list = []
    
    constructor(public http?: Http, routerParams?: RouteParams) {
        console.log(routerParams.params)
        this.get()
    }
    
    get(){
        this.http.get('/container/list').subscribe(res => {
            this.list = res.json()
        })
    }
    
    create() 
    {
        var json:any = {}
        
        json.name = $('#name').val()
        json.zone = $('#zone').val()
        json.image = $('#image').val()
        
        this.http.post('/container/create', JSON.stringify(json), postOptions).subscribe(res => {
            
            if( res.status !== 200 )            
                return alert('创建失败')
            
            $("#myModal").modal('hide');
            this.get()
        })
    }
}
