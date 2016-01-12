import {Component, Input} from 'angular2/core';
import {NgStyle} from 'angular2/common';

import { StartCmp } from './start';
import { DockCmp } from './dock';
@Component({
    selector: 'taskbar',
    template: `
        <div id="{{_id}}" class="bottomBar"> 
            <div class="backgroundDiv"> 
                <start></start> 
                <div class="task-work"><div></div></div> 
                <dock [docks]="docks"></dock> 
                <div class="task-clock"> 
                    <div>4:49</div> 
                    <div>2015/5/9</div> 
                </div> 
            </div> 
        </div> 
    `,
    styleUrls: ['./desktop/taskbar/taskbar.css'],
    directives: [NgStyle, StartCmp, DockCmp]
})

export class TaskbarCmp {
    _id = 'taskbar';
    @Input() docks;
    constructor(){
        
    }
}
