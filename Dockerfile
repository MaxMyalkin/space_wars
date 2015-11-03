FROM centos
MAINTAINER Maxim Myalkin, Sergey Chernobrovkin

ENV LC_ALL="en_US.UTF-8"
ENV LANG="en_US.UTF-8"

RUN yum install -y epel-release
RUN yum install -y nodejs npm ruby mongodb-server mongodb supervisor
RUN gem install sass
RUN npm install -g grunt-cli

RUN mkdir -p /opt/space_wars
RUN mkdir -p /data/db

COPY . /opt/space_wars
RUN cd /opt/space_wars && npm i

WORKDIR /opt/space_wars
EXPOSE 8000
ENTRYPOINT ["/usr/bin/supervisord", "-c", "/opt/space_wars/supervisor.conf"]
