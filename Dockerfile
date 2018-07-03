#========================================
# Ubuntu
#========================================
FROM ubuntu
ENV LC_ALL C

# No interactive frontend during docker build
ENV DEBIAN_FRONTEND noninteractive
ENV DEBCONF_NONINTERACTIVE_SEEN true

LABEL maintainer="Abhi <abhijeet.daspatnaik@massive.co"
RUN apt-get -y update
RUN apt-get install -y -q software-properties-common wget

#==================================================================
# Miscellaneous packages
# Includes minimal runtime used for executing non GUI Java programs
#==================================================================
RUN apt-get update -y
RUN apt-get install -y -q \
  bzip2 \
  ca-certificates \
  openjdk-8-jre-headless \
  curl \
  x11vnc \
  xvfb \
  xfonts-100dpi \
  xfonts-75dpi \
  xfonts-scalable \
  xfonts-cyrillic \
  xclip \
  xsel

#============================================
# Google Chrome
#============================================
# can specify versions by CHROME_VERSION;
#  e.g. google-chrome-stable=53.0.2785.101-1
#       google-chrome-beta=53.0.2785.92-1
#       google-chrome-unstable=54.0.2840.14-1
#       latest (equivalent to google-chrome-stable)
#       google-chrome-beta  (pull latest beta)
#============================================
ARG CHROME_VERSION="google-chrome-stable"
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
  && apt-get update -qqy \
  && apt-get -qqy install \
  ${CHROME_VERSION:-google-chrome-stable} \
  && rm /etc/apt/sources.list.d/google-chrome.list \
  && rm -rf /var/lib/apt/lists/* /var/cache/apt/*

#========================================
# Add normal user who can start selenium
#========================================
RUN useradd -d /home/seleuser -m seleuser
RUN mkdir -p /home/seleuser/chrome
RUN chown -R seleuser /home/seleuser
RUN chgrp -R seleuser /home/seleuser

#============================================
# Nodejs packages
#============================================
RUN wget -qO- https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs
RUN rm -rf /opt/yarn
RUN curl -o- -L https://yarnpkg.com/install.sh | bash

#============================================
# Selenium packages
#============================================
RUN npm install -g \
  selenium-standalone@latest \
  && selenium-standalone install

#============================================
# Exposing ports
#============================================
EXPOSE 4444 5999