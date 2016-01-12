import {Component, Input, Inject, ElementRef} from 'angular2/core';
import {NgStyle} from 'angular2/common';
import {getUid} from '../tools/util';

declare var $
var hideTimeout:any = 0;

export var menuList = []

@Component({
    selector: 'menu',
    template: `
        <div *ngIf="config" id="{{config._id}}" class="content-menu" [ngStyle]="{'top': config.top+'px', 'left': config.left+'px'}" (mouseenter)="mouseenter()" (mouseleave)="mouseout()" >
            <ul id="-body">
                <li *ngFor="#item of config.items" (click)="handler(item)" id="{{item._id}}" (mouseenter)="mouseenterItem(item.items, $event)" (mouseleave)="mouseoutItem($event, item)">
                    <a>{{item.text}}</a><div *ngIf="item.items"  class="right-arrows"></div>
                </li>
            </ul>
        </div>
    `,
    styleUrls: ['./desktop/menu/menu.css'],
    directives: [NgStyle]
})

export class MenuCmp {
    @Input() config;
    element: any
    constructor(@Inject(ElementRef) elementRef: ElementRef){
        this.element = elementRef.nativeElement
        
        setTimeout(()=> {
            this.config.items.forEach((item)=>{
                item._id = getUid(16)
            })
        });
	}
    
    mouseoutItem(event, item)
    {
        if( !item.items )
            return 
        
        hideTimeout = setTimeout(()=> {
            if( this.config.mouseoutHide )
                return 
                
            menuList.forEach((item, index)=>{
                if(item._id === 'p'+ $(event.target).attr('_id')){
                    menuList.splice(index, 1)
                }
            })
        }, 1);
    }
    
    handler(item){
        menuList.splice(0, 100)
        setTimeout(function() {
            item.handler()
        }, 10);
    }
    
    mouseenter(){
        clearTimeout(hideTimeout)
    }
    
    mouseout()
    {
        if( !this.config.mouseoutHide )
            return 
        
        menuList.forEach((item, index)=>{
            if(item._id === this.config._id){
                menuList.splice(index, 1)
            }
        })
    }
    
    mouseenterItem(items, event)
    {
        var liPosition = $(event.target).position()
        var menuPosition = $(this.element).find('.content-menu').position()
        var top = liPosition.top + menuPosition.top
        var left = liPosition.left + menuPosition.left + $(this.element).find('.content-menu').width()
        
        if( !items )
            return 
        
        menuList.push({
            _id: 'p' + $(event.target).attr('_id'),
            mouseoutHide: true,
            top: top,
            left: left,
            items: items
        })
    }
}
