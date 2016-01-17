import {Component, Inject, ElementRef, Input} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {dialog} from '../tools/util';
import { ShortcutCmp } from '../shortcut/shortcut';
import { WindowCmp, windowTemplate } from '../panel/window';
import { dockAppList } from '../../desktop/taskbar/dock';
import { menuList} from '../../desktop/menu/menu';

declare var $


@Component({
    selector: 'pdf',
    template: windowTemplate.replace('{{__body__}}',`
       
        <div class="body" style="overflow-y: auto;height:100%;width:100%;padding-top: 30px;" >
            <iframe style="width:100%;height:100%;border:0px;" src="{{config.src}}"></iframe>
        </div>
    `),
    styleUrls: ['./desktop/panel/window.css', './desktop/application/pdf.css'],
    directives: [CORE_DIRECTIVES, ShortcutCmp]
})

export class PdfCmp extends WindowCmp {
    shortcuts = []
    element: any
    @Input() config
    width = 810
	height = 500
    path = '/'
    backs = []
    aheads = []
	constructor(@Inject(ElementRef) elementRef: ElementRef){
        super()
        
        this.element = elementRef.nativeElement
        
        this.setDialog()
        
        setTimeout(()=>{
            this.config.object = this
            this.setPath(this.config.path, false)
            this.setTitle(this.config.title)
        },100)
        
	}
    
    setPath(path, isPush = true){
        if( isPush ){
            this.backs.push(this.path)
            this.activeBackIcon(true)
        }
        this.path = path
        this.config.onSetPath&& this.config.onSetPath(this.path)
        
    }
    
    refresh(){
        this.config.onSetPath&& this.config.onSetPath(this.path)
    }
    
    activeAheadIcon(isActive)
    {
        if (isActive) {
            $(this.element).find('.fb-icon-ahead').addClass('fb-icon-ahead-active')
            $(this.element).find('.fb-icon-ahead').removeClass('fb-icon-ahead');
        }
        else {
            $(this.element).find('.fb-icon-ahead-active').addClass('fb-icon-ahead');
            $(this.element).find('.fb-icon-ahead-active').removeClass('fb-icon-ahead-active');
        }
    }
    
    activeBackIcon(isActive)
    {
        if (isActive) {
            $(this.element).find('.fb-icon-back').addClass('fb-icon-back-active');
            $(this.element).find('.fb-icon-back').removeClass('fb-icon-back');
        }
        else {
            $(this.element).find('.fb-icon-back-active').addClass('fb-icon-back');
            $(this.element).find('.fb-icon-back-active').removeClass('fb-icon-back-active');
        }
    }
    
    back ()
    {
        if (this.backs.length) 
        {
            var path = this.backs.pop()
            this.aheads.push(this.path)
            
            this.setPath(path, false)
            
            this.activeBackIcon(this.backs.length)
            this.activeAheadIcon(this.aheads.length)
        }
    } 
    ahead ()
    {
        if (this.aheads.length)
        {
            var path = this.aheads.pop()
            this.backs.push(this.path)
            
            this.setPath(path, false)
            
            this.activeBackIcon(this.backs.length)
            this.activeAheadIcon(this.aheads.length)
        };
    }
}
