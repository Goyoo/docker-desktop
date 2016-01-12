import {Component, Inject, ElementRef, Input} from 'angular2/core';
import {NgStyle} from 'angular2/common';
import {dialog} from '../tools/util';
import { ShortcutCmp } from '../shortcut/shortcut';
import { WindowCmp, windowTemplate } from '../panel/window';
import {getUid} from '../tools/util';

declare var $, ace


@Component({
    selector: 'editor',
    template: windowTemplate.replace('{{__body__}}',`
        <div class="body" style="overflow-y: auto;height:100%;width:100%;padding-top: 30px;">
            <div id="{{_id}}" style="height:100%;border-top:1px solid #ccc" ></div>
        </div>
    `),
    styleUrls: ['./desktop/panel/window.css', './desktop/application/editor.css'],
    directives: [NgStyle, ShortcutCmp]
})

export class EditorCmp extends WindowCmp {
    shortcuts = [] 
    element: any
    @Input() config
    width = 744
	height = 448
    editor: any
    context = ''
    _id = getUid(16)
	constructor(@Inject(ElementRef) elementRef: ElementRef){
        
        super()
        this.element = elementRef.nativeElement
        this.setDialog()
        
        setTimeout(()=> {
            this.setEditor()
        }, 100);
        
        
        document.onkeydown = (event)=>
        {
            if ((event.ctrlKey)&&(event.keyCode==115 || event.keyCode==83|| event.keyCode==87))
            {
                event['returnValue'] = false;

                if( !this.editor.isFocused() )
                    return

                this.config.onSave && this.config.onSave(this.editor.getValue())
            }
        }
        
	}
    setEditor(){
        console.log(this.config)
        this.editor = ace.edit(this._id);
        this.editor.setFontSize("14px")
        // this.editor.setTheme("ace/theme/eclipse");
        // this.editor.getSession().setMode("ace/mode/abc");
        this.editor.setValue(this.config.context)
        // this.editor.focus()
        setTimeout(()=> {
            this.editor.clearSelection()
        });
    }
}

