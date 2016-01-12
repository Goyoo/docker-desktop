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
var terminal_1 = require('../../desktop/application/terminal');
var editor_1 = require('../../desktop/application/editor');
var video_player_1 = require('../../desktop/application/video-player');
var dock_1 = require('../../desktop/taskbar/dock');
var menu_1 = require('../../desktop/menu/menu');
var http_1 = require('angular2/http');
var copy_path = '';
var postOptions = { headers: new http_1.Headers({
        'Content-Type': 'application/json'
    }) };
var DesktopAppCmp = (function () {
    function DesktopAppCmp(http) {
        var _this = this;
        this.http = http;
        this._id = 'desktop';
        this.backgroundImage = '/resource/images/img1.jpg';
        this.fileBrowsers = [];
        this.photoBrowsers = [];
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
            'inode/x-empty': 'icon-textfile'
        };
        this.socket = null;
        this.callback = null;
        setTimeout(function () {
            var term_id = 'ubuntu-cuqsx' + '§' + 11;
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
                        path: '/'
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
                                    _this.http.post('/cp/ubuntu?source=' + copy_path + '&to=' + config['object'].path + '/' + filename, JSON.stringify({}), postOptions).subscribe(function (res) {
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
                    _this.createApp('terminal', _this.terminals, { icon_class: 'icon-terminal' });
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
    DesktopAppCmp.prototype.lsByPath = function (path, done) {
        console.log(path);
        this.ls(path, function (data) {
            console.log(data);
            done(null, data);
        });
    };
    DesktopAppCmp.prototype.getFileBrowserConfig = function (_config) {
        var _this = this;
        if (_config === void 0) { _config = {}; }
        var config = _.extend(_config, {
            onSetPath: function (path) {
                _this.lsByPath(path, function (err, list) {
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
                                    _this.http.post('/delete/ubuntu?path=' + item.path, JSON.stringify({}), postOptions).subscribe(function (res) {
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
                        if (/image\/*/.test(item.type)) {
                            item.dblclick = function () {
                                _this.createApp('photo-browser', _this.photoBrowsers, { title: item.name, url: '/getFile?url=' + item.path + '&type=' + item.type });
                            };
                        }
                        if (item.type === 'application/ogg') {
                            item.dblclick = function () {
                                _this.createApp('video-player', _this.videoPlayer, { url: 'http://127.0.0.1:8088/getFile?url=' + item.path + '&type=video/ogg' });
                            };
                        }
                        if (item.type === 'application/zip') {
                            item.menu[0].text = '解压';
                            item.dblclick = function () {
                                _this.http.get('/unzip/ubuntu?path=' + item.path).subscribe(function (res) {
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
                                        onSave: function (str) {
                                            if (!/\\n$/.test(str))
                                                str += '\n';
                                            _this.http.post('/write/ubuntu?path=' + item.path, JSON.stringify({ body: str }), postOptions).subscribe(function (res) {
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
            template: "\n        <desktop [(shortcuts)]=\"shortcuts\" [(background_image)]=\"backgroundImage\"></desktop>\n        <taskbar [docks]=\"docks\"></taskbar>\n        <file-browser *ngFor=\"#item of fileBrowsers\" [config]=\"item\" ></file-browser>\n        <photo-browser *ngFor=\"#item of photoBrowsers\" [config]=\"item\" ></photo-browser>\n        <terminal *ngFor=\"#item of terminals\" [config]=\"item\" ></terminal>\n        <editor *ngFor=\"#item of editorList\" [config]=\"item\" ></editor>\n        <video-player *ngFor=\"#item of videoPlayer\" [config]=\"item\" ></video-player>\n        <menu style=\"position:absolute\" *ngFor=\"#item of menus\" [config]=\"item\" ></menu>\n    ",
            styles: ["\n\n      .fullscreen_post_bg img {\n          display: none;\n      }\n\n      .fullscreen_post_bg {\n          background-position: 50% 50%;\n          background-size: cover;\n          bottom: 0;\n          left: 0;\n          position: fixed;\n          right: 0;\n          top: 0;\n          z-index:-1;\n      }\n    "],
            directives: [common_1.NgFor, desktop_1.DesktopCmp, taskbar_1.TaskbarCmp, file_browser_1.FileBrowserCmp, photo_browser_1.PhotoBrowserCmp, terminal_1.TerminalCmp, video_player_1.VideoPlayerCmp, menu_1.MenuCmp, editor_1.EditorCmp],
            viewProviders: [http_1.HTTP_PROVIDERS],
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DesktopAppCmp);
    return DesktopAppCmp;
})();
exports.DesktopAppCmp = DesktopAppCmp;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZGVza3RvcC9kZXNrdG9wLnRzIl0sIm5hbWVzIjpbIkRlc2t0b3BBcHBDbXAiLCJEZXNrdG9wQXBwQ21wLmNvbnN0cnVjdG9yIiwiRGVza3RvcEFwcENtcC5jcmVhdGVBcHAiLCJEZXNrdG9wQXBwQ21wLmxzQnlQYXRoIiwiRGVza3RvcEFwcENtcC5nZXRGaWxlQnJvd3NlckNvbmZpZyIsIkRlc2t0b3BBcHBDbXAucGFyc2UiLCJEZXNrdG9wQXBwQ21wLmxzIiwiRGVza3RvcEFwcENtcC5jYXQiLCJEZXNrdG9wQXBwQ21wLm12IiwiRGVza3RvcEFwcENtcC50b3VjaCIsIkRlc2t0b3BBcHBDbXAubWtkaXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLHFCQUEwQixlQUFlLENBQUMsQ0FBQTtBQUMxQyx1QkFBK0IsaUJBQWlCLENBQUMsQ0FBQTtBQUNqRCx3QkFBMkIsK0JBQStCLENBQUMsQ0FBQTtBQUMzRCx3QkFBMkIsK0JBQStCLENBQUMsQ0FBQTtBQUMzRCw2QkFBK0Isd0NBQXdDLENBQUMsQ0FBQTtBQUN4RSw4QkFBZ0MseUNBQXlDLENBQUMsQ0FBQTtBQUMxRSx5QkFBNEIsb0NBQW9DLENBQUMsQ0FBQTtBQUNqRSx1QkFBMEIsa0NBQWtDLENBQUMsQ0FBQTtBQUM3RCw2QkFBK0Isd0NBQXdDLENBQUMsQ0FBQTtBQUN4RSxxQkFBNEIsNEJBQTRCLENBQUMsQ0FBQTtBQUN6RCxxQkFBa0MseUJBQXlCLENBQUMsQ0FBQTtBQUc1RCxxQkFBNkMsZUFBZSxDQUFDLENBQUE7QUFHN0QsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFBO0FBRWxCLElBQUksV0FBVyxHQUFHLEVBQUUsT0FBTyxFQUFHLElBQUksY0FBTyxDQUFDO1FBQ3pDLGNBQWMsRUFBRSxrQkFBa0I7S0FDbEMsQ0FBQyxFQUFDLENBQUE7QUFHSDtJQWdTSUEsdUJBQW1CQSxJQUFXQTtRQWhTbENDLGlCQXdZQ0E7UUF4R3NCQSxTQUFJQSxHQUFKQSxJQUFJQSxDQUFPQTtR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LENBQUNBOzRCQUNaQSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxXQUFXQSxDQUFBQTt3QkFFM0JBLEVBQUVBLENBQUFBLENBQUVBLElBQUlBLENBQUNBLElBQUlBLEtBQUtBLGlCQUFrQkEsQ0FBQ0EsQ0FBQUEsQ0FBQ0E7NEJBQ2xDQSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQTtnQ0FDWkEsTUFBTUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsS0FBS0EsR0FBR0EsR0FBQ0EsRUFBRUEsR0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQUE7NEJBQ3pFQSxDQUFDQSxDQUFBQTt3QkFDTEEsQ0FBQ0E7d0JBRURBLEVBQUVBLENBQUFBLENBQUVBLFVBQVVBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUVBLENBQUNBLENBQUFBLENBQUNBOzRCQUM3QkEsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0E7Z0NBQ1pBLEtBQUlBLENBQUNBLFNBQVNBLENBQUNBLGVBQWVBLEVBQUVBLEtBQUlBLENBQUNBLGFBQWFBLEVBQUVBLEVBQUVBLEtBQUtBLEVBQUVBLElBQUlBLENBQUNBLElBQUlBLEVBQUVBLEdBQUdBLEVBQUVBLGVBQWVBLEdBQUNBLElBQUlBLENBQUNBLElBQUlBLEdBQUNBLFFBQVFBLEdBQUNBLElBQUlBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLENBQUFBOzRCQUNoSUEsQ0FBQ0EsQ0FBQUE7d0JBQ0xBLENBQUNBO3dCQUVEQSxFQUFFQSxDQUFBQSxDQUFFQSxJQUFJQSxDQUFDQSxJQUFJQSxLQUFLQSxpQkFBa0JBLENBQUNBLENBQUFBLENBQUNBOzRCQUNsQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0E7Z0NBQ1pBLEtBQUlBLENBQUNBLFNBQVNBLENBQUNBLGNBQWNBLEVBQUVBLEtBQUlBLENBQUNBLFdBQVdBLEVBQUVBLEVBQUVBLEdBQUdBLEVBQUVB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QUFFQSxrQkFBU0EsQ0FBQ0E7WUFDNUhBLGFBQWFBLEVBQUVBLENBQUNBLHFCQUFjQSxDQUFDQTtTQUNsQ0EsQ0FBQ0E7O3NCQXlXREE7SUFBREEsb0JBQUNBO0FBQURBLENBeFlBLEFBd1lDQSxJQUFBO0FBdldZLHFCQUFhLGdCQXVXekIsQ0FBQSIsImZpbGUiOiJjb21wb25lbnRzL2Rlc2t0b3AvZGVza3RvcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHsgTmdTdHlsZSwgTmdGb3IgfSBmcm9tICdhbmd1bGFyMi9jb21tb24nO1xuaW1wb3J0IHsgRGVza3RvcENtcCB9IGZyb20gJy4uLy4uL2Rlc2t0b3AvZGVza3RvcC9kZXNrdG9wJztcbmltcG9ydCB7IFRhc2tiYXJDbXAgfSBmcm9tICcuLi8uLi9kZXNrdG9wL3Rhc2tiYXIvdGFza2Jhcic7XG5pbXBvcnQgeyBGaWxlQnJvd3NlckNtcCB9IGZyb20gJy4uLy4uL2Rlc2t0b3AvYXBwbGljYXRpb24vZmlsZS1icm93c2VyJztcbmltcG9ydCB7IFBob3RvQnJvd3NlckNtcCB9IGZyb20gJy4uLy4uL2Rlc2t0b3AvYXBwbGljYXRpb24vcGhvdG8tYnJvd3Nlcic7XG5pbXBvcnQgeyBUZXJtaW5hbENtcCB9IGZyb20gJy4uLy4uL2Rlc2t0b3AvYXBwbGljYXRpb24vdGVybWluYWwnO1xuaW1wb3J0IHsgRWRpdG9yQ21wIH0gZnJvbSAnLi4vLi4vZGVza3RvcC9hcHBsaWNhdGlvbi9lZGl0b3InO1xuaW1wb3J0IHsgVmlkZW9QbGF5ZXJDbXAgfSBmcm9tICcuLi8uLi9kZXNrdG9wL2FwcGxpY2F0aW9uL3ZpZGVvLXBsYXllcic7XG5pbXBvcnQgeyBkb2NrQXBwTGlzdCB9IGZyb20gJy4uLy4uL2Rlc2t0b3AvdGFza2Jhci9kb2NrJztcbmltcG9ydCB7IE1lbnVDbXAgLCBtZW51TGlzdH0gZnJvbSAnLi4vLi4vZGVza3RvcC9tZW51L21lbnUnO1xuaW1wb3J0IHsgYm9vdHN0cmFwIH0gICAgZnJvbSAnYW5ndWxhcjIvcGxhdGZvcm0vYnJvd3NlcidcbmltcG9ydCB7IEluamVjdG9yLCBwcm92aWRlIH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQgeyBIdHRwLCBIVFRQX1BST1ZJREVSUywgSGVhZGVyc30gZnJvbSAnYW5ndWxhcjIvaHR0cCc7XG5cbmRlY2xhcmUgdmFyICQsIF9cbnZhciBjb3B5X3BhdGggPSAnJ1xuIGRlY2xhcmUgdmFyIFRlcm1pbmFsICwgaW9cbnZhciBwb3N0T3B0aW9ucyA9IHsgaGVhZGVyczogIG5ldyBIZWFkZXJzKHtcblx0J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xufSl9XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdkZXNrdG9wLWFwcCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRlc2t0b3AgWyhzaG9ydGN1dHMpXT1cInNob3J0Y3V0c1wiIFsoYmFja2dyb3VuZF9pbWFnZSldPVwiYmFja2dyb3VuZEltYWdlXCI+PC9kZXNrdG9wPlxuICAgICAgICA8dGFza2JhciBbZG9ja3NdPVwiZG9ja3NcIj48L3Rhc2tiYXI+XG4gICAgICAgIDxmaWxlLWJyb3dzZXIgKm5nRm9yPVwiI2l0ZW0gb2YgZmlsZUJyb3dzZXJzXCIgW2NvbmZpZ109XCJpdGVtXCIgPjwvZmlsZS1icm93c2VyPlxuICAgICAgICA8cGhvdG8tYnJvd3NlciAqbmdGb3I9XCIjaXRlbSBvZiBwaG90b0Jyb3dzZXJzXCIgW2NvbmZpZ109XCJpdGVtXCIgPjwvcGhvdG8tYnJvd3Nlcj5cbiAgICAgICAgPHRlcm1pbmFsICpuZ0Zvcj1cIiNpdGVtIG9mIHRlcm1pbmFsc1wiIFtjb25maWddPVwiaXRlbVwiID48L3Rlcm1pbmFsPlxuICAgICAgICA8ZWRpdG9yICpuZ0Zvcj1cIiNpdGVtIG9mIGVkaXRvckxpc3RcIiBbY29uZmlnXT1cIml0ZW1cIiA+PC9lZGl0b3I+XG4gICAgICAgIDx2aWRlby1wbGF5ZXIgKm5nRm9yPVwiI2l0ZW0gb2YgdmlkZW9QbGF5ZXJcIiBbY29uZmlnXT1cIml0ZW1cIiA+PC92aWRlby1wbGF5ZXI+XG4gICAgICAgIDxtZW51IHN0eWxlPVwicG9zaXRpb246YWJzb2x1dGVcIiAqbmdGb3I9XCIjaXRlbSBvZiBtZW51c1wiIFtjb25maWddPVwiaXRlbVwiID48L21lbnU+XG4gICAgYCxcbiAgICBzdHlsZXM6IFtgXG5cbiAgICAgIC5mdWxsc2NyZWVuX3Bvc3RfYmcgaW1nIHtcbiAgICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgfVxuXG4gICAgICAuZnVsbHNjcmVlbl9wb3N0X2JnIHtcbiAgICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiA1MCUgNTAlO1xuICAgICAgICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gICAgICAgICAgYm90dG9tOiAwO1xuICAgICAgICAgIGxlZnQ6IDA7XG4gICAgICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICAgIHRvcDogMDtcbiAgICAgICAgICB6LWluZGV4Oi0xO1xuICAgICAgfVxuICAgIGBdLFxuICAgIGRpcmVjdGl2ZXM6IFtOZ0ZvciwgRGVza3RvcENtcCwgVGFza2JhckNtcCwgRmlsZUJyb3dzZXJDbXAsIFBob3RvQnJvd3NlckNtcCwgVGVybWluYWxDbXAsVmlkZW9QbGF5ZXJDbXAsIE1lbnVDbXAsIEVkaXRvckNtcF0sXG4gICAgdmlld1Byb3ZpZGVyczogW0hUVFBfUFJPVklERVJTXSxcbn0pXG5cbmV4cG9ydCBjbGFzcyBEZXNrdG9wQXBwQ21wIHtcbiAgICBfaWQgPSAnZGVza3RvcCdcbiAgICBiYWNrZ3JvdW5kSW1hZ2UgPSAnL3Jlc291cmNlL2ltYWdlcy9pbWcxLmpwZydcbiAgICBmaWxlQnJvd3NlcnMgPSBbXVxuICAgIHBob3RvQnJvd3NlcnMgPSBbXVxuICAgIHZpZGVvUGxheWVyID0gW11cbiAgICBtZW51cyA9IG1lbnVMaXN0XG4gICAgdGVybWluYWxzID0gW11cbiAgICBzaG9ydGN1dHMgPSBbXVxuICAgIGVkaXRvckxpc3QgPSBbXVxuICAgIGRvY2tzID0gW11cbiAgICBpZEluZGV4ID0gMFxuICAgIGNyZWF0ZUFwcCh0eXBlLCBsaXN0LCBjb25maWc9e30pXG4gICAge1xuICAgICAgICB2YXIgaWQgPSB0eXBlICsgJy0nICsgdGhpcy5pZEluZGV4ICsrIFxuICAgICAgICBsaXN0LnB1c2goXy5leHRlbmQoY29uZmlnLHtcbiAgICAgICAgICAgIF9pZDogaWQsXG4gICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgY29tcG9uZW50TGlzdDogbGlzdFxuICAgICAgICB9KSlcbiAgICAgICAgXG4gICAgICAgIHZhciBpc0ZpbmQgPSBmYWxzZSBcbiAgICAgICAgZG9ja0FwcExpc3QuZm9yRWFjaCgoaXRlbSwgaW5kZXgpPT57XG4gICAgICAgICAgICBpZiggaXRlbS5faWQgPT09IHR5cGUgKVxuICAgICAgICAgICAgICAgIGlzRmluZCA9IHRydWVcbiAgICAgICAgfSlcbiAgICAgICAgXG4gICAgICAgIGlmKCAhaXNGaW5kIClcbiAgICAgICAgICAgIGRvY2tBcHBMaXN0LnB1c2goe19pZDogdHlwZSwgaXRlbXM6IGxpc3QsIGljb246ICd0YXNrLWljb24tJyt0eXBlIH0pXG4gICAgfVxuICAgIFxuICAgIGxzQnlQYXRoKHBhdGgsIGRvbmUpe1xuICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2cocGF0aClcbiAgICAgICAgdGhpcy5scyhwYXRoLCBmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICAgICAgICBkb25lKG51bGwsIGRhdGEpXG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgIH1cbiAgICBcbiAgICBpY29uTWFwID0ge1xuICAgICAgICAnaW5vZGUvZGlyZWN0b3J5JzogJ2ljb24tZm9sZGVyJyxcbiAgICAgICAgJ3RleHQvcGxhaW4nOiAnaWNvbi10ZXh0ZmlsZScsXG4gICAgICAgICdpbWFnZS9wbmcnOiAnaWNvbi1pbWFnZScsXG4gICAgICAgICdpbWFnZS9qcGVnJzogJ2ljb24taW1hZ2UnLFxuICAgICAgICAnYXBwbGljYXRpb24vb2dnJzogJ2ljb24tdmlkZW8nLFxuICAgICAgICAnYXBwbGljYXRpb24vemlwJzogJ2ljb24temlwJyxcbiAgICAgICAgJ2lub2RlL3gtZW1wdHknOiAnaWNvbi10ZXh0ZmlsZSdcbiAgICB9XG4gICAgXG4gICAgZ2V0RmlsZUJyb3dzZXJDb25maWcoX2NvbmZpZyA9IHt9KVxuICAgIHtcbiAgICAgICAgdmFyIGNvbmZpZyA9IF8uZXh0ZW5kKF9jb25maWcsXG4gICAgICAgIHtcbiAgICAgICAgICAgIG9uU2V0UGF0aDogKHBhdGgpPT57XG4gICAgICAgICAgICAgICAgdGhpcy5sc0J5UGF0aChwYXRoLCAoZXJyLCBsaXN0KT0+e1xuICAgICAgICAgICAgICAgICAgICBsaXN0LmZvckVhY2goIChpdGVtKT0+XG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGl0ZW0udHlwZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0udGV4dCA9IGl0ZW0ubmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5pY29uID0gdGhpcy5pY29uTWFwW2l0ZW0udHlwZV1cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5yZW5hbWUgPSAoKG5hbWUpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tdihpdGVtLnBhdGgsIGl0ZW0ucGF0aC5zcGxpdCgnLycpLnNwbGljZSgwLCBpdGVtLnBhdGguc3BsaXQoJy8nKS5sZW5ndGgtMSkuam9pbignLycpKyAnLycrbmFtZSwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnWydvYmplY3QnXS5yZWZyZXNoKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5odHRwLnBvc3QoJy9yZW5hbWUvdWJ1bnR1P3BhdGg9JytpdGVtLnBhdGgrJyZuYW1lPScrbmFtZSwgSlNPTi5zdHJpbmdpZnkoe30pLCBwb3N0T3B0aW9ucykuc3Vic2NyaWJlKHJlcyA9PiB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5tZW51ID0gW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIuaJk+W8gFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5kYmxjbGljaygpICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIuWkjeWItlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29weV9wYXRoID0gaXRlbS5wYXRoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGl0ZW0uZGJjbGljaygpICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIumHjeWRveWQjVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5vYmoucmVuYW1lKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCLliKDpmaRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVyOiAoZXZlbnQpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiggIWNvbmZpcm0oXCLnoa7orqTliKDpmaTvvJ9cIikgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5odHRwLnBvc3QoJy9kZWxldGUvdWJ1bnR1P3BhdGg9JytpdGVtLnBhdGgsIEpTT04uc3RyaW5naWZ5KHt9KSwgcG9zdE9wdGlvbnMpLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnWydvYmplY3QnXS5yZWZyZXNoKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoICFpdGVtLmljb24gKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uaWNvbiA9ICdpY29uLWZpbGUnXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCBpdGVtLnR5cGUgPT09ICdpbm9kZS9kaXJlY3RvcnknICl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5kYmxjbGljayA9ICgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ1snb2JqZWN0J11bJ3NldFBhdGgnXSgocGF0aCA9PT0gJy8nPycnOnBhdGgpICsgJy8nICsgaXRlbS5uYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIC9pbWFnZVxcLyovLnRlc3QoaXRlbS50eXBlKSApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZGJsY2xpY2sgPSAoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUFwcCgncGhvdG8tYnJvd3NlcicsIHRoaXMucGhvdG9Ccm93c2VycywgeyB0aXRsZTogaXRlbS5uYW1lLCB1cmw6ICcvZ2V0RmlsZT91cmw9JytpdGVtLnBhdGgrJyZ0eXBlPScraXRlbS50eXBlIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiggaXRlbS50eXBlID09PSAnYXBwbGljYXRpb24vb2dnJyApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZGJsY2xpY2sgPSAoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUFwcCgndmlkZW8tcGxheWVyJywgdGhpcy52aWRlb1BsYXllciwgeyB1cmw6ICdodHRwOi8vMTI3LjAuMC4xOjgwODgvZ2V0RmlsZT91cmw9JytpdGVtLnBhdGgrJyZ0eXBlPXZpZGVvL29nZycgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCBpdGVtLnR5cGUgPT09ICdhcHBsaWNhdGlvbi96aXAnICl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5tZW51WzBdLnRleHQ9J+ino+WOiydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmRibGNsaWNrID0gKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5odHRwLmdldCgnL3VuemlwL3VidW50dT9wYXRoPScraXRlbS5wYXRoKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ1snb2JqZWN0J10ucmVmcmVzaCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiggaXRlbS50eXBlID09PSAndGV4dC9wbGFpbicgfHwgaXRlbS50eXBlID09PSAnaW5vZGUveC1lbXB0eScgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmRibGNsaWNrID0gKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXQoaXRlbS5wYXRoLCAoZGF0YSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmh0dHAuZ2V0KCcvY2F0L3VidW50dT9wYXRoPScraXRlbS5wYXRoKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlQXBwKCdlZGl0b3InLCB0aGlzLmVkaXRvckxpc3QsIHsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDogZGF0YSwvL3Jlcy5qc29uKCkuYm9keSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGl0ZW0ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblNhdmU6IChzdHIpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCAhL1xcXFxuJC8udGVzdChzdHIpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyKz0nXFxuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmh0dHAucG9zdCgnL3dyaXRlL3VidW50dT9wYXRoPScraXRlbS5wYXRoLCBKU09OLnN0cmluZ2lmeSh7Ym9keTogc3RyfSksIHBvc3RPcHRpb25zKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCByZXMuc3RhdHVzICE9PSAyMDAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KHJlcy5qc29uKCkuZXJyb3IpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBjb25maWcuZmlsZUxpc3QgPSBsaXN0XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmaWxlTGlzdDogW11cbiAgICAgICAgfSlcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBjb25maWdcbiAgICB9XG4gICAgXG4gICAgcGFyc2Uoc3RyKXtcbiAgICAgICAgY29uc29sZS5sb2coJ3N0YXJ0ISEhJylcbiAgICAgICAgdmFyIGxpc3QgPSBzdHIuc3BsaXQoJ1xcbicpXG4gICAgICAgIHZhciBsaXN0MiAsIGxpc3QzID0gW11cbiAgICAgICAgbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pe1xuICAgICAgICAgICAgaWYoIGl0ZW0uaW5kZXhPZignLycpID09PSAwIClcbiAgICAgICAgICAgICAgICBsaXN0MiA9IGxpc3QyIHx8IFtdXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihsaXN0MilcbiAgICAgICAgICAgICAgICBsaXN0Mi5wdXNoKGl0ZW0pXG4gICAgICAgIH0pXG4gICAgICAgIGxpc3QyLnBvcCgpXG4gICAgICAgIFxuICAgICAgICBsaXN0Mi5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KVxuICAgICAgICB7XG4gICAgICAgICAgICBpdGVtID0gaXRlbS5yZXBsYWNlKC8gL2csICcnKVxuICAgICAgICAgICAgaWYoICFpdGVtIClcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHN0ciA9IGl0ZW0uc3BsaXQoJzonKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiggc3RyWzBdLnNwbGl0KCcvJykucG9wKCkgPT09ICcqJyApXG4gICAgICAgICAgICAgICAgcmV0dXJuIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBsaXN0My5wdXNoKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBzdHJbMV0uc3BsaXQoJzsnKVswXSxcbiAgICAgICAgICAgICAgICBuYW1lOiBzdHJbMF0uc3BsaXQoJy8nKS5wb3AoKSxcbiAgICAgICAgICAgICAgICBwYXRoOiBzdHJbMF1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbGlzdDNcbiAgICB9XG4gICAgXG4gICAgc29ja2V0ID0gbnVsbFxuICAgIGNhbGxiYWNrOmFueSA9IG51bGxcbiAgICB0ZXJtX2lkOmFueSBcbiAgICBcbiAgICBscyhuYW1lLCBkb25lKXtcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IChkYXRhKT0+e1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayA9IG51bGxcbiAgICAgICAgICAgIGRvbmUodGhpcy5wYXJzZShkYXRhKSlcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ2RhdGEnK3RoaXMudGVybV9pZCwgJ2ZpbGUgJytuYW1lKycvKiAtLW1pbWUgXFxuJylcbiAgICB9XG4gICAgXG4gICAgY2F0KHBhdGgsIGRvbmUpe1xuICAgICAgICB0aGlzLmNhbGxiYWNrID0gKGRhdGEpPT57XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrID0gbnVsbFxuICAgICAgICAgICAgZGF0YSA9IGRhdGEuc3BsaXQoJ1xcbicpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgICAgICAgZG9uZShkYXRhLnNwbGljZSgxLCBkYXRhLmxlbmd0aC0yKS5qb2luKCdcXG4nKSlcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyggJ2NhdCAnK3BhdGgpXG4gICAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ2RhdGEnK3RoaXMudGVybV9pZCwgJ2NhdCAnK3BhdGgrJyBcXG4nKVxuICAgIH1cbiAgICBcbiAgICBtdihwYXRoLCBuZXdQYXRoLCBkb25lKXtcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IChkYXRhKT0+e1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayA9IG51bGxcbiAgICAgICAgICAgIGRhdGEgPSBkYXRhLnNwbGl0KCdcXG4nKVxuICAgICAgICAgICAgY29uc29sZS5sb2coKVxuICAgICAgICAgICAgZG9uZSgpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICB0aGlzLnNvY2tldC5lbWl0KCdkYXRhJyt0aGlzLnRlcm1faWQsICdtdiAnK3BhdGgrJyAnKyBuZXdQYXRoICsnIFxcbicpXG4gICAgfVxuICAgIFxuICAgIHRvdWNoKHBhdGgsIGRvbmUpe1xuICAgICAgICB0aGlzLmNhbGxiYWNrID0gKGRhdGEpPT57XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrID0gbnVsbFxuICAgICAgICAgICAgZGF0YSA9IGRhdGEuc3BsaXQoJ1xcbicpXG4gICAgICAgICAgICBjb25zb2xlLmxvZygpXG4gICAgICAgICAgICBkb25lKGRhdGEuc3BsaWNlKDEsIGRhdGEubGVuZ3RoLTIpLmpvaW4oJ1xcbicpKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLnNvY2tldC5lbWl0KCdkYXRhJyt0aGlzLnRlcm1faWQsICd0b3VjaCAnK3BhdGgrJyBcXG4nKVxuICAgIH1cbiAgICBcbiAgICBta2RpcihwYXRoLCBkb25lKXtcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IChkYXRhKT0+e1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayA9IG51bGxcbiAgICAgICAgICAgIGRhdGEgPSBkYXRhLnNwbGl0KCdcXG4nKVxuICAgICAgICAgICAgY29uc29sZS5sb2coKVxuICAgICAgICAgICAgZG9uZShkYXRhLnNwbGljZSgxLCBkYXRhLmxlbmd0aC0yKS5qb2luKCdcXG4nKSlcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5zb2NrZXQuZW1pdCgnZGF0YScrdGhpcy50ZXJtX2lkLCAnbWtkaXIgJytwYXRoKycgXFxuJylcbiAgICB9XG4gICAgXG4gICAgY29uc3RydWN0b3IocHVibGljIGh0dHA/OiBIdHRwKXtcbiAgICAgICBcbiAgICAgICAgc2V0VGltZW91dCgoKT0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciB0ZXJtX2lkID0gJ3VidW50dS1jdXFzeCcrJ8KnJysgMTFcbiAgICAgICAgICAgIHRoaXMuc29ja2V0ID0gaW8uY29ubmVjdChcImh0dHA6Ly9cIit3aW5kb3cubG9jYXRpb24uaG9zdClcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5zb2NrZXQuZW1pdCgnY3JlYXRlVGVybWluYWwnLCB0ZXJtX2lkLCAodGVybV9pZCk9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBzdHIgPSAnJ1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMudGVybV9pZCA9IHRlcm1faWRcbiAgICAgICAgICAgICAgICB0aGlzLnNvY2tldC5vbignZGF0YScrdGVybV9pZCwgKGRhdGEpPT57XG4gICAgICAgICAgICAgICAgICAgIHN0ciArPSBkYXRhLnRvU3RyaW5nKCkucmVwbGFjZSgvXFx4MUJcXFsoWzAtOV17MSwyfSg7WzAtOV17MSwyfSk/KT9bbXxLXS9nLCAnJylcbiAgICAgICAgICAgICAgICAgICAgaWYoIC9bXFxkXFx3XSs6XFwvIyQvLnRlc3Qoc3RyLnRyaW0oKSkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFjayAmJiB0aGlzLmNhbGxiYWNrKHN0cilcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ciA9ICcnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sMTAwKVxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIC8vIHNldFRpbWVvdXQoKCk9PiB7XG4gICAgICAgIC8vICAgICB0aGlzLmNhdCgnL2V0Yy9ob3N0cycsIGZ1bmN0aW9uKCl7fSlcbiAgICAgICAgLy8gfSwgMTAwMCk7XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgdmFyIGluZGV4ID0gMVxuICAgICAgICB0aGlzLnNob3J0Y3V0cyA9IFt7XG4gICAgICAgICAgICBpY29uOiAnaWNvbi1jb21wdXRlcicsXG4gICAgICAgICAgICB0ZXh0OiAn6L+Z5Y+w55S16ISRJyxcbiAgICAgICAgICAgIHNoYWRvdzogJ3NoYWRvdycsXG4gICAgICAgICAgICBkYmxjbGljazogKCk9PntcbiAgICAgICAgICAgICAgICB2YXIgY29uZmlnID0ge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+i/meWPsOeUteiEkScsXG4gICAgICAgICAgICAgICAgICAgIHBhdGg6ICcvJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUFwcCgnZmlsZS1icm93c2VyJywgdGhpcy5maWxlQnJvd3NlcnMsIHRoaXMuZ2V0RmlsZUJyb3dzZXJDb25maWcoY29uZmlnKSlcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaWNvbjogJ2ljb24tdXNlcicsIFxuICAgICAgICAgICAgdGV4dDogJ+aIkeeahOaWh+ahoycsXG4gICAgICAgICAgICBzaGFkb3c6ICdzaGFkb3cnLFxuICAgICAgICAgICAgZGJsY2xpY2s6KCk9PntcbiAgICAgICAgICAgICAgICB2YXIgY29uZmlnID0ge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+aIkeeahOaWh+ahoycsXG4gICAgICAgICAgICAgICAgICAgIHBhdGg6ICcvcm9vdCcsXG4gICAgICAgICAgICAgICAgICAgIG1lbnU6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIuaWsOW7ulwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogJ+aWh+S7tuWkuScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlcjogKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ta2Rpcihjb25maWdbJ29iamVjdCddLnBhdGgrJy9OZXdGb2xkZXInLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnWydvYmplY3QnXS5yZWZyZXNoKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5odHRwLnBvc3QoJy9ta2Rpci91YnVudHU/cGF0aD0nKywgSlNPTi5zdHJpbmdpZnkoe30pLCBwb3N0T3B0aW9ucykuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICfmlofmoaMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZXI6ICgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG91Y2goY29uZmlnWydvYmplY3QnXS5wYXRoKycvTmV3RmlsZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maWdbJ29iamVjdCddLnJlZnJlc2goKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmh0dHAucG9zdCgnL3RvdWNoL3VidW50dT9wYXRoPScrY29uZmlnWydvYmplY3QnXS5wYXRoKycvTmV3RmlsZScsIEpTT04uc3RyaW5naWZ5KHt9KSwgcG9zdE9wdGlvbnMpLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgY29uZmlnWydvYmplY3QnXS5yZWZyZXNoKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCLliLfmlrBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKGV2ZW50KSBcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maWdbJ29iamVjdCddLnJlZnJlc2goKSAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIueymOi0tFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlcjogKGV2ZW50KT0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpbGVuYW1lID0gY29weV9wYXRoLnNwbGl0KCcvJykucG9wKCkgKyAnX2NvcHknXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5odHRwLnBvc3QoJy9jcC91YnVudHU/c291cmNlPScrY29weV9wYXRoICsgJyZ0bz0nICsgY29uZmlnWydvYmplY3QnXS5wYXRoICsgJy8nICsgZmlsZW5hbWUsIEpTT04uc3RyaW5naWZ5KHt9KSwgcG9zdE9wdGlvbnMpLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maWdbJ29iamVjdCddLnJlZnJlc2goKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlQXBwKCdmaWxlLWJyb3dzZXInLCB0aGlzLmZpbGVCcm93c2VycywgdGhpcy5nZXRGaWxlQnJvd3NlckNvbmZpZyhjb25maWcpKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpY29uOiAnaWNvbi10ZXJtaW5hbCcsXG4gICAgICAgICAgICB0ZXh0OiAnVGVybWluYWwnLFxuICAgICAgICAgICAgc2hhZG93OiAnc2hhZG93JyxcbiAgICAgICAgICAgIGRibGNsaWNrOiAoKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlQXBwKCd0ZXJtaW5hbCcsIHRoaXMudGVybWluYWxzLCB7IGljb25fY2xhc3M6ICdpY29uLXRlcm1pbmFsJ30pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1dXG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9