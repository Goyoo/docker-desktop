# Hack Day 参赛作品 docker desktop 基于浏览器的图形操作系统

##实现的功能

1、 上传文件

2、 操作文件系统

3、 操作终端

4、 打开文本文件

5、 预览pdf文件

6、 预览图片


##运行 
```
docker run -it -p 8088:8088 --env DOCKER_HOST=127.0.0.1:2376 -v /usr/local/bin/docker:/usr/local/bin/docker junjun16818/docker-desktop:1.0
```


