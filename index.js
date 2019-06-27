   // These 128-Bit ID's correspond to the Nordic Semi-conductor 'UART' BLE service which is used by Adafruit and others.
    var UART_SERVICE_UUID = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
    var UART_CHAR_RX_UUID = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';
    var UART_CHAR_TX_UUID = '6e400002-b5a3-f393-e0a9-e50e24dcca9e';

    function onButtonClick() {

  log('Requesting Bluetooth Device...');
  navigator.bluetooth.requestDevice({filters: [{services: [UART_SERVICE_UUID]}]})
  .then(device => {
    log('Connecting to GATT Server...');
    return device.gatt.connect();
  })
  .then(server => {
    log('Getting Service...');
    return server.getPrimaryService(UART_SERVICE_UUID);
  })
  .then(service => {
    log('Getting Characteristic...');
    return service.getCharacteristic(UART_CHAR_RX_UUID);
  })
  .then(characteristic => {
    log('> Characteristic UUID:  ' + characteristic.uuid);
    log('> Broadcast:            ' + characteristic.properties.broadcast);
    log('> Read:                 ' + characteristic.properties.read);
    log('> Write w/o response:   ' +
      characteristic.properties.writeWithoutResponse);
    log('> Write:                ' + characteristic.properties.write);
    log('> Notify:               ' + characteristic.properties.notify);
    log('> Indicate:             ' + characteristic.properties.indicate);
    log('> Signed Write:         ' +
      characteristic.properties.authenticatedSignedWrites);
    log('> Queued Write:         ' + characteristic.properties.reliableWrite);
    log('> Writable Auxiliaries: ' +
      characteristic.properties.writableAuxiliaries);
  })
  .catch(error => {
    log('Argh! ' + error);
  });
}









        function log(line) {
        console.log(line);
        previous_text = document.getElementById('consoleTextArea').innerHTML;
        document.getElementById('consoleTextArea').innerHTML = previous_text + line + "\n";
    }

 
