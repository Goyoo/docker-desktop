import {Component, Inject, ElementRef, Input} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {dialog} from '../tools/util';
import { ShortcutCmp } from '../shortcut/shortcut';
import { WindowCmp, windowTemplate } from '../panel/window';
import { dockAppList } from '../../desktop/taskbar/dock';
import { menuList} from '../../desktop/menu/menu';

declare var $


@Component({
    selector: 'web-browser',
    template: windowTemplate.replace('{{__body__}}',`
        <div class="fb-tool" style="">
            <div class="icon fb-icon-go fb-icon-back" (click)="back()"></div>
            <div class="icon fb-icon-go fb-icon-ahead" (click)="ahead()"></div>
            <div class="fb-src-input">
                <div class="fb-icon-computer"></div>
                <input type="text" class="fb-path-input" readonly="readonly" value="{{config.src}}" />
            </div>
            <div class="fb-icon-refresh" style="" (click)="refresh()"> 
                <div class="refresh" ></div>
            </div>
        </div>
        <div class="body" style="overflow-y: auto;height:100%;width:100%;padding-top: 70px;" (contextmenu)="rightClick($event)" (click)="hideMenu()">
            <iframe src="{{config.src}}" style="width:100%;height:100%;border:0px"></iframe>
        </div>
    `),
    styleUrls: ['./desktop/panel/window.css', './desktop/application/web-browser.css'],
    directives: [CORE_DIRECTIVES, ShortcutCmp]
})

export class WebBrowserCmp extends WindowCmp {
    shortcuts = []
    element: any
    @Input() config
    width = 910
	height = 500
    path = '/'
    backs = []
    aheads = []
    
    refresh(){
        // alert(1)
        $(this.element).find('iframe')[0].src=$(this.element).find('iframe')[0].src
        console.log($(this.element).find('iframe')[0].src)
        // $(this.element).find('iframe')[0].location.reload(true)
    }
	constructor(@Inject(ElementRef) elementRef: ElementRef){
        super()
        
        this.element = elementRef.nativeElement
        
        this.setDialog()
        
        setTimeout(()=>{
            this.config.object = this
            // this.setPath(this.config.path, false)
            this.setTitle(this.config.title)
        },100)
        
	}
    
}
