// These 128-Bit ID's correspond to the Nordic Semi-conductor 'UART' BLE service which is used by Adafruit and others.
    const UART_SERVICE_UUID = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
    const UART_CHAR_RX_UUID = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';
    const UART_CHAR_TX_UUID = '6e400002-b5a3-f393-e0a9-e50e24dcca9e';
    var connected = false;
    var gattServer = null;
    var uartService = null;
    var writeCharacteristic = null;
    var readCharacteristic = null;
    function handleError(error) {
        log("ERROR:" + error);
    }
    function setupBluetooth() {
        if (navigator.bluetooth == undefined) {
            log('ERROR: Web Bluetooth support not found, please see: https://goo.gl/5p4zNM');
            return;
        }
        if (gattServer != null && gattServer.connected) {
            //disconnect();
        } else {
            log('Connecting...');
            if (readCharacteristic == null) {
                navigator.bluetooth.requestDevice({
                            filters: [{
                                services: [UART_SERVICE_UUID]
                            }]
                        })
                        .then(function (device) {
                            log('> DeviceNAme=' + device.name);
                            log('Connecting to GATT Server...');
                        }).then(function (server) {
                    log('> Found GATT server');
                    gattServer = server;
                    // Get UART service
                }).then(function (service) {
                    log('> Found event service');
                    uartService = service;
                    // Get write characteristic
                }).then(function (characteristic) {
                    log('> Found write characteristic');
                    writeCharacteristic = characteristic;
                    // Get read characteristic
                }).then(function (characteristic) {
                    connected = true;
                    log('> Found read characteristic');
                    readCharacteristic = characteristic;
                    deviceReady();
                    // Listen to device notifications
                    }).then(function () {
                        readCharacteristic.addEventListener('characteristicvaluechanged', function (event) {
                            log('> characteristicvaluechanged = ' + event.target.value + ' [' + event.target.value.byteLength + ']');
                            if (event.target.value.byteLength > 0) {
                                var data = new Uint8Array(event.target.value);
                                log("Recv data: " + data);
                            }
                        });
                    });
                }).catch(handleError);
            }
        }
    }
    function send(data) {
        log("Sending: " + data);
    }
    // These magic hex numbers below conform to the Firmata standard, in a real app you would use
    // a JavaScript Firmata libraries to hide these details.
    // An example of which will be published on www.thebubbleworks.com
    var FIRMATA_PIN13_DIGITAL_OUT_MESSAGE = [0xf4, 0x0d, 0x01];
    var FIRMATA_PIN13_DIGITAL_LOW_MESSAGE = [0x91, 0x00, 0x00];
    var FIRMATA_PIN13_DIGITAL_HIGH_MESSAGE = [0x91, 0x20, 0x00];
    function deviceReady() {     
        send(FIRMATA_PIN13_DIGITAL_OUT_MESSAGE).then( function() {
            send(FIRMATA_PIN13_DIGITAL_LOW_MESSAGE);
    })
        ;
    }
    function ledOnPressed() {
        send(FIRMATA_PIN13_DIGITAL_HIGH_MESSAGE);
    }
    function ledOffPressed() {
        send(FIRMATA_PIN13_DIGITAL_LOW_MESSAGE);
    }



    function log(line) {
        console.log(line);
        previous_text = document.getElementById('consoleTextArea').innerHTML;
        document.getElementById('consoleTextArea').innerHTML = previous_text + line + "\n";
    }
 
