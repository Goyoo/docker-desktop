
init:
	boot2docker shellinit > /tmp/s.sh
	sh /tmp/s.sh

build:
	docker build -t junjun16818/docker-desktop:0.3 .

push:
	docker push junjun16818/docker-desktop:0.3

