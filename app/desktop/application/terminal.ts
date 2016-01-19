import {Component, Inject, ElementRef, Input} from 'angular2/core';
import {NgStyle} from 'angular2/common';
import {dialog} from '../tools/util';
import { ShortcutCmp } from '../shortcut/shortcut';
import { WindowCmp, windowTemplate } from '../panel/window';

declare var $, Terminal, io

@Component({
    selector: 'terminal',
    template: windowTemplate.replace('{{__body__}}',`
        <div class="body" style="overflow-y: auto;height:100%;width:100%;padding-top: 30px;text-align:center">
            <div class="terminal-window" style="width:100%;height:100%;"></div>
        </div>
    `),
    styleUrls: ['./desktop/panel/window.css'],
    directives: [NgStyle, ShortcutCmp]
})

export class TerminalCmp extends WindowCmp {
    shortcuts = [] 
    element: any
    @Input() config
    width = 630
	height = 400
	constructor(@Inject(ElementRef) elementRef: ElementRef){
        
        super()
        this.element = elementRef.nativeElement
        
        this.setDialog()
		
		setTimeout(()=> {
			this.setTerminal()
		}, 100);
	}
	
	setTerminal(){
		var term = new Terminal() 
		var socket = io.connect("http://"+window.location.host)
		var term_id = this.config.container_id+'§'+ this.config._id
		socket.emit('createTerminal', term_id, (term_id)=>
		{
			term.on('data', function(data){
				socket.emit('data'+term_id, data)
			})
            
			term.open($(this.element).find('.terminal-window')[0])
			
			socket.on('data'+term_id, function(data){ 
				term.write(data)
			})
			
			$(window).resize(function(){
				term.sizeToFit()
				socket.emit('resize'+term_id, {
					cols: term.cols,
					rows: term.rows
				})
			})
			
			$(window).trigger('resize')
		});
	}
}

