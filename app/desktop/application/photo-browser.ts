import {Component, Inject, ElementRef, Input} from 'angular2/core';
import {NgStyle} from 'angular2/common';
import {dialog} from '../tools/util';
import { ShortcutCmp } from '../shortcut/shortcut';
import { WindowCmp, windowTemplate } from '../panel/window';

declare var $


@Component({
    selector: 'photo-browser',
    template: windowTemplate.replace('{{__body__}}',`
        <div class="body" style="overflow-y: auto;height:100%;width:100%;padding-top: 30px;text-align:center">
            <img src="{{config.url}}" style="height:100%">
        </div>
    `),
    styleUrls: ['./desktop/panel/window.css', './desktop/application/photo-browser.css'],
    directives: [NgStyle, ShortcutCmp]
})

export class PhotoBrowserCmp extends WindowCmp {
    shortcuts = [] 
    element: any
    @Input() config
    width = 400
	height = 500
	constructor(@Inject(ElementRef) elementRef: ElementRef){
        
        super()
        this.element = elementRef.nativeElement
        
        this.setDialog()
	}
}

