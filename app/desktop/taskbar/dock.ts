import {Component, ElementRef, Inject, Input} from 'angular2/core';
import {NgStyle} from 'angular2/common';
import { WindowCmp, windowTemplate } from '../panel/window';

declare var $

export var dockAppList = []

@Component({
    selector: 'dock-app',
    styleUrls: ['./desktop/taskbar/dock.css'],
    template:  `
        <div class="task-icon {{dock.items.length>1?'task-icon-many':''}}" id="app-icon-{{dock._id}}" ><div  (mouseenter)="mouseenter(dock._id)" (mouseout)="mouseout(dock._id)" class="task-icon-img {{dock.icon}}"></div></div>
        <div id="app-icon-block-{{dock._id}}" (mouseenter)="mouseenter(dock._id)" (mouseleave)="mouseout(dock._id)" class="app-block" style="display:none"> 
            <div *ngFor="#item of dock.items" (mouseenter)="item_mouseenter(item._id)" (mouseleave)="item_mouseout(item._id)"  class="app-item"> 
                <div class="title"> 
                    <div class="img {{dock.icon}}"> 
                        &nbsp;&nbsp;&nbsp;&nbsp; 
                    </div> 
                    {{item.title}}
                </div> 
                <div class="body" style="text-align:center" (click)="clickItem(item._id, dock._id)">
                    <img *ngIf="item.url" src="{{item.url}}" style="height:100px">
                    <div *ngIf="!item.url" class="{{dock.icon}}" style="background-size: 100px 92px;background-repeat: no-repeat;margin-left: 25px;height:100px"></div>
                </div> 
            </div> 
        </div>
    `
})

class DockAppCmp {
    _id = 'f';
    @Input() dock;
    hideTimeout: any;
    showTimeout: any;
    beforeShowItems = []
    mouseenter(id){
        clearTimeout(this.hideTimeout)
        this.showTimeout = setTimeout(()=> {
            var left = $('#app-icon-'+id).position().left - ($('#app-icon-block-'+id).width() + 16) / 2 + $('#app-icon-'+id).width() / 2
            $('#app-icon-block-'+id).css('left', left + 'px')
            $('#app-icon-block-'+id).show()
        }, 500);
    }
    
    mouseout(id){
        clearTimeout(this.showTimeout)
        this.hideTimeout = setTimeout(()=>{
            $('#app-icon-block-'+id).hide()
            
        }, 500)
    }
    
    item_mouseenter(id){
        $('.desktop-window').each((index, item)=>{
            if( $(item).css('display') == 'block' ){
                this.beforeShowItems.push(item)
            }
        })
        $('.desktop-window').hide()
        
        $('#'+id).show()
    }
    
    item_mouseout(id){
        $('#'+id).hide()
        this.beforeShowItems.forEach((item)=>{
            $(item).show()
        })
        
        this.beforeShowItems = []
        
    }
    
    clickItem(id, did){
        $('#app-icon-block-'+did).hide()
        this.beforeShowItems.push($('#'+id)[0])
        $('#'+id).css('z-index', window['ZINDEX']++);
        $('.panel').removeClass('focus');
        $('#'+id).addClass('focus');
    }
}

@Component({
    selector: 'dock',
    template: `
        <div id="{{_id}}" class="dock">
            <dock-app *ngFor="#dock of dockAppList" [dock]="dock"></dock-app>
        </div>
    `,
    styleUrls: ['./desktop/taskbar/dock.css'],
    directives: [NgStyle, DockAppCmp]
})

export class DockCmp {
    _id = 'dock';
    @Input() docks;
    dockAppList = dockAppList
    constructor(@Inject(ElementRef) elementRef: ElementRef){
        setTimeout(()=> {
        }, 1000);
    }
}
