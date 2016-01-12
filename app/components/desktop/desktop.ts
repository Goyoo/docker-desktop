import { Component } from 'angular2/core';
import { NgStyle, NgFor } from 'angular2/common';
import { DesktopCmp } from '../../desktop/desktop/desktop';
import { TaskbarCmp } from '../../desktop/taskbar/taskbar';
import { FileBrowserCmp } from '../../desktop/application/file-browser';
import { PhotoBrowserCmp } from '../../desktop/application/photo-browser';
import { TerminalCmp } from '../../desktop/application/terminal';
import { EditorCmp } from '../../desktop/application/editor';
import { VideoPlayerCmp } from '../../desktop/application/video-player';
import { dockAppList } from '../../desktop/taskbar/dock';
import { MenuCmp , menuList} from '../../desktop/menu/menu';
import { bootstrap }    from 'angular2/platform/browser'
import { Injector, provide } from 'angular2/core';
import { Http, HTTP_PROVIDERS, Headers} from 'angular2/http';

declare var $, _
var copy_path = ''
 declare var Terminal , io
var postOptions = { headers:  new Headers({
	'Content-Type': 'application/json'
})}


@Component({
    selector: 'desktop-app',
    template: `
        <desktop [(shortcuts)]="shortcuts" [(background_image)]="backgroundImage"></desktop>
        <taskbar [docks]="docks"></taskbar>
        <file-browser *ngFor="#item of fileBrowsers" [config]="item" ></file-browser>
        <photo-browser *ngFor="#item of photoBrowsers" [config]="item" ></photo-browser>
        <terminal *ngFor="#item of terminals" [config]="item" ></terminal>
        <editor *ngFor="#item of editorList" [config]="item" ></editor>
        <video-player *ngFor="#item of videoPlayer" [config]="item" ></video-player>
        <menu style="position:absolute" *ngFor="#item of menus" [config]="item" ></menu>
    `,
    styleUrls: ['./components/desktop/desktop.css'],
    directives: [NgFor, DesktopCmp, TaskbarCmp, FileBrowserCmp, PhotoBrowserCmp, TerminalCmp,VideoPlayerCmp, MenuCmp, EditorCmp],
    viewProviders: [HTTP_PROVIDERS],
})

export class DesktopAppCmp {
    _id = 'desktop'
    backgroundImage = '/resource/images/img1.jpg'
    fileBrowsers = []
    photoBrowsers = []
    videoPlayer = []
    menus = menuList
    terminals = []
    shortcuts = []
    editorList = []
    docks = []
    idIndex = 0
    createApp(type, list, config={})
    {
        var id = type + '-' + this.idIndex ++ 
        list.push(_.extend(config,{
            _id: id,
            type: type,
            componentList: list
        }))
        
        var isFind = false 
        dockAppList.forEach((item, index)=>{
            if( item._id === type )
                isFind = true
        })
        
        if( !isFind )
            dockAppList.push({_id: type, items: list, icon: 'task-icon-'+type })
    }
    
    lsByPath(path, done){
        
        console.log(path)
        this.ls(path, function(data){
            console.log(data)
            done(null, data)
        })
        
    }
    
    iconMap = {
        'inode/directory': 'icon-folder',
        'text/plain': 'icon-textfile',
        'image/png': 'icon-image',
        'image/jpeg': 'icon-image',
        'application/ogg': 'icon-video',
        'application/zip': 'icon-zip',
        'inode/x-empty': 'icon-textfile'
    }
    
    getFileBrowserConfig(_config = {})
    {
        var config = _.extend(_config,
        {
            onSetPath: (path)=>{
                this.lsByPath(path, (err, list)=>{
                    list.forEach( (item)=>
                    {
                        // console.log(item.type)
                        item.text = item.name
                        item.icon = this.iconMap[item.type]
                        
                        item.rename = ((name)=>{
                            
                            this.mv(item.path, item.path.split('/').splice(0, item.path.split('/').length-1).join('/')+ '/'+name, function(){
                                config['object'].refresh()
                            })
                            
//                            this.http.post('/rename/ubuntu?path='+item.path+'&name='+name, JSON.stringify({}), postOptions).subscribe(res => {
//                            })
                        })
                        
                        item.menu = [{
                            text: "打开",
                            handler: function(event){
                                item.dblclick()       
                            }
                        }, {
                            text: "复制",
                            handler: function(event){
                                copy_path = item.path
                                // item.dbclick()       
                            }
                        }, {
                            text: "重命名",
                            handler: function(event){
                                item.obj.rename()
                            }
                        }, {
                            text: "删除",
                            handler: (event)=>{
                                
                                if( !confirm("确认删除？") )
                                    return 
                                
                                this.http.post('/delete/ubuntu?path='+item.path, JSON.stringify({}), postOptions).subscribe(res => {
                                    config['object'].refresh()
                                })       
                            }
                        }]
                        
                        if( !item.icon )
                            item.icon = 'icon-file'
                        
                        if( item.type === 'inode/directory' ){
                            item.dblclick = ()=>{
                                config['object']['setPath']((path === '/'?'':path) + '/' + item.name)
                            }
                        }
                        
                        if( /image\/*/.test(item.type) ){
                            item.dblclick = ()=>{
                                this.createApp('photo-browser', this.photoBrowsers, { title: item.name, url: '/getFile?url='+item.path+'&type='+item.type })
                            }
                        }
                        
                        if( item.type === 'application/ogg' ){
                            item.dblclick = ()=>{
                                this.createApp('video-player', this.videoPlayer, { url: 'http://127.0.0.1:8088/getFile?url='+item.path+'&type=video/ogg' })
                            }
                        }
                        
                        if( item.type === 'application/zip' ){
                            item.menu[0].text='解压'
                            item.dblclick = ()=>{
                                this.http.get('/unzip/ubuntu?path='+item.path).subscribe(res => {
                                    config['object'].refresh()
                                })
                            }
                        }
                        
                        if( item.type === 'text/plain' || item.type === 'inode/x-empty' ){
                            item.dblclick = ()=>{
                                this.cat(item.path, (data)=>{
                                                
                                // this.http.get('/cat/ubuntu?path='+item.path).subscribe(res => {
                                    this.createApp('editor', this.editorList, { 
                                        context: data,//res.json().body, 
                                        title: item.name,
                                        onSave: (str)=>{
                                            if( !/\\n$/.test(str))
                                                str+='\n'
                                            this.http.post('/write/ubuntu?path='+item.path, JSON.stringify({body: str}), postOptions).subscribe(res => {
                                                if( res.status !== 200 )
                                                    alert(res.json().error)
                                            })
                                        }
                                    })
                                // })
                                })
                            }
                        }
                    })
                    
                    config.fileList = list
                })
            },
            fileList: []
        })
        
        return config
    }
    
    parse(str){
        console.log('start!!!')
        var list = str.split('\n')
        var list2 , list3 = []
        list.forEach(function(item){
            if( item.indexOf('/') === 0 )
                list2 = list2 || []
                
            if(list2)
                list2.push(item)
        })
        list2.pop()
        
        list2.forEach(function(item, index)
        {
            item = item.replace(/ /g, '')
            if( !item )
                return
            
            var str = item.split(':')
            
            if( str[0].split('/').pop() === '*' )
                return 
            
            list3.push({
                type: str[1].split(';')[0],
                name: str[0].split('/').pop(),
                path: str[0]
            })
        })
        
        return list3
    }
    
    socket = null
    callback:any = null
    term_id:any 
    
    ls(name, done){
        this.callback = (data)=>{
            this.callback = null
            done(this.parse(data))
        }

        this.socket.emit('data'+this.term_id, 'file '+name+'/* --mime \n')
    }
    
    cat(path, done){
        this.callback = (data)=>{
            this.callback = null
            data = data.split('\n')
            console.log(data)
            done(data.splice(1, data.length-2).join('\n'))
        }
        console.log( 'cat '+path)
        this.socket.emit('data'+this.term_id, 'cat '+path+' \n')
    }
    
    mv(path, newPath, done){
        this.callback = (data)=>{
            this.callback = null
            data = data.split('\n')
            console.log()
            done()
        }
        
         this.socket.emit('data'+this.term_id, 'mv '+path+' '+ newPath +' \n')
    }
    
    touch(path, done){
        this.callback = (data)=>{
            this.callback = null
            data = data.split('\n')
            console.log()
            done(data.splice(1, data.length-2).join('\n'))
        }
        
        this.socket.emit('data'+this.term_id, 'touch '+path+' \n')
    }
    
    mkdir(path, done){
        this.callback = (data)=>{
            this.callback = null
            data = data.split('\n')
            console.log()
            done(data.splice(1, data.length-2).join('\n'))
        }
        
        this.socket.emit('data'+this.term_id, 'mkdir '+path+' \n')
    }
    
    constructor(public http?: Http){
       
        setTimeout(()=>
        {
            var term_id = 'ubuntu-cuqsx'+'§'+ 11
            this.socket = io.connect("http://"+window.location.host)
            
            this.socket.emit('createTerminal', term_id, (term_id)=>
            {
                var str = ''
                
                this.term_id = term_id
                this.socket.on('data'+term_id, (data)=>{
                    str += data.toString().replace(/\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[m|K]/g, '')
                    if( /[\d\w]+:\/#$/.test(str.trim())){
                        this.callback && this.callback(str)
                        str = ''
                    }
                })
            });
        },100)
        
        
        // setTimeout(()=> {
        //     this.cat('/etc/hosts', function(){})
        // }, 1000);
        
        
        var index = 1
        this.shortcuts = [{
            icon: 'icon-computer',
            text: '这台电脑',
            shadow: 'shadow',
            dblclick: ()=>{
                var config = {
                    title: '这台电脑',
                    path: '/'
                }
                
                this.createApp('file-browser', this.fileBrowsers, this.getFileBrowserConfig(config))
                
            }
        }, {
            icon: 'icon-user', 
            text: '我的文档',
            shadow: 'shadow',
            dblclick:()=>{
                var config = {
                    title: '我的文档',
                    path: '/root',
                    menu: [{
                        text: "新建",
                        items: [{
                            text: '文件夹',
                            handler: ()=>{
                                this.mkdir(config['object'].path+'/NewFolder', function(){
                                    config['object'].refresh()
                                })
                                // this.http.post('/mkdir/ubuntu?path='+, JSON.stringify({}), postOptions).subscribe(res => {
                                // })
                            }
                        }, {
                            text: '文档',
                            handler: ()=>{
                                this.touch(config['object'].path+'/NewFile', function(){
                                    config['object'].refresh()
                                })
                                // this.http.post('/touch/ubuntu?path='+config['object'].path+'/NewFile', JSON.stringify({}), postOptions).subscribe(res => {
                                //     config['object'].refresh()
                                // })
                            }
                        }],
                        handler: function(event){
                            
                        }
                    }, {
                        text: "刷新",
                        handler: function(event) 
                        {
                            config['object'].refresh()   
                        }
                    }, {
                        text: "粘贴",
                        handler: (event)=>
                        {
                            var filename = copy_path.split('/').pop() + '_copy'
                            
                            this.http.post('/cp/ubuntu?source='+copy_path + '&to=' + config['object'].path + '/' + filename, JSON.stringify({}), postOptions).subscribe(res => {
                                config['object'].refresh()
                            })
                        }
                    }]
                }
                this.createApp('file-browser', this.fileBrowsers, this.getFileBrowserConfig(config))
            }
        }, {
            icon: 'icon-terminal',
            text: 'Terminal',
            shadow: 'shadow',
            dblclick: ()=>{
                this.createApp('terminal', this.terminals, { icon_class: 'icon-terminal'})
            }
        }]
    }
}
