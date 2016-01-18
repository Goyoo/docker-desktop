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
                <div class="task-work" (click)="work()"><div></div></div> 
                <dock [docks]="docks"></dock> 
                <div class="task-clock" (click)="clickTime()"> 
                    <div id="time">{{time | date:'HH'}}:{{time | date:'mm'}}</div> 
                    <div id="date">{{time | date:'yyyy'}}-{{time | date:'MM'}}-{{time | date:'dd'}}</div> 
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
    time = new Date
    work(){
        alert('敬请期待')
    }
    clickTime(){
        alert('敬请期待')
    }
    constructor(){
        setTimeout(()=> {
            this.time = new Date
        }, 1000);
    }
}
