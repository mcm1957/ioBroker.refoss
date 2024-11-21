'use strict';

const refossem06 = {
  'A1.Current': {
    http: {
      init_funct: self => self.getElectricity(1, 'current')
    },
    common: {
      name: 'Current',
      type: 'number',
      role: 'value.current',
      read: true,
      write: false,
      def: 0,
      unit: 'A',
    },
  },
  'A1.Power': {
    http: {
      init_funct: self => self.getElectricity(1, 'power')
    },
    common: {
      name: 'Power',
      type: 'number',
      role: 'value.power',
      read: true,
      write: false,
      def: 0,
      unit: 'W',
    },
  },
  'A1.PowerFactor': {
    http: {
      init_funct: self => self.getElectricity(1, 'factor')
    },
    common: {
      name: 'Power Factor',
      type: 'number',
      role: 'value.pf',
      read: true,
      write: false,
      def: 0,
    },
  },
  'A1.Voltage': {
    http: {
      init_funct: self => self.getElectricity(1,'voltage')
    },
    common: {
      name: 'Voltage',
      type: 'number',
      role: 'value.voltage',
      read: true,
      write: false,
      def: 0,
      unit: 'V'
    },
  },
  'A2.Current': {
    http: {
      init_funct: self => self.getElectricity(2,'current')
    },
    common: {
      name: 'Current',
      type: 'number',
      role: 'value.current',
      read: true,
      write: false,
      def: 0,
      unit: 'A',
    },
  },
  'A2.Power': {
    http: {
      init_funct: self => self.getElectricity(2,'power')
    },
    common: {
      name: 'Power',
      type: 'number',
      role: 'value.power',
      read: true,
      write: false,
      def: 0,
      unit: 'W',
    },
  },
  'A2.PowerFactor': {
    http: {
      init_funct: self => self.getElectricity(2, 'factor')
    },
    common: {
      name: 'Power Factor',
      type: 'number',
      role: 'value.pf',
      read: true,
      write: false,
      def: 0,
    },
  },
  'A2.Voltage': {
    http: {
      init_funct: self => self.getElectricity(2, 'voltage')
    },
    common: {
      name: 'Voltage',
      type: 'number',
      role: 'value.voltage',
      read: true,
      write: false,
      def: 0,
      unit: 'V'
    },
  },
}

module.exports = {
  refossem06
}