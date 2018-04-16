FROM openjdk

# OPTIONAL: Install dumb-init (Very handy for easier signal handling of SIGINT/SIGTERM/SIGKILL etc.)
# RUN wget https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64.deb
# RUN dpkg -i dumb-init_*.deb
# ENTRYPOINT ["dumb-init"]
# Ubuntu related
# # ------------

# # FROM ubuntu
# FROM ubuntu

# # Install LXDE and VNC server.
# RUN \
#   apt-get update && \
#   DEBIAN_FRONTEND=noninteractive apt-get install -y lxde-core lxterminal tightvncserver && \
#   rm -rf /var/lib/apt/lists/*
# MAINTAINER avi
# # USER developer
# # ENV HOME /home/developer

# RUN echo deb http://archive.ubuntu.com/ubuntu precise universe > /etc/apt/sources.list.d/universe.list
# RUN apt-get update && apt-get install -y wget git curl zip monit openssh-server git iptables ca-certificates daemon net-tools libfontconfig-dev

# # #Install Oracle JDK 9
# # #--------------------
# RUN echo "# Installing Oracle JDK 8" && \
#      apt-get install -y software-properties-common debconf-utils && \
#      add-apt-repository -y ppa:webupd8team/java && \
#      apt-get update && \
#      echo "oracle-java9-installer shared/accepted-oracle-license-v1-1 select true" |  debconf-set-selections && \
#      apt-get install -y oracle-java9-installer

# # # Node related
# # # ------------

RUN echo "# Installing Nodejs" && \
    curl -sL https://deb.nodesource.com/setup_8.x | bash - && \
    apt-get install nodejs build-essential -y && \
    npm set strict-ssl false && \
    npm install -g npm@latest && \
    npm install -g bower grunt grunt-cli && \
    npm cache clear -f && \
    npm install -g n && \
    n stable

# RUN \
#   wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
#   echo "deb http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google.list && \
#   apt-get update && \
#   apt-get install -y google-chrome-stable && \
#   rm -rf /var/lib/apt/lists/*

ADD . /app
WORKDIR /app

# # Define default command.
# CMD ["bash"]

# # Expose ports.
# EXPOSE 5901 4444
# RUN npm install java
RUN npm install selenium-standalone@latest -g
RUN selenium-standalone install
RUN selenium-standalone start > /dev/null 2>&1 &
RUN npm install
# RUN npm run web
# RUN export uid=1000 gid=1000 && \
#     mkdir -p /home/developer && \
#     echo "developer:x:${uid}:${gid}:Developer,,,:/home/developer:/bin/bash" >> /etc/passwd && \
#     echo "developer:x:${uid}:" >> /etc/group && \
#     echo "developer ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/developer && \
#     chmod 0440 /etc/sudoers.d/developer && \
#     chown ${uid}:${gid} -R /home/developer

# RUN apt-get update && apt-get install -y firefox wget
# RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add -
# RUN echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list
# RUN apt-get update
# RUN apt-get install google-chrome-stable dbus-x11 packagekit-gtk3-module libcanberra-gtk-module -y


# CMD dbus-daemon --system --fork && /usr/bin/firefox
# RUN npm start



# You can specify a custom docker image from Docker Hub as your build environment.
# image: node:8.9.1
# options:
#   docker: true
# pipelines:
#   default:
#     - step:
#         script:
#           - npm install
#           - docker run -d -p 4444:4444 selenium/standalone-chrome
#           - npm start