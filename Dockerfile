FROM dhub.yunpro.cn/junjun16818/node:4.2.2
MAINTAINER junjun16818
WORKDIR /app
ADD ./package.json /app/
# RUN npm install --production
EXPOSE 8088
ADD . /app
CMD node index.js

