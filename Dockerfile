#========================================
# Ubuntu
#========================================
# FROM qamassive/allpackages
# ADD . /app
# WORKDIR /app
# RUN npm install
# RUN npm run web
FROM ubuntu
ENV LC_ALL C

# No interactive frontend during docker build
ENV DEBIAN_FRONTEND noninteractive
ENV DEBCONF_NONINTERACTIVE_SEEN true

MAINTAINER "Avinash <avinash.eediga@gmail.com>"
RUN apt-get -y update
RUN apt-get install -y -q software-properties-common wget
RUN add-apt-repository -y ppa:mozillateam/firefox-next

#============================================
# Nodejs packages
#============================================
RUN wget -qO- https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs

#============================================
# Chrome, webdriver, JAVA 9, Firefox and Miscellaneous packages
#============================================
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN echo "deb http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google.list
RUN apt-get update -y
RUN apt-get install -y -q \
  firefox \
  google-chrome-stable \
  openjdk-9-jre \
  nodejs \
  x11vnc \
  xvfb \
  xfonts-100dpi \
  xfonts-75dpi \
  xfonts-scalable \
  xfonts-cyrillic

RUN useradd -d /home/seleuser -m seleuser
RUN mkdir -p /home/seleuser/chrome
RUN chown -R seleuser /home/seleuser
RUN chgrp -R seleuser /home/seleuser

ADD ./scripts/ /home/root/scripts
#============================================
# Selenium packages
#============================================
RUN npm install -g \
  selenium-standalone@latest \
  && selenium-standalone install

# RUN selenium-standalone start
# ADD . /app
# WORKDIR /app
# RUN npm i
# RUN npm run web
#============================================
# Exposing ports
#============================================
EXPOSE 4444 5999
ENTRYPOINT ["sh", "/home/root/scripts/start.sh"]
