import {Component, Inject, ElementRef, Input} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {dialog} from '../tools/util';
import { ShortcutCmp } from '../shortcut/shortcut';
import { WindowCmp, windowTemplate } from '../panel/window';
import { dockAppList } from '../../desktop/taskbar/dock';
import { menuList} from '../../desktop/menu/menu';

declare var $


@Component({
    selector: 'file-browser',
    template: windowTemplate.replace('{{__body__}}',`
        <div class="fb-tool" style="">
            <div class="icon fb-icon-go fb-icon-back" (click)="back()"></div>
            <div class="icon fb-icon-go fb-icon-ahead" (click)="ahead()"></div>
            <div class="icon fb-icon-triangle"></div>
            <div class="icon fb-icon-arrow"></div>
            <div class="fb-src-input">
                <div class="fb-icon-computer"></div>
                <input type="text" class="fb-path-input" readonly="readonly" value="{{path}}" />
            </div>
            <div class="fb-icon-refresh" style=""> 
                <div class="refresh"></div>
            </div>
        </div>
        <div class="body" style="overflow-y: auto;height:100%;width:100%;padding-top: 70px;" (contextmenu)="rightClick($event)" (click)="hideMenu()">
            <div class="layout-table" *ngIf="config && config.fileList">
                <shortcut style="float:left" *ngFor="#shortcut of config.fileList" [shortcut]="shortcut"></shortcut>
            </div>
        </div>
    `),
    styleUrls: ['./desktop/panel/window.css', './desktop/application/file-browser.css'],
    directives: [CORE_DIRECTIVES, ShortcutCmp]
})

export class FileBrowserCmp extends WindowCmp {
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
            this.dropbox()
        },100)
        
	}
    rightClick(event){
        if( !this.config.menu )
            return 
            
        menuList.splice(0, 100)
        menuList.push({
            top:event.pageY-10,
            left: event.pageX,
            items: this.config.menu 
        })
        event.returnvalue=false;
        return false
    }
    
    hideMenu(){
        menuList.splice(0,100)
    }
    
    dropbox(){
        
        var dropbox = $(this.element).find('.body')[0]
        
        dropbox.addEventListener("dragenter", function(e){  
            dropbox.style.background = '#f2f2f2';  
        }, false);  
        dropbox.addEventListener("dragleave", function(e){  
            dropbox.style.background = '#fff';  
        }, false);  
        dropbox.addEventListener("dragenter", function(e){  
            e.stopPropagation();  
            e.preventDefault();  
        }, false);  
        dropbox.addEventListener("dragover", function(e){  
            e.stopPropagation();  
            e.preventDefault();  
        }, false);  
        dropbox.addEventListener("drop", (e)=>{  
            e.stopPropagation();  
            e.preventDefault();  
            dropbox.style.background = '#fff';  
            console.log(e.dataTransfer.files[0])
            // handleFiles(e.dataTransfer.files);  
            this.uploadFile(e.dataTransfer.files[0],1)
            // submit.disabled = false;  
        }, false);  
    }
    
    uploadFile(file, status) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', this.config.uploadUrl);
        xhr.onload = ()=> {
            this.refresh()
        };
        xhr.onerror = function() {
            console.log(this.responseText)
            console.log(file.size);
        };
        xhr.upload.onprogress = function(event) {
            // handleProgress(event);
            console.log(event)
        }
        xhr.upload.onloadstart = function(event) {
            
        }
        
        // prepare FormData
        var formData = new FormData();
        formData.append('myfile', file);
        xhr.send(formData);
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
