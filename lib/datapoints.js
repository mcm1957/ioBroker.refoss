'use strict';

const refossdefaults = require('./devices/default').refossdefaults;
const refossem06 = require('./devices/refossem06').refossem06;

const devices = {
  refossem06
}

const deviceTypes = ['em06']
function getDeviceByClass() {
  return {...devices.refossem06, ...refossdefaults}
}

function getDeviceTypeByClass(deviceClass) {
  return deviceTypes.includes(deviceClass);
}

module.exports = {
  getDeviceByClass,
  getDeviceTypeByClass
};