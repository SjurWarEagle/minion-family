FROM node:15.3.0-stretch

RUN apt update -y && \
    apt install -y --no-install-recommends --no-install-suggests \
    nginx \
    ca-certificates &&\
    rm -rf /var/cache/apt/ &&\
    rm -rf /var/lib/apt/lists/*

RUN mkdir -p /project/
RUN mkdir -p /project/minion-server
RUN mkdir -p /project/minion-family

WORKDIR /project/minion-server
RUN git clone https://github.com/SjurWarEagle/minion-server .
RUN npm install --no-audi && \
    npm run build

WORKDIR /project/minion-family
RUN git clone https://github.com/SjurWarEagle/minion-family .
RUN npm install --no-audi && \
    npm run build" && \
    rm -r node_modules

#TODO convert to copy, this is im this git we just cloned, no need to get it from outside
ADD Docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /etc/apt/apt.conf.d/90nginx

#EXPOSE 90

STOPSIGNAL SIGTERM

ADD Docker/start.sh /
RUN chmod +x /start.sh

CMD ["/start.sh"]


