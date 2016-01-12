import {Component} from 'angular2/core';
import {NgStyle} from 'angular2/common';

@Component({
    selector: 'start',
    template: `
        <div class="task-start"> 
            <div class="start-button"></div> 
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
}
