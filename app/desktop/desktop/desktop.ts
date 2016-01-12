import { Component, Input } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { ShortcutCmp } from '../shortcut/shortcut';
import { menuList} from '../../desktop/menu/menu';
declare var $

@Component({
    selector: 'desktop',
    template: `
        <div id="{{_id}}" style="width:100%;height:100%" (mousedown)="click()">
            <div class="fullscreen_post_bg" [ngStyle]="{'background-image': 'url(' + background_image + ') '}">
            </div> 
            <div class="body">
                <div class="layout-table">
                    <div class="horizontal">
                        <shortcut *ngFor="#shortcut of shortcuts" [shortcut]="shortcut"></shortcut>
                    </div>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['./desktop/desktop/desktop.css'],
    directives: [CORE_DIRECTIVES, ShortcutCmp]
})

export class DesktopCmp {
    _id = 'desktop'; 
    @Input() shortcuts;
    @Input() background_image;
    constructor(){
        this.shortcuts = []
    }
    
    click(){
        menuList.splice(0,100)
    }
}
