var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var common_1 = require('angular2/common');
var desktop_1 = require('../../desktop/desktop/desktop');
var taskbar_1 = require('../../desktop/taskbar/taskbar');
var file_browser_1 = require('../../desktop/application/file-browser');
var photo_browser_1 = require('../../desktop/application/photo-browser');
var web_browser_1 = require('../../desktop/application/web-browser');
var pdf_1 = require('../../desktop/application/pdf');
var terminal_1 = require('../../desktop/application/terminal');
var editor_1 = require('../../desktop/application/editor');
var video_player_1 = require('../../desktop/application/video-player');
var dock_1 = require('../../desktop/taskbar/dock');
var menu_1 = require('../../desktop/menu/menu');
var http_1 = require('angular2/http');
var router_1 = require('angular2/router');
var copy_path = '';
var postOptions = { headers: new http_1.Headers({
        'Content-Type': 'application/json'
    }) };
var DesktopAppCmp = (function () {
    function DesktopAppCmp(http, routerParams) {
        var _this = this;
        this.http = http;
        this._id = 'desktop';
        this.backgroundImage = '/resource/images/img1.jpg';
        this.fileBrowsers = [];
        this.photoBrowsers = [];
        this.webBrowsers = [];
        this.pdfs = [];
        this.videoPlayer = [];
        this.menus = menu_1.menuList;
        this.terminals = [];
        this.shortcuts = [];
        this.editorList = [];
        this.docks = [];
        this.idIndex = 0;
        this.iconMap = {
            'inode/directory': 'icon-folder',
            'text/plain': 'icon-textfile',
            'image/png': 'icon-image',
            'image/jpeg': 'icon-image',
            'application/ogg': 'icon-video',
            'application/zip': 'icon-zip',
            'inode/x-empty': 'icon-textfile',
            'application/pdf': 'icon-pdf'
        };
        this.socket = null;
        this.callback = null;
        this.params = {};
        this.params = routerParams.params;
        setTimeout(function () {
            var term_id = _this.params.id + '§' + 11;
            _this.socket = io.connect("http://" + window.location.host);
            _this.socket.emit('createTerminal', term_id, function (term_id) {
                var str = '';
                _this.term_id = term_id;
                _this.socket.on('data' + term_id, function (data) {
                    str += data.toString().replace(/\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[m|K]/g, '');
                    if (/[\d\w]+:\/#$/.test(str.trim())) {
                        _this.callback && _this.callback(str);
                        str = '';
                    }
                });
            });
        }, 100);
        var index = 1;
        this.shortcuts = [{
                icon: 'icon-computer',
                text: '这台电脑',
                shadow: 'shadow',
                dblclick: function () {
                    var config = {
                        title: '这台电脑',
                        path: '/',
                        icon: 'icon-computer',
                        uploadUrl: '/upload/' + _this.params.id
                    };
                    _this.createApp('file-browser', _this.fileBrowsers, _this.getFileBrowserConfig(config));
                }
            }, {
                icon: 'icon-user',
                text: '我的文档',
                shadow: 'shadow',
                dblclick: function () {
                    var config = {
                        title: '我的文档',
                        path: '/root',
                        icon: 'icon-user',
                        uploadUrl: '/upload/' + _this.params.id,
                        menu: [{
                                text: "新建",
                                items: [{
                                        text: '文件夹',
                                        handler: function () {
                                            _this.mkdir(config['object'].path + '/NewFolder', function () {
                                                config['object'].refresh();
                                            });
                                        }
                                    }, {
                                        text: '文档',
                                        handler: function () {
                                            _this.touch(config['object'].path + '/NewFile', function () {
                                                config['object'].refresh();
                                            });
                                        }
                                    }],
                                handler: function (event) {
                                }
                            }, {
                                text: "刷新",
                                handler: function (event) {
                                    config['object'].refresh();
                                }
                            }, {
                                text: "粘贴",
                                handler: function (event) {
                                    var filename = copy_path.split('/').pop() + '_copy';
                                    _this.cp(copy_path, config['object'].path + '/' + filename, function () {
                                        config['object'].refresh();
                                    });
                                }
                            }]
                    };
                    _this.createApp('file-browser', _this.fileBrowsers, _this.getFileBrowserConfig(config));
                }
            }, {
                icon: 'icon-terminal',
                text: 'Terminal',
                shadow: 'shadow',
                dblclick: function () {
                    _this.createApp('terminal', _this.terminals, { icon: 'icon-terminal', title: 'Terminal', container_id: _this.params.id, icon_class: 'icon-terminal' });
                }
            }, {
                icon: 'icon-ie-edge',
                text: 'Internet',
                shadow: 'shadow',
                dblclick: function () {
                    _this.createApp('web-browser', _this.webBrowsers, { icon: 'icon-ie-edge', src: 'http://' + _this.params.ip + ':' + _this.params.port, title: 'Internet', icon_class: 'icon-ie-edge' });
                }
            }];
    }
    DesktopAppCmp.prototype.createApp = function (type, list, config) {
        if (config === void 0) { config = {}; }
        var id = type + '-' + this.idIndex++;
        list.push(_.extend(config, {
            _id: id,
            type: type,
            componentList: list
        }));
        var isFind = false;
        dock_1.dockAppList.forEach(function (item, index) {
            if (item._id === type)
                isFind = true;
        });
        if (!isFind)
            dock_1.dockAppList.push({ _id: type, items: list, icon: 'task-icon-' + type });
    };
    DesktopAppCmp.prototype.lsByPath = function (path, config) {
        var _this = this;
        this.ls(path, function (list) {
            list.forEach(function (item) {
                item.text = item.name;
                item.icon = _this.iconMap[item.type];
                item.rename = (function (name) {
                    _this.mv(item.path, item.path.split('/').splice(0, item.path.split('/').length - 1).join('/') + '/' + name, function () {
                        config['object'].refresh();
                    });
                });
                item.menu = [{
                        text: "打开",
                        handler: function (event) {
                            item.dblclick();
                        }
                    }, {
                        text: "复制",
                        handler: function (event) {
                            copy_path = item.path;
                        }
                    }, {
                        text: "重命名",
                        handler: function (event) {
                            item.obj.rename();
                        }
                    }, {
                        text: "删除",
                        handler: function (event) {
                            if (!confirm("确认删除？"))
                                return;
                            _this.rm(item.path, function () {
                                config['object'].refresh();
                            });
                        }
                    }];
                if (!item.icon)
                    item.icon = 'icon-file';
                if (item.type === 'inode/directory') {
                    item.dblclick = function () {
                        config['object']['setPath']((path === '/' ? '' : path) + '/' + item.name);
                    };
                }
                console.log(item.type);
                if (/image\/*/.test(item.type)) {
                    item.dblclick = function () {
                        _this.createApp('photo-browser', _this.photoBrowsers, { icon: 'icon-image', title: item.name, url: '/getFile/' + _this.params.id + '?url=' + item.path + '&type=' + item.type });
                    };
                }
                if (item.type === 'application/pdf') {
                    item.dblclick = function () {
                        _this.createApp('pdf', _this.pdfs, { title: item.name, icon: 'icon-pdf', src: 'http://' + window.location.host + '/pdf.html?url=http://' + window.location.host + '/getFile/' + _this.params.id + '?url=' + item.path + '§type=text/html' });
                    };
                }
                if (item.type === 'application/ogg') {
                    item.dblclick = function () {
                        _this.createApp('video-player', _this.videoPlayer, { url: 'http://127.0.0.1:8088/getFile/' + _this.params.id + '?url=' + item.path + '&type=video/ogg' });
                    };
                }
                if (item.type === 'application/zip') {
                    item.menu[0].text = '解压';
                    item.dblclick = function () {
                        _this.http.get('/unzip/' + _this.params.id + '?path=' + item.path).subscribe(function (res) {
                            config['object'].refresh();
                        });
                    };
                }
                if (item.type === 'text/plain' || item.type === 'inode/x-empty') {
                    item.dblclick = function () {
                        _this.cat(item.path, function (data) {
                            _this.createApp('editor', _this.editorList, {
                                context: data,
                                title: item.name,
                                icon: 'icon-textfile',
                                onSave: function (str) {
                                    if (!/\\n$/.test(str))
                                        str += '\n';
                                    _this.http.post('/write/' + _this.params.id + '?path=' + item.path, JSON.stringify({ body: str }), postOptions).subscribe(function (res) {
                                        if (res.status !== 200)
                                            alert(res.json().error);
                                    });
                                }
                            });
                        });
                    };
                }
            });
            config.fileList = list;
        });
    };
    DesktopAppCmp.prototype.getFileBrowserConfig = function (_config) {
        var _this = this;
        if (_config === void 0) { _config = {}; }
        var config = _.extend(_config, {
            onSetPath: function (path) {
                _this.lsByPath(path, config);
            },
            fileList: []
        });
        return config;
    };
    DesktopAppCmp.prototype.parse = function (str) {
        console.log('start!!!');
        var list = str.split('\n');
        var list2, list3 = [];
        list.forEach(function (item) {
            if (item.indexOf('/') === 0)
                list2 = list2 || [];
            if (list2)
                list2.push(item);
        });
        list2.pop();
        list2.forEach(function (item, index) {
            item = item.replace(/ /g, '');
            if (!item)
                return;
            var str = item.split(':');
            if (str[0].split('/').pop() === '*')
                return;
            list3.push({
                type: str[1].split(';')[0],
                name: str[0].split('/').pop(),
                path: str[0]
            });
        });
        return list3;
    };
    DesktopAppCmp.prototype.ls = function (name, done) {
        var _this = this;
        this.callback = function (data) {
            _this.callback = null;
            done(_this.parse(data));
        };
        this.socket.emit('data' + this.term_id, 'file ' + name + '/* --mime \n');
    };
    DesktopAppCmp.prototype.cat = function (path, done) {
        var _this = this;
        this.callback = function (data) {
            _this.callback = null;
            data = data.split('\n');
            console.log(data);
            done(data.splice(1, data.length - 2).join('\n'));
        };
        console.log('cat ' + path);
        this.socket.emit('data' + this.term_id, 'cat ' + path + ' \n');
    };
    DesktopAppCmp.prototype.rm = function (path, done) {
        var _this = this;
        this.callback = function (data) {
            _this.callback = null;
            done();
        };
        this.socket.emit('data' + this.term_id, 'rm -r ' + path + ' \n');
    };
    DesktopAppCmp.prototype.cp = function (source, to, done) {
        var _this = this;
        this.callback = function (data) {
            _this.callback = null;
            done();
        };
        this.socket.emit('data' + this.term_id, 'cp -r ' + source + ' ' + to + ' \n');
    };
    DesktopAppCmp.prototype.mv = function (path, newPath, done) {
        var _this = this;
        this.callback = function (data) {
            _this.callback = null;
            data = data.split('\n');
            console.log();
            done();
        };
        this.socket.emit('data' + this.term_id, 'mv ' + path + ' ' + newPath + ' \n');
    };
    DesktopAppCmp.prototype.touch = function (path, done) {
        var _this = this;
        this.callback = function (data) {
            _this.callback = null;
            data = data.split('\n');
            console.log();
            done(data.splice(1, data.length - 2).join('\n'));
        };
        this.socket.emit('data' + this.term_id, 'touch ' + path + ' \n');
    };
    DesktopAppCmp.prototype.mkdir = function (path, done) {
        var _this = this;
        this.callback = function (data) {
            _this.callback = null;
            data = data.split('\n');
            console.log();
            done(data.splice(1, data.length - 2).join('\n'));
        };
        this.socket.emit('data' + this.term_id, 'mkdir ' + path + ' \n');
    };
    DesktopAppCmp = __decorate([
        core_1.Component({
            selector: 'desktop-app',
            template: "\n        <desktop [(shortcuts)]=\"shortcuts\" [(background_image)]=\"backgroundImage\"></desktop>\n        <taskbar [docks]=\"docks\"></taskbar>\n        <file-browser *ngFor=\"#item of fileBrowsers\" [config]=\"item\" ></file-browser>\n        <web-browser *ngFor=\"#item of webBrowsers\" [config]=\"item\" ></web-browser>\n        <photo-browser *ngFor=\"#item of photoBrowsers\" [config]=\"item\" ></photo-browser>\n        <terminal *ngFor=\"#item of terminals\" [config]=\"item\" ></terminal>\n        <editor *ngFor=\"#item of editorList\" [config]=\"item\" ></editor>\n        <video-player *ngFor=\"#item of videoPlayer\" [config]=\"item\" ></video-player>\n        <menu style=\"position:absolute\" *ngFor=\"#item of menus\" [config]=\"item\" ></menu>\n        <pdf *ngFor=\"#item of pdfs\" [config]=\"item\" ></pdf>\n    ",
            styles: ["\n\n      .fullscreen_post_bg img {\n          display: none;\n      }\n\n      .fullscreen_post_bg {\n          background-position: 50% 50%;\n          background-size: cover;\n          bottom: 0;\n          left: 0;\n          position: fixed;\n          right: 0;\n          top: 0;\n          z-index:-1;\n      }\n    "],
            directives: [common_1.NgFor, desktop_1.DesktopCmp, taskbar_1.TaskbarCmp, web_browser_1.WebBrowserCmp, file_browser_1.FileBrowserCmp, photo_browser_1.PhotoBrowserCmp, terminal_1.TerminalCmp, video_player_1.VideoPlayerCmp, menu_1.MenuCmp, editor_1.EditorCmp, router_1.ROUTER_DIRECTIVES, pdf_1.PdfCmp],
            viewProviders: [http_1.HTTP_PROVIDERS],
        }), 
        __metadata('design:paramtypes', [http_1.Http, router_1.RouteParams])
    ], DesktopAppCmp);
    return DesktopAppCmp;
})();
exports.DesktopAppCmp = DesktopAppCmp;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZGVza3RvcC9kZXNrdG9wLnRzIl0sIm5hbWVzIjpbIkRlc2t0b3BBcHBDbXAiLCJEZXNrdG9wQXBwQ21wLmNvbnN0cnVjdG9yIiwiRGVza3RvcEFwcENtcC5jcmVhdGVBcHAiLCJEZXNrdG9wQXBwQ21wLmxzQnlQYXRoIiwiRGVza3RvcEFwcENtcC5nZXRGaWxlQnJvd3NlckNvbmZpZyIsIkRlc2t0b3BBcHBDbXAucGFyc2UiLCJEZXNrdG9wQXBwQ21wLmxzIiwiRGVza3RvcEFwcENtcC5jYXQiLCJEZXNrdG9wQXBwQ21wLnJtIiwiRGVza3RvcEFwcENtcC5jcCIsIkRlc2t0b3BBcHBDbXAubXYiLCJEZXNrdG9wQXBwQ21wLnRvdWNoIiwiRGVza3RvcEFwcENtcC5ta2RpciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEscUJBQTBCLGVBQWUsQ0FBQyxDQUFBO0FBQzFDLHVCQUErQixpQkFBaUIsQ0FBQyxDQUFBO0FBQ2pELHdCQUEyQiwrQkFBK0IsQ0FBQyxDQUFBO0FBQzNELHdCQUEyQiwrQkFBK0IsQ0FBQyxDQUFBO0FBQzNELDZCQUErQix3Q0FBd0MsQ0FBQyxDQUFBO0FBQ3hFLDhCQUFnQyx5Q0FBeUMsQ0FBQyxDQUFBO0FBQzFFLDRCQUE4Qix1Q0FBdUMsQ0FBQyxDQUFBO0FBQ3RFLG9CQUF1QiwrQkFBK0IsQ0FBQyxDQUFBO0FBQ3ZELHlCQUE0QixvQ0FBb0MsQ0FBQyxDQUFBO0FBQ2pFLHVCQUEwQixrQ0FBa0MsQ0FBQyxDQUFBO0FBQzdELDZCQUErQix3Q0FBd0MsQ0FBQyxDQUFBO0FBQ3hFLHFCQUE0Qiw0QkFBNEIsQ0FBQyxDQUFBO0FBQ3pELHFCQUFrQyx5QkFBeUIsQ0FBQyxDQUFBO0FBRzVELHFCQUE2QyxlQUFlLENBQUMsQ0FBQTtBQUM3RCx1QkFBMkUsaUJBQWlCLENBQUMsQ0FBQTtBQUc3RixJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUE7QUFFbEIsSUFBSSxXQUFXLEdBQUcsRUFBRSxPQUFPLEVBQUcsSUFBSSxj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UUFBUUEsR0FBR0E7d0JBQ1pBLEtBQUlBLENBQUNBLFNBQVNBLENBQUNBLGNBQWNBLEVBQUVBLEtBQUlBLENBQUNBLFdBQVdBLEVBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLGdDQUFnQ0EsR0FBQ0EsS0FBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsRUFBRUEsR0FBQ0EsT0FBT0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBQ0EsaUJBQWlCQSxFQUFFQSxDQUFDQSxDQUFBQTtvQkFDbEpBLENBQUNBLENBQUFBO2dCQUNMQSxDQUFDQTtnQkFFREEsRUFBRUEsQ0FBQUEsQ0FBRUEsSUFBSUEsQ0FBQ0EsSUFBSUEsS0FBS0EsaUJBQWtCQSxDQUFDQSxDQUFBQSxDQUFDQTtvQkFDbENBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLEdBQUNBLElBQUlBLENBQUFBO29CQUN0QkEsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0E7d0JBQ1pBLEtBQUlBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLFNBQVNBLEdBQUNBLEtBQUlBLENBQUNBLE1BQU1BLENBQUNBLEVBQUVBLEdBQUNBLFFBQVFBLEdBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLFNBQVNBLENBQUNBLFVBQUFBLEdBQUdBOzRCQUNwRUEsTUFBTUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsRUFBRUEsQ0FBQUE7d0JBQzlCQSxDQUFDQSxDQUFDQSxDQUFBQTtvQkFDTkEsQ0FBQ0EsQ0FBQUE7Z0JBQ0xBLENBQUNBO2dCQUVEQSxFQUFFQSxDQUFBQSxDQUFFQSxJQUFJQSxDQUFDQSxJQUFJQSxLQUFLQSxZQUFZQSxJQUFJQSxJQUFJQSxDQUFDQSxJQUFJQSxLQUFLQSxlQUFnQkEsQ0FBQ0EsQ0FBQUEsQ0FBQ0E7b0JBQzlEQSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQTt3QkFDWkEsS0FBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsRUFBRUEsVUFBQ0EsSUFB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Q0EsS0FBS0EsQ0FBQ0EsQ0FBQUE7SUFDOURBLENBQUNBO0lBNVNMWjtRQUFDQSxnQkFBU0EsQ0FBQ0E7WUFDUEEsUUFBUUEsRUFBRUEsYUFBYUE7WUFDdkJBLFFBQVFBLEVBQUVBLGswQkFXVEE7WUFDREEsTUFBTUEsRUFBRUEsQ0FBQ0EsdVVBZ0JSQSxDQUFDQTtZQUNGQSxVQUFVQSxFQUFFQSxDQUFDQSxjQUFLQSxFQUFFQSxvQkFBVUEsRUFBRUEsb0JBQVVBLEVBQUVBLDJCQUFhQSxFQUFFQSw2QkFBY0EsRUFBRUEsK0JBQWVBLEVBQUVBLHNCQUFXQSxFQUFDQSw2QkFBY0EsRUFBRUEsY0FBT0EsRUFBRUEsa0JBQVNBLEVBQUVBLDBCQUFpQkEsRUFBQ0EsWUFBTUEsQ0FBQ0E7WUFDcktBLGFBQWFBLEVBQUVBLENBQUNBLHFCQUFjQSxDQUFDQTtTQUNsQ0EsQ0FBQ0E7O3NCQTZYREE7SUFBREEsb0JBQUNBO0FBQURBLENBOVpBLEFBOFpDQSxJQUFBO0FBM1hZLHFCQUFhLGdCQTJYekIsQ0FBQSIsImZpbGUiOiJjb21wb25lbnRzL2Rlc2t0b3AvZGVza3RvcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHsgTmdTdHlsZSwgTmdGb3IgfSBmcm9tICdhbmd1bGFyMi9jb21tb24nO1xuaW1wb3J0IHsgRGVza3RvcENtcCB9IGZyb20gJy4uLy4uL2Rlc2t0b3AvZGVza3RvcC9kZXNrdG9wJztcbmltcG9ydCB7IFRhc2tiYXJDbXAgfSBmcm9tICcuLi8uLi9kZXNrdG9wL3Rhc2tiYXIvdGFza2Jhcic7XG5pbXBvcnQgeyBGaWxlQnJvd3NlckNtcCB9IGZyb20gJy4uLy4uL2Rlc2t0b3AvYXBwbGljYXRpb24vZmlsZS1icm93c2VyJztcbmltcG9ydCB7IFBob3RvQnJvd3NlckNtcCB9IGZyb20gJy4uLy4uL2Rlc2t0b3AvYXBwbGljYXRpb24vcGhvdG8tYnJvd3Nlcic7XG5pbXBvcnQgeyBXZWJCcm93c2VyQ21wIH0gZnJvbSAnLi4vLi4vZGVza3RvcC9hcHBsaWNhdGlvbi93ZWItYnJvd3Nlcic7XG5pbXBvcnQgeyBQZGZDbXAgfSBmcm9tICcuLi8uLi9kZXNrdG9wL2FwcGxpY2F0aW9uL3BkZic7XG5pbXBvcnQgeyBUZXJtaW5hbENtcCB9IGZyb20gJy4uLy4uL2Rlc2t0b3AvYXBwbGljYXRpb24vdGVybWluYWwnO1xuaW1wb3J0IHsgRWRpdG9yQ21wIH0gZnJvbSAnLi4vLi4vZGVza3RvcC9hcHBsaWNhdGlvbi9lZGl0b3InO1xuaW1wb3J0IHsgVmlkZW9QbGF5ZXJDbXAgfSBmcm9tICcuLi8uLi9kZXNrdG9wL2FwcGxpY2F0aW9uL3ZpZGVvLXBsYXllcic7XG5pbXBvcnQgeyBkb2NrQXBwTGlzdCB9IGZyb20gJy4uLy4uL2Rlc2t0b3AvdGFza2Jhci9kb2NrJztcbmltcG9ydCB7IE1lbnVDbXAgLCBtZW51TGlzdH0gZnJvbSAnLi4vLi4vZGVza3RvcC9tZW51L21lbnUnO1xuaW1wb3J0IHsgYm9vdHN0cmFwIH0gICAgZnJvbSAnYW5ndWxhcjIvcGxhdGZvcm0vYnJvd3NlcidcbmltcG9ydCB7IEluamVjdG9yLCBwcm92aWRlIH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQgeyBIdHRwLCBIVFRQX1BST1ZJREVSUywgSGVhZGVyc30gZnJvbSAnYW5ndWxhcjIvaHR0cCc7XG5pbXBvcnQge1JvdXRlQ29uZmlnLCBST1VURVJfRElSRUNUSVZFUywgUk9VVEVSX0JJTkRJTkdTLCBSb3V0ZVBhcmFtc30gZnJvbSAnYW5ndWxhcjIvcm91dGVyJztcblxuZGVjbGFyZSB2YXIgJCwgX1xudmFyIGNvcHlfcGF0aCA9ICcnXG4gZGVjbGFyZSB2YXIgVGVybWluYWwgLCBpb1xudmFyIHBvc3RPcHRpb25zID0geyBoZWFkZXJzOiAgbmV3IEhlYWRlcnMoe1xuXHQnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG59KX1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdkZXNrdG9wLWFwcCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRlc2t0b3AgWyhzaG9ydGN1dHMpXT1cInNob3J0Y3V0c1wiIFsoYmFja2dyb3VuZF9pbWFnZSldPVwiYmFja2dyb3VuZEltYWdlXCI+PC9kZXNrdG9wPlxuICAgICAgICA8dGFza2JhciBbZG9ja3NdPVwiZG9ja3NcIj48L3Rhc2tiYXI+XG4gICAgICAgIDxmaWxlLWJyb3dzZXIgKm5nRm9yPVwiI2l0ZW0gb2YgZmlsZUJyb3dzZXJzXCIgW2NvbmZpZ109XCJpdGVtXCIgPjwvZmlsZS1icm93c2VyPlxuICAgICAgICA8d2ViLWJyb3dzZXIgKm5nRm9yPVwiI2l0ZW0gb2Ygd2ViQnJvd3NlcnNcIiBbY29uZmlnXT1cIml0ZW1cIiA+PC93ZWItYnJvd3Nlcj5cbiAgICAgICAgPHBob3RvLWJyb3dzZXIgKm5nRm9yPVwiI2l0ZW0gb2YgcGhvdG9Ccm93c2Vyc1wiIFtjb25maWddPVwiaXRlbVwiID48L3Bob3RvLWJyb3dzZXI+XG4gICAgICAgIDx0ZXJtaW5hbCAqbmdGb3I9XCIjaXRlbSBvZiB0ZXJtaW5hbHNcIiBbY29uZmlnXT1cIml0ZW1cIiA+PC90ZXJtaW5hbD5cbiAgICAgICAgPGVkaXRvciAqbmdGb3I9XCIjaXRlbSBvZiBlZGl0b3JMaXN0XCIgW2NvbmZpZ109XCJpdGVtXCIgPjwvZWRpdG9yPlxuICAgICAgICA8dmlkZW8tcGxheWVyICpuZ0Zvcj1cIiNpdGVtIG9mIHZpZGVvUGxheWVyXCIgW2NvbmZpZ109XCJpdGVtXCIgPjwvdmlkZW8tcGxheWVyPlxuICAgICAgICA8bWVudSBzdHlsZT1cInBvc2l0aW9uOmFic29sdXRlXCIgKm5nRm9yPVwiI2l0ZW0gb2YgbWVudXNcIiBbY29uZmlnXT1cIml0ZW1cIiA+PC9tZW51PlxuICAgICAgICA8cGRmICpuZ0Zvcj1cIiNpdGVtIG9mIHBkZnNcIiBbY29uZmlnXT1cIml0ZW1cIiA+PC9wZGY+XG4gICAgYCxcbiAgICBzdHlsZXM6IFtgXG5cbiAgICAgIC5mdWxsc2NyZWVuX3Bvc3RfYmcgaW1nIHtcbiAgICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgfVxuXG4gICAgICAuZnVsbHNjcmVlbl9wb3N0X2JnIHtcbiAgICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiA1MCUgNTAlO1xuICAgICAgICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gICAgICAgICAgYm90dG9tOiAwO1xuICAgICAgICAgIGxlZnQ6IDA7XG4gICAgICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICAgIHRvcDogMDtcbiAgICAgICAgICB6LWluZGV4Oi0xO1xuICAgICAgfVxuICAgIGBdLFxuICAgIGRpcmVjdGl2ZXM6IFtOZ0ZvciwgRGVza3RvcENtcCwgVGFza2JhckNtcCwgV2ViQnJvd3NlckNtcCwgRmlsZUJyb3dzZXJDbXAsIFBob3RvQnJvd3NlckNtcCwgVGVybWluYWxDbXAsVmlkZW9QbGF5ZXJDbXAsIE1lbnVDbXAsIEVkaXRvckNtcCwgUk9VVEVSX0RJUkVDVElWRVMsUGRmQ21wXSxcbiAgICB2aWV3UHJvdmlkZXJzOiBbSFRUUF9QUk9WSURFUlNdLFxufSlcblxuZXhwb3J0IGNsYXNzIERlc2t0b3BBcHBDbXAge1xuICAgIF9pZCA9ICdkZXNrdG9wJ1xuICAgIGJhY2tncm91bmRJbWFnZSA9ICcvcmVzb3VyY2UvaW1hZ2VzL2ltZzEuanBnJ1xuICAgIGZpbGVCcm93c2VycyA9IFtdXG4gICAgcGhvdG9Ccm93c2VycyA9IFtdXG4gICAgd2ViQnJvd3NlcnMgPSBbXVxuICAgIHBkZnMgPSBbXVxuICAgIHZpZGVvUGxheWVyID0gW11cbiAgICBtZW51cyA9IG1lbnVMaXN0XG4gICAgdGVybWluYWxzID0gW11cbiAgICBzaG9ydGN1dHMgPSBbXVxuICAgIGVkaXRvckxpc3QgPSBbXVxuICAgIGRvY2tzID0gW11cbiAgICBpZEluZGV4ID0gMFxuICAgIGNyZWF0ZUFwcCh0eXBlLCBsaXN0LCBjb25maWc9e30pXG4gICAge1xuICAgICAgICB2YXIgaWQgPSB0eXBlICsgJy0nICsgdGhpcy5pZEluZGV4ICsrIFxuICAgICAgICBsaXN0LnB1c2goXy5leHRlbmQoY29uZmlnLHtcbiAgICAgICAgICAgIF9pZDogaWQsXG4gICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgY29tcG9uZW50TGlzdDogbGlzdFxuICAgICAgICB9KSlcbiAgICAgICAgXG4gICAgICAgIHZhciBpc0ZpbmQgPSBmYWxzZSBcbiAgICAgICAgZG9ja0FwcExpc3QuZm9yRWFjaCgoaXRlbSwgaW5kZXgpPT57XG4gICAgICAgICAgICBpZiggaXRlbS5faWQgPT09IHR5cGUgKVxuICAgICAgICAgICAgICAgIGlzRmluZCA9IHRydWVcbiAgICAgICAgfSlcbiAgICAgICAgXG4gICAgICAgIGlmKCAhaXNGaW5kIClcbiAgICAgICAgICAgIGRvY2tBcHBMaXN0LnB1c2goe19pZDogdHlwZSwgaXRlbXM6IGxpc3QsIGljb246ICd0YXNrLWljb24tJyt0eXBlIH0pXG4gICAgfVxuICAgIFxuICAgIGxzQnlQYXRoKHBhdGgsIGNvbmZpZyl7XG4gICAgICAgIHRoaXMubHMocGF0aCwgKGxpc3QpPT57XG4gICAgICAgICAgICBsaXN0LmZvckVhY2goIChpdGVtKT0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaXRlbS50ZXh0ID0gaXRlbS5uYW1lXG4gICAgICAgICAgICAgICAgaXRlbS5pY29uID0gdGhpcy5pY29uTWFwW2l0ZW0udHlwZV1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpdGVtLnJlbmFtZSA9ICgobmFtZSk9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tdihpdGVtLnBhdGgsIGl0ZW0ucGF0aC5zcGxpdCgnLycpLnNwbGljZSgwLCBpdGVtLnBhdGguc3BsaXQoJy8nKS5sZW5ndGgtMSkuam9pbignLycpKyAnLycrbmFtZSwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ1snb2JqZWN0J10ucmVmcmVzaCgpXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpdGVtLm1lbnUgPSBbe1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIuaJk+W8gFwiLFxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihldmVudCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmRibGNsaWNrKCkgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwi5aSN5Yi2XCIsXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvcHlfcGF0aCA9IGl0ZW0ucGF0aFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIumHjeWRveWQjVwiLFxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihldmVudCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLm9iai5yZW5hbWUoKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIuWIoOmZpFwiLFxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyOiAoZXZlbnQpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiggIWNvbmZpcm0oXCLnoa7orqTliKDpmaTvvJ9cIikgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ybShpdGVtLnBhdGgsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnWydvYmplY3QnXS5yZWZyZXNoKClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmKCAhaXRlbS5pY29uIClcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5pY29uID0gJ2ljb24tZmlsZSdcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiggaXRlbS50eXBlID09PSAnaW5vZGUvZGlyZWN0b3J5JyApe1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmRibGNsaWNrID0gKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ1snb2JqZWN0J11bJ3NldFBhdGgnXSgocGF0aCA9PT0gJy8nPycnOnBhdGgpICsgJy8nICsgaXRlbS5uYW1lKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGl0ZW0udHlwZSlcbiAgICAgICAgICAgICAgICBpZiggL2ltYWdlXFwvKi8udGVzdChpdGVtLnR5cGUpICl7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZGJsY2xpY2sgPSAoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVBcHAoJ3Bob3RvLWJyb3dzZXInLCB0aGlzLnBob3RvQnJvd3NlcnMsIHsgaWNvbjonaWNvbi1pbWFnZScsIHRpdGxlOiBpdGVtLm5hbWUsIHVybDogJy9nZXRGaWxlLycrdGhpcy5wYXJhbXMuaWQrJz91cmw9JytpdGVtLnBhdGgrJyZ0eXBlPScraXRlbS50eXBlIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYoIGl0ZW0udHlwZSA9PT0gJ2FwcGxpY2F0aW9uL3BkZicgKXtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5kYmxjbGljayA9ICgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUFwcCgncGRmJywgdGhpcy5wZGZzLCB7IHRpdGxlOml0ZW0ubmFtZSwgaWNvbjonaWNvbi1wZGYnLCBzcmM6ICdodHRwOi8vJyt3aW5kb3cubG9jYXRpb24uaG9zdCsnL3BkZi5odG1sP3VybD1odHRwOi8vJyt3aW5kb3cubG9jYXRpb24uaG9zdCsnL2dldEZpbGUvJyt0aGlzLnBhcmFtcy5pZCsnP3VybD0nK2l0ZW0ucGF0aCsnwqd0eXBlPXRleHQvaHRtbCcgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiggaXRlbS50eXBlID09PSAnYXBwbGljYXRpb24vb2dnJyApe1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmRibGNsaWNrID0gKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlQXBwKCd2aWRlby1wbGF5ZXInLCB0aGlzLnZpZGVvUGxheWVyLCB7IHVybDogJ2h0dHA6Ly8xMjcuMC4wLjE6ODA4OC9nZXRGaWxlLycrdGhpcy5wYXJhbXMuaWQrJz91cmw9JytpdGVtLnBhdGgrJyZ0eXBlPXZpZGVvL29nZycgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiggaXRlbS50eXBlID09PSAnYXBwbGljYXRpb24vemlwJyApe1xuICAgICAgICAgICAgICAgICAgICBpdGVtLm1lbnVbMF0udGV4dD0n6Kej5Y6LJ1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmRibGNsaWNrID0gKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaHR0cC5nZXQoJy91bnppcC8nK3RoaXMucGFyYW1zLmlkKyc/cGF0aD0nK2l0ZW0ucGF0aCkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnWydvYmplY3QnXS5yZWZyZXNoKClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYoIGl0ZW0udHlwZSA9PT0gJ3RleHQvcGxhaW4nIHx8IGl0ZW0udHlwZSA9PT0gJ2lub2RlL3gtZW1wdHknICl7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZGJsY2xpY2sgPSAoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXQoaXRlbS5wYXRoLCAoZGF0YSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUFwcCgnZWRpdG9yJywgdGhpcy5lZGl0b3JMaXN0LCB7IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiBkYXRhLC8vcmVzLmpzb24oKS5ib2R5LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGl0ZW0ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2ljb24tdGV4dGZpbGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblNhdmU6IChzdHIpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiggIS9cXFxcbiQvLnRlc3Qoc3RyKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHIrPSdcXG4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmh0dHAucG9zdCgnL3dyaXRlLycrdGhpcy5wYXJhbXMuaWQrJz9wYXRoPScraXRlbS5wYXRoLCBKU09OLnN0cmluZ2lmeSh7Ym9keTogc3RyfSksIHBvc3RPcHRpb25zKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiggcmVzLnN0YXR1cyAhPT0gMjAwIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQocmVzLmpzb24oKS5lcnJvcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbmZpZy5maWxlTGlzdCA9IGxpc3RcbiAgICAgICAgfSlcbiAgICB9XG4gICAgXG4gICAgaWNvbk1hcCA9IHtcbiAgICAgICAgJ2lub2RlL2RpcmVjdG9yeSc6ICdpY29uLWZvbGRlcicsXG4gICAgICAgICd0ZXh0L3BsYWluJzogJ2ljb24tdGV4dGZpbGUnLFxuICAgICAgICAnaW1hZ2UvcG5nJzogJ2ljb24taW1hZ2UnLFxuICAgICAgICAnaW1hZ2UvanBlZyc6ICdpY29uLWltYWdlJyxcbiAgICAgICAgJ2FwcGxpY2F0aW9uL29nZyc6ICdpY29uLXZpZGVvJyxcbiAgICAgICAgJ2FwcGxpY2F0aW9uL3ppcCc6ICdpY29uLXppcCcsXG4gICAgICAgICdpbm9kZS94LWVtcHR5JzogJ2ljb24tdGV4dGZpbGUnLFxuICAgICAgICAnYXBwbGljYXRpb24vcGRmJzogJ2ljb24tcGRmJ1xuICAgIH1cbiAgICBcbiAgICBnZXRGaWxlQnJvd3NlckNvbmZpZyhfY29uZmlnID0ge30pXG4gICAge1xuICAgICAgICB2YXIgY29uZmlnID0gXy5leHRlbmQoX2NvbmZpZyxcbiAgICAgICAge1xuICAgICAgICAgICAgb25TZXRQYXRoOiAocGF0aCk9PntcbiAgICAgICAgICAgICAgICB0aGlzLmxzQnlQYXRoKHBhdGgsIGNvbmZpZylcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmaWxlTGlzdDogW11cbiAgICAgICAgfSlcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBjb25maWdcbiAgICB9XG4gICAgXG4gICAgcGFyc2Uoc3RyKXtcbiAgICAgICAgY29uc29sZS5sb2coJ3N0YXJ0ISEhJylcbiAgICAgICAgdmFyIGxpc3QgPSBzdHIuc3BsaXQoJ1xcbicpXG4gICAgICAgIHZhciBsaXN0MiAsIGxpc3QzID0gW11cbiAgICAgICAgbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pe1xuICAgICAgICAgICAgaWYoIGl0ZW0uaW5kZXhPZignLycpID09PSAwIClcbiAgICAgICAgICAgICAgICBsaXN0MiA9IGxpc3QyIHx8IFtdXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihsaXN0MilcbiAgICAgICAgICAgICAgICBsaXN0Mi5wdXNoKGl0ZW0pXG4gICAgICAgIH0pXG4gICAgICAgIGxpc3QyLnBvcCgpXG4gICAgICAgIFxuICAgICAgICBsaXN0Mi5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KVxuICAgICAgICB7XG4gICAgICAgICAgICBpdGVtID0gaXRlbS5yZXBsYWNlKC8gL2csICcnKVxuICAgICAgICAgICAgaWYoICFpdGVtIClcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHN0ciA9IGl0ZW0uc3BsaXQoJzonKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiggc3RyWzBdLnNwbGl0KCcvJykucG9wKCkgPT09ICcqJyApXG4gICAgICAgICAgICAgICAgcmV0dXJuIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBsaXN0My5wdXNoKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBzdHJbMV0uc3BsaXQoJzsnKVswXSxcbiAgICAgICAgICAgICAgICBuYW1lOiBzdHJbMF0uc3BsaXQoJy8nKS5wb3AoKSxcbiAgICAgICAgICAgICAgICBwYXRoOiBzdHJbMF1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbGlzdDNcbiAgICB9XG4gICAgXG4gICAgc29ja2V0ID0gbnVsbFxuICAgIGNhbGxiYWNrOmFueSA9IG51bGxcbiAgICB0ZXJtX2lkOmFueSBcbiAgICBcbiAgICBscyhuYW1lLCBkb25lKXtcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IChkYXRhKT0+e1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayA9IG51bGxcbiAgICAgICAgICAgIGRvbmUodGhpcy5wYXJzZShkYXRhKSlcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ2RhdGEnK3RoaXMudGVybV9pZCwgJ2ZpbGUgJytuYW1lKycvKiAtLW1pbWUgXFxuJylcbiAgICB9XG4gICAgXG4gICAgY2F0KHBhdGgsIGRvbmUpe1xuICAgICAgICB0aGlzLmNhbGxiYWNrID0gKGRhdGEpPT57XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrID0gbnVsbFxuICAgICAgICAgICAgZGF0YSA9IGRhdGEuc3BsaXQoJ1xcbicpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgICAgICAgZG9uZShkYXRhLnNwbGljZSgxLCBkYXRhLmxlbmd0aC0yKS5qb2luKCdcXG4nKSlcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyggJ2NhdCAnK3BhdGgpXG4gICAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ2RhdGEnK3RoaXMudGVybV9pZCwgJ2NhdCAnK3BhdGgrJyBcXG4nKVxuICAgIH1cbiAgICBcbiAgICBybShwYXRoLCBkb25lKXtcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IChkYXRhKT0+e1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayA9IG51bGxcbiAgICAgICAgICAgIGRvbmUoKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ2RhdGEnK3RoaXMudGVybV9pZCwgJ3JtIC1yICcrcGF0aCsnIFxcbicpXG4gICAgfVxuICAgIFxuICAgIGNwKHNvdXJjZSwgdG8sIGRvbmUpe1xuICAgICAgICB0aGlzLmNhbGxiYWNrID0gKGRhdGEpPT57XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrID0gbnVsbFxuICAgICAgICAgICAgZG9uZSgpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zb2NrZXQuZW1pdCgnZGF0YScrdGhpcy50ZXJtX2lkLCAnY3AgLXIgJytzb3VyY2UrJyAnKyB0byArJyBcXG4nKVxuICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgIH1cbiAgICBcbiAgICBtdihwYXRoLCBuZXdQYXRoLCBkb25lKXtcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IChkYXRhKT0+e1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayA9IG51bGxcbiAgICAgICAgICAgIGRhdGEgPSBkYXRhLnNwbGl0KCdcXG4nKVxuICAgICAgICAgICAgY29uc29sZS5sb2coKVxuICAgICAgICAgICAgZG9uZSgpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ2RhdGEnK3RoaXMudGVybV9pZCwgJ212ICcrcGF0aCsnICcrIG5ld1BhdGggKycgXFxuJylcbiAgICB9XG4gICAgXG4gICAgdG91Y2gocGF0aCwgZG9uZSl7XG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSAoZGF0YSk9PntcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2sgPSBudWxsXG4gICAgICAgICAgICBkYXRhID0gZGF0YS5zcGxpdCgnXFxuJylcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKClcbiAgICAgICAgICAgIGRvbmUoZGF0YS5zcGxpY2UoMSwgZGF0YS5sZW5ndGgtMikuam9pbignXFxuJykpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ2RhdGEnK3RoaXMudGVybV9pZCwgJ3RvdWNoICcrcGF0aCsnIFxcbicpXG4gICAgfVxuICAgIFxuICAgIG1rZGlyKHBhdGgsIGRvbmUpe1xuICAgICAgICB0aGlzLmNhbGxiYWNrID0gKGRhdGEpPT57XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrID0gbnVsbFxuICAgICAgICAgICAgZGF0YSA9IGRhdGEuc3BsaXQoJ1xcbicpXG4gICAgICAgICAgICBjb25zb2xlLmxvZygpXG4gICAgICAgICAgICBkb25lKGRhdGEuc3BsaWNlKDEsIGRhdGEubGVuZ3RoLTIpLmpvaW4oJ1xcbicpKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLnNvY2tldC5lbWl0KCdkYXRhJyt0aGlzLnRlcm1faWQsICdta2RpciAnK3BhdGgrJyBcXG4nKVxuICAgIH1cbiAgICBwYXJhbXM6YW55ID0ge31cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgaHR0cD86IEh0dHAsIHJvdXRlclBhcmFtcz86IFJvdXRlUGFyYW1zKXtcbiAgICAgICAgdGhpcy5wYXJhbXMgPSByb3V0ZXJQYXJhbXMucGFyYW1zXG4gICAgICAgIFxuICAgICAgICBzZXRUaW1lb3V0KCgpPT5cbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHRlcm1faWQgPSB0aGlzLnBhcmFtcy5pZCArJ8KnJysgMTFcbiAgICAgICAgICAgIHRoaXMuc29ja2V0ID0gaW8uY29ubmVjdChcImh0dHA6Ly9cIit3aW5kb3cubG9jYXRpb24uaG9zdClcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5zb2NrZXQuZW1pdCgnY3JlYXRlVGVybWluYWwnLCB0ZXJtX2lkLCAodGVybV9pZCk9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBzdHIgPSAnJ1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMudGVybV9pZCA9IHRlcm1faWRcbiAgICAgICAgICAgICAgICB0aGlzLnNvY2tldC5vbignZGF0YScrdGVybV9pZCwgKGRhdGEpPT57XG4gICAgICAgICAgICAgICAgICAgIHN0ciArPSBkYXRhLnRvU3RyaW5nKCkucmVwbGFjZSgvXFx4MUJcXFsoWzAtOV17MSwyfSg7WzAtOV17MSwyfSk/KT9bbXxLXS9nLCAnJylcbiAgICAgICAgICAgICAgICAgICAgaWYoIC9bXFxkXFx3XSs6XFwvIyQvLnRlc3Qoc3RyLnRyaW0oKSkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFjayAmJiB0aGlzLmNhbGxiYWNrKHN0cilcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ciA9ICcnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sMTAwKVxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIC8vIHNldFRpbWVvdXQoKCk9PiB7XG4gICAgICAgIC8vICAgICB0aGlzLmNhdCgnL2V0Yy9ob3N0cycsIGZ1bmN0aW9uKCl7fSlcbiAgICAgICAgLy8gfSwgMTAwMCk7XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgdmFyIGluZGV4ID0gMVxuICAgICAgICB0aGlzLnNob3J0Y3V0cyA9IFt7XG4gICAgICAgICAgICBpY29uOiAnaWNvbi1jb21wdXRlcicsXG4gICAgICAgICAgICB0ZXh0OiAn6L+Z5Y+w55S16ISRJyxcbiAgICAgICAgICAgIHNoYWRvdzogJ3NoYWRvdycsXG4gICAgICAgICAgICBkYmxjbGljazogKCk9PntcbiAgICAgICAgICAgICAgICB2YXIgY29uZmlnID0ge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+i/meWPsOeUteiEkScsXG4gICAgICAgICAgICAgICAgICAgIHBhdGg6ICcvJyxcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2ljb24tY29tcHV0ZXInLFxuICAgICAgICAgICAgICAgICAgICB1cGxvYWRVcmw6Jy91cGxvYWQvJyt0aGlzLnBhcmFtcy5pZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUFwcCgnZmlsZS1icm93c2VyJywgdGhpcy5maWxlQnJvd3NlcnMsIHRoaXMuZ2V0RmlsZUJyb3dzZXJDb25maWcoY29uZmlnKSlcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaWNvbjogJ2ljb24tdXNlcicsIFxuICAgICAgICAgICAgdGV4dDogJ+aIkeeahOaWh+ahoycsXG4gICAgICAgICAgICBzaGFkb3c6ICdzaGFkb3cnLFxuICAgICAgICAgICAgZGJsY2xpY2s6KCk9PntcbiAgICAgICAgICAgICAgICB2YXIgY29uZmlnID0ge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+aIkeeahOaWh+ahoycsXG4gICAgICAgICAgICAgICAgICAgIHBhdGg6ICcvcm9vdCcsXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdpY29uLXVzZXInLFxuICAgICAgICAgICAgICAgICAgICB1cGxvYWRVcmw6Jy91cGxvYWQvJyt0aGlzLnBhcmFtcy5pZCxcbiAgICAgICAgICAgICAgICAgICAgbWVudTogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwi5paw5bu6XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn5paH5Lu25aS5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVyOiAoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1rZGlyKGNvbmZpZ1snb2JqZWN0J10ucGF0aCsnL05ld0ZvbGRlcicsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maWdbJ29iamVjdCddLnJlZnJlc2goKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn5paH5qGjJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVyOiAoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvdWNoKGNvbmZpZ1snb2JqZWN0J10ucGF0aCsnL05ld0ZpbGUnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnWydvYmplY3QnXS5yZWZyZXNoKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCLliLfmlrBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKGV2ZW50KSBcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maWdbJ29iamVjdCddLnJlZnJlc2goKSAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIueymOi0tFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlcjogKGV2ZW50KT0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpbGVuYW1lID0gY29weV9wYXRoLnNwbGl0KCcvJykucG9wKCkgKyAnX2NvcHknXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3AoY29weV9wYXRoLCBjb25maWdbJ29iamVjdCddLnBhdGggKyAnLycgKyBmaWxlbmFtZSwgKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ1snb2JqZWN0J10ucmVmcmVzaCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVBcHAoJ2ZpbGUtYnJvd3NlcicsIHRoaXMuZmlsZUJyb3dzZXJzLCB0aGlzLmdldEZpbGVCcm93c2VyQ29uZmlnKGNvbmZpZykpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGljb246ICdpY29uLXRlcm1pbmFsJyxcbiAgICAgICAgICAgIHRleHQ6ICdUZXJtaW5hbCcsXG4gICAgICAgICAgICBzaGFkb3c6ICdzaGFkb3cnLFxuICAgICAgICAgICAgZGJsY2xpY2s6ICgpPT57XG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVBcHAoJ3Rlcm1pbmFsJywgdGhpcy50ZXJtaW5hbHMsIHsgaWNvbjonaWNvbi10ZXJtaW5hbCcsIHRpdGxlOidUZXJtaW5hbCcsIGNvbnRhaW5lcl9pZDogdGhpcy5wYXJhbXMuaWQgLCBpY29uX2NsYXNzOiAnaWNvbi10ZXJtaW5hbCd9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpY29uOiAnaWNvbi1pZS1lZGdlJyxcbiAgICAgICAgICAgIHRleHQ6ICdJbnRlcm5ldCcsXG4gICAgICAgICAgICBzaGFkb3c6ICdzaGFkb3cnLFxuICAgICAgICAgICAgZGJsY2xpY2s6ICgpPT57XG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVBcHAoJ3dlYi1icm93c2VyJywgdGhpcy53ZWJCcm93c2VycywgeyBpY29uOidpY29uLWllLWVkZ2UnLCBzcmM6J2h0dHA6Ly8nK3RoaXMucGFyYW1zLmlwKyc6Jyt0aGlzLnBhcmFtcy5wb3J0LCB0aXRsZTonSW50ZXJuZXQnLGljb25fY2xhc3M6ICdpY29uLWllLWVkZ2UnfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfV1cbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=