#========================================
# Ubuntu
#========================================
FROM ubuntu
ENV LC_ALL C

# No interactive frontend during docker build
ENV DEBIAN_FRONTEND noninteractive
ENV DEBCONF_NONINTERACTIVE_SEEN true

LABEL maintainer="Avinash <avinash.eediga@gmail.com>"
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
ARG CHROME_VERSION="google-chrome-stable"
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
  && apt-get update -qqy \
  && apt-get -qqy install \
  ${CHROME_VERSION:-google-chrome-stable} \
  && rm /etc/apt/sources.list.d/google-chrome.list \
  && rm -rf /var/lib/apt/lists/* /var/cache/apt/*

# RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
# RUN echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google.list
RUN apt-get update -y
RUN apt-get install -y -q \
  firefox \
  google-chrome-stable \
  openjdk-8-jre \
  nodejs \
  curl \
  net-tools \
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
RUN apt-get install zip unzip

RUN rm -rf /opt/yarn
RUN curl -o- -L https://yarnpkg.com/install.sh | bash

COPY ./scripts/ /home/root/scripts

# ADD . /app
# WORKDIR /app

# #============================================
# # Selenium packages
# #============================================
RUN npm install -g \
  selenium-standalone@latest \
  && selenium-standalone install

#============================================
# Exposing ports
#============================================
EXPOSE 4444 5999
# ENTRYPOINT ["sh","/home/root/scripts/start.sh"]