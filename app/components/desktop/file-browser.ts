import { Component } from 'angular2/core';
import { NgStyle, NgFor } from 'angular2/common';
import { DesktopCmp } from '../../desktop/desktop/desktop';
import { TaskbarCmp } from '../../desktop/taskbar/taskbar';
import { FileBrowserCmp } from '../../desktop/application/file-browser';
import { PhotoBrowserCmp } from '../../desktop/application/photo-browser';
import { TerminalCmp } from '../../desktop/application/terminal';
import { VideoPlayerCmp } from '../../desktop/application/video-player';
import { dockAppList } from '../../desktop/taskbar/dock';
import { MenuCmp , menuList} from '../../desktop/menu/menu';
import { bootstrap }    from 'angular2/platform/browser'
import { Injector, provide } from 'angular2/core';
import { Http, HTTP_PROVIDERS, Headers} from 'angular2/http';

declare var $, _

@Component({
    selector: 'file-browser-app',
    template: `
        <file-browser *ngFor="#item of fileBrowsers" [config]="item" ></file-browser>
    `,
    directives: [NgFor, DesktopCmp, TaskbarCmp, FileBrowserCmp, PhotoBrowserCmp, TerminalCmp,VideoPlayerCmp, MenuCmp],
    viewProviders: [HTTP_PROVIDERS],
})

export class FileBrowserAppCmp {
    _id = 'desktop'
    backgroundImage = '/resource/images/img1.jpg'
    fileBrowsers = []
    photoBrowsers = []
    videoPlayer = []
    menus = menuList
    terminals = []
    shortcuts = []
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
        var res = this.http.get('/ls/ubuntu?path='+path)
        
        res.subscribe(res => {
            console.log(111)
            if( res.status !== 200 )
                return alert('error')
                
            var list = res.json()
            
            done(null, list)
        })
    }
    
    iconMap = {
        'inode/directory': 'icon-folder',
        'text/plain': 'icon-textfile',
        'image/png': 'icon-image',
        'image/jpeg': 'icon-image',
        'application/ogg': 'icon-video'
    }
    
    getFileBrowserConfig(_config = {})
    {
        var config = _.extend(
        {
            onSetPath: (path)=>{
                this.lsByPath(path, (err, list)=>{
                    list.forEach( (item)=>
                    {
                        item.text = item.name
                        item.icon = this.iconMap[item.type]
                        
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
                        
                        // else if( item.type === 'file' )
                        //     item.icon = 'icon-text'
                        // else if( item.type === 'image' )
                        //     item.icon = 'icon-image'
                                
                    })
                    
                    config.fileList = list
                })
            },
            fileList: []
        }, _config)
        
        return config
    }
    
    constructor(public http?: Http){
        
        this.createApp('menu', this.menus, {
            top: 100,
            left: 100,
            items: [{
                
                text: "新建",
                items: [{
                    text: "文件夹",
                    handler: function(){
                        alert('wenjianjia')
                    }
                }, {
                    text: "文本",
                    handler: function(){
                        
                    }
                }],
                handler: function(event){
                    alert(1)    
                }
            }, {
                text: "New File2",
                handler: function(event) 
                {
                    alert(2)    
                }
            }, {
                text: "New File3",
                handler: function(event) 
                {
                    alert(3)    
                }
            }]
        })
        
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
                    path: '/root'
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
