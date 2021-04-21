FROM node:15.3.0-stretch

RUN mkdir -p /project/
RUN mkdir -p /project/minion-server
RUN mkdir -p /project/minion-family

WORKDIR /project/minion-server
RUN git clone https://github.com/SjurWarEagle/minion-server .
RUN npm install
RUN npm run build

WORKDIR /project/minion-family
RUN git clone https://github.com/SjurWarEagle/minion-family .
RUN npm install
RUN npm run build
