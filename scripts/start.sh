# export DISPLAY=:99
# Xvfb :99 -shmem -screen 0 1366x768x16 &
# x11vnc -passwd secret -display :99 -N -forever &
# # google-chrome-stable --remote-debugging-port=9222 &
# # selenium must be started by a non-root user otherwise chrome can't start
# su - seleuser -c "selenium-standalone start &"



#NEW
source /functions.sh

export GEOMETRY="$SCREEN_WIDTH""x""$SCREEN_HEIGHT""x""$SCREEN_DEPTH"

rm -f /tmp/.X*lock

SERVERNUM=$(get_server_num)
xvfb-run -n $SERVERNUM --server-args="-screen 0 $GEOMETRY -ac +extension RANDR" &

su - seluser -c "selenium-standalone start &"