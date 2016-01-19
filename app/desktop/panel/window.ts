import {Component, Inject, ElementRef} from 'angular2/core';
import {NgStyle} from 'angular2/common';
import {dialog} from '../tools/util';
import { dockAppList } from '../../desktop/taskbar/dock';

declare var $

window['ZINDEX'] = window['ZINDEX'] || 100

export var windowTemplate = `
    <div id="{{config && config._id}}" (mousedown)="focus(config && config._id)" [ngStyle]="{'width': width+'px', 'height': height+'px', 'z-index': zindex}"  class="panel desktop-window"  > 
        <div class="header" style="position: absolute;"> 
            <div class="icon {{config.icon}}"></div> 
            <div class="title">{{config.title}}</div> 
            <div class="panel-title-buttons"> 
                <div class="icon-min" (click)="min()"> </div> 
                <div class="icon-max" (click)="max()"> </div> 
                <div class="icon-close" (click)="destroy()"> </div> 
            </div> 
        </div>
        
        {{__body__}}
        
        <div class="design-resize-left design-resize"></div>
        <div class="design-resize-right design-resize"></div>
        <div class="design-resize-bottom design-resize"></div>
        <div class="design-resize-right-bottom design-resize"></div>
        <div class="design-resize-left-bottom design-resize"></div>
    </div> 
`

export class WindowCmp{
    config:any;
    element: any;
	width = 900
	height = 300
    dialog
    constructor(){
        setTimeout(()=>{
            this.focus(1)
        })
    }
    setDialog()
    {
        this.dialog = dialog({
            top: 50+ (Math.random()*100),
            left: 100 + (Math.random()*100),
            taskBarHeight: 42,
            element: $(this.element).find('.panel')[0],
            eventEl: $(this.element).find('.header')[0],
            onMove: () => {
				
			},
			onMouseUp: () => {
				
			},
            onResize: () => {
				
            }
        })
    }
    
    setTitle(title){
        $(this.element).find('.title').html(title)
        // this.config.title = title
    }
    
    focus(id){
        $(this.element).find('.panel').css('z-index', window['ZINDEX']++);
        $('.panel').removeClass('focus');
        $(this.element).find('.panel').addClass('focus');
    }
    
    destroy(){
        this.config.componentList.forEach((item, index)=>{
            if( item._id === this.config._id )
                this.config.componentList.splice(index, 1)
        })
        
        if( this.config.componentList.length )
            return 
        
        dockAppList.forEach((item, index)=>{
            if( item._id === this.config.type )
                dockAppList.splice(index, 1)
        })
    }
    min(){
        $(this.element).find('.panel').hide()
    }
    max(){
        this.dialog.max()   
    }
}
