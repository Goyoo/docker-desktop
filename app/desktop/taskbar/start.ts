import {Component} from 'angular2/core';
import {NgStyle} from 'angular2/common';

@Component({
    selector: 'start',
    template: `
        <div class="task-start"> 
            <div class="start-button" (click)="clickStart()"></div> 
            <div class="task-search"> 
                <input type="text" placeholder="Search the web and Windows">  
            </div>
            
        </div>
    `,
    styleUrls: ['./desktop/taskbar/start.css'],
    directives: [NgStyle]
})

export class StartCmp {
    _id = 'start';
    clickStart(){
        alert('敬请期待!')
    }
}

            // <div style="border: 1px solid #000;width:45%;height:400px;position:absolute;bottom:40px;opacity: 0.9;background:rgba(31,49,75,1)">
            
            // </div>