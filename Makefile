
init:
	boot2docker shellinit > /tmp/s.sh
	sh /tmp/s.sh

build:
	docker build -t dhub.yunpro.cn/junjun16818/docker-desktop:1.0 .

push:
	docker push dhub.yunpro.cn/junjun16818/docker-desktop:1.0

