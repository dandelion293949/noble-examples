'use strict';

const noble = require('noble');
const knownDevices = {};
const limit = -60;

//discovered BLE device
const discovered = (peripheral) => {
    const device = {
        name: peripheral.advertisement.localName,
        uuid: peripheral.uuid,
        rssi: peripheral.rssi,
        status: peripheral.rssi > limit ? 'in' : 'out',
        time: Date.now()
    };

    if (knownDevices[device.uuid]) {
      const oldDevice = knownDevices[device.uuid];
      if (device.status != oldDevice.status) {
        knownDevices[device.uuid] = device;
      } else {
        knownDevices[device.uuid] = device;
        return;
      }
    } else {
      if (device.status === 'in') {
        knownDevices[device.uuid] = device;
      } else {
        return;
      }
    }
    const now = new Date(device.time).toString();
    console.log(`${now} ${JSON.stringify(device)}`);

}

//BLE scan start
const scanStart = () => {
    console.log(`Scanning now...  rssi threshold ${limit}`);
    noble.startScanning();
    noble.on('discover', discovered);
    setInterval(() => {
      noble.stopScanning();
      for(let key in knownDevices) {
        const oldDeviceInfo = knownDevices[key];
        // ステータスがInでスキャンされてから3分以上、スキャンされていない場合はステータスをOutに変更する
        const limitTime = oldDeviceInfo.time + (1000*3);
        if (limitTime < Date.now()) {
          const device = {
            name: oldDeviceInfo.name,
            uuid: oldDeviceInfo.uuid,
            rssi: -100,
            status: 'out',
            time: Date.now()
          };
          const now = new Date(device.time).toString();
          console.log(`${now} ${JSON.stringify(device)}`);
          delete knownDevices[key];
        }
      }
      noble.startScanning();
    }, 500);
}

if (noble.state === 'poweredOn') {
    scanStart();
} else {
    noble.on('stateChange', scanStart);
}
