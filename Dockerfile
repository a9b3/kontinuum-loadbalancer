FROM ubuntu

MAINTAINER Sam L. <esayemm@gmail.com>

# Install programs
RUN apt-get update
RUN apt-get install -y nginx
RUN apt-get install nodejs
RUN apt-get install npm

EXPOSE 80

CMD service nginx start
