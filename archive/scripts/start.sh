export DISPLAY=:99
Xvfb :99 -shmem -screen 0 1366x768x16 &
x11vnc -ncache_cr -noxdamage -noprimary -passwd secret -display :99 -N -forever & yarn run --suite accounts
# google-chrome-stable --remote-debugging-port=9222 &
# selenium must be started by a non-root user otherwise chrome can't start
#su - seleuser -c "selenium-standalone start &"