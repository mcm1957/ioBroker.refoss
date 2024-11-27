'use strict';

/**
* Millivolt to volt / Milliampere to ampere / Milliwatt to watt
* @param {number}  electricity
*/
function getNumFormate(electricity) {
  return Math.round((electricity * 100) / 1000) / 100
}
/**
* Generate a random 16/32 byte string
* @param {number}  len
*/
function getRandomString(len) {
  len = len || 32
  var $chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  var maxPos = $chars.length;
  var rand = '';
  for (let i = 0; i < len; i++) {
    rand += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return rand;
}

/**
* Get the current timestamp
*/
function getTimestampNow() {
  return Math.round(new Date().getTime() / 1000).toString()
}

module.exports = {
  getNumFormate,
  getRandomString,
  getTimestampNow
}