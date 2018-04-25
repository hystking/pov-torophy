SCRIPT_DIR=`dirname $0`

yarn build

rm -rf $SCRIPT_DIR/dist
rm -rf $SCRIPT_DIR/dist-mac
rm -rf $SCRIPT_DIR/dist-windows32
rm -rf $SCRIPT_DIR/dist-windows64


# yarn dist-windows32
# mv $SCRIPT_DIR/dist $SCRIPT_DIR/dist-windows32

yarn dist-windows64
mv $SCRIPT_DIR/dist $SCRIPT_DIR/dist-windows64

yarn dist-mac
mv $SCRIPT_DIR/dist $SCRIPT_DIR/dist-mac
