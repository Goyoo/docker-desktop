import {Component, Inject, ElementRef, Input} from 'angular2/core';
import {NgStyle} from 'angular2/common';
import {dialog} from '../tools/util';
import { ShortcutCmp } from '../shortcut/shortcut';
import { WindowCmp, windowTemplate } from '../panel/window';

declare var $


@Component({
    selector: 'video-player',
    template: windowTemplate.replace('{{__body__}}',`
        <div class="body" style="overflow-y: auto;height:100%;width:100%;padding-top: 30px;text-align:center">
            <video style="height:100%" controls="controls">  
                <source src="{{config.url}}" type="video/ogg" />
            </video>
        </div>
    `),
    styleUrls: ['./desktop/panel/window.css', './desktop/application/video-player.css'],
    directives: [NgStyle, ShortcutCmp]
})

export class VideoPlayerCmp extends WindowCmp {
    shortcuts = [] 
    element: any
    @Input() config
    width = 744 
	height = 448
	constructor(@Inject(ElementRef) elementRef: ElementRef){
       
        super()
        this.element = elementRef.nativeElement
        
        this.setDialog()
	}
}

