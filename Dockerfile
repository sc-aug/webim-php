FROM koolob/swoole-docker
EXPOSE 9502
COPY server /root/app
WORKDIR /root/app
CMD sh /root/app/start.sh
