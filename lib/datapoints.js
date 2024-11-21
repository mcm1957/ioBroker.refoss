'use strict';

const refossdefaults = require('./devices/default').refossdefaults;
const refossem06 = require('./devices/refossem06').refossem06;

const devices = {
  refossem06
}
function getDeviceByClass() {
  return {...devices.refossem06, ...refossdefaults}
}

module.exports = {
  getDeviceByClass
};