'use strict';

const refossem06 = {
    'A1.Current': {
        http: {
            http_namespace: 'Appliance.Control.ElectricityX',
            http_payload: {
                electricity: [
                    {
                        channel: 0xffff,
                    },
                ],
            },
            http_get_ack: 'electricity',
            init_funct: self => self.getElectricity(1, 'current'),
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
            http_namespace: 'Appliance.Control.ElectricityX',
            http_payload: {
                electricity: [
                    {
                        channel: 0xffff,
                    },
                ],
            },
            http_get_ack: 'electricity',
            init_funct: self => self.getElectricity(1, 'power'),
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
            http_namespace: 'Appliance.Control.ElectricityX',
            http_payload: {
                electricity: [
                    {
                        channel: 0xffff,
                    },
                ],
            },
            http_get_ack: 'electricity',
            init_funct: self => self.getElectricity(1, 'factor'),
        },
        common: {
            name: 'Power Factor',
            type: 'number',
            role: 'value',
            read: true,
            write: false,
            def: 0,
        },
    },
    'A1.Voltage': {
        http: {
            http_namespace: 'Appliance.Control.ElectricityX',
            http_payload: {
                electricity: [
                    {
                        channel: 0xffff,
                    },
                ],
            },
            http_get_ack: 'electricity',
            init_funct: self => self.getElectricity(1, 'voltage'),
        },
        common: {
            name: 'Voltage',
            type: 'number',
            role: 'value.voltage',
            read: true,
            write: false,
            def: 0,
            unit: 'V',
        },
    },
    'A1.ThisMonthEnergy': {
        http: {
            http_namespace: 'Appliance.Control.ElectricityX',
            http_payload: {
                electricity: [
                    {
                        channel: 0xffff,
                    },
                ],
            },
            http_get_ack: 'electricity',
            init_funct: self => self.getElectricity(1, 'mConsume'),
        },
        common: {
            name: 'This Month Energy',
            type: 'number',
            role: 'value.energy',
            read: true,
            write: false,
            def: 0,
            unit: 'kWh',
        },
    },
    'A1.ThisMonthEnergyReturned': {
        http: {
            http_namespace: 'Appliance.Control.ElectricityX',
            http_payload: {
                electricity: [
                    {
                        channel: 0xffff,
                    },
                ],
            },
            http_get_ack: 'electricity',
            init_funct: self => self.getElectricity(1, 'mConsumeRe'),
        },
        common: {
            name: 'This Month Energy Returned',
            type: 'number',
            role: 'value.energy',
            read: true,
            write: false,
            def: 0,
            unit: 'kWh',
        },
    },
    'A2.Current': {
        http: {
            http_namespace: 'Appliance.Control.ElectricityX',
            http_payload: {
                electricity: [
                    {
                        channel: 0xffff,
                    },
                ],
            },
            http_get_ack: 'electricity',
            init_funct: self => self.getElectricity(2, 'current'),
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
            http_namespace: 'Appliance.Control.ElectricityX',
            http_payload: {
                electricity: [
                    {
                        channel: 0xffff,
                    },
                ],
            },
            http_get_ack: 'electricity',
            init_funct: self => self.getElectricity(2, 'power'),
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
            http_namespace: 'Appliance.Control.ElectricityX',
            http_payload: {
                electricity: [
                    {
                        channel: 0xffff,
                    },
                ],
            },
            http_get_ack: 'electricity',
            init_funct: self => self.getElectricity(2, 'factor'),
        },
        common: {
            name: 'Power Factor',
            type: 'number',
            role: 'value',
            read: true,
            write: false,
            def: 0,
        },
    },
    'A2.Voltage': {
        http: {
            http_namespace: 'Appliance.Control.ElectricityX',
            http_payload: {
                electricity: [
                    {
                        channel: 0xffff,
                    },
                ],
            },
            http_get_ack: 'electricity',
            init_funct: self => self.getElectricity(2, 'voltage'),
        },
        common: {
            name: 'Voltage',
            type: 'number',
            role: 'value.voltage',
            read: true,
            write: false,
            def: 0,
            unit: 'V',
        },
    },
    'A2.ThisMonthEnergy': {
        http: {
            http_namespace: 'Appliance.Control.ElectricityX',
            http_payload: {
                electricity: [
                    {
                        channel: 0xffff,
                    },
                ],
            },
            http_get_ack: 'electricity',
            init_funct: self => self.getElectricity(2, 'mConsume'),
        },
        common: {
            name: 'This Month Energy',
            type: 'number',
            role: 'value.energy',
            read: true,
            write: false,
            def: 0,
            unit: 'kWh',
        },
    },
    'A2.ThisMonthEnergyReturned': {
        http: {
            http_namespace: 'Appliance.Control.ElectricityX',
            http_payload: {
                electricity: [
                    {
                        channel: 0xffff,
                    },
                ],
            },
            http_get_ack: 'electricity',
            init_funct: self => self.getElectricity(2, 'mConsumeRe'),
        },
        common: {
            name: 'This Month Energy Returned',
            type: 'number',
            role: 'value.energy',
            read: true,
            write: false,
            def: 0,
            unit: 'kWh',
        },
    },
    'B1.Current': {
        http: {
            http_namespace: 'Appliance.Control.ElectricityX',
            http_payload: {
                electricity: [
                    {
                        channel: 0xffff,
                    },
                ],
            },
            http_get_ack: 'electricity',
            init_funct: self => self.getElectricity(3, 'current'),
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
    'B1.Power': {
        http: {
            http_namespace: 'Appliance.Control.ElectricityX',
            http_payload: {
                electricity: [
                    {
                        channel: 0xffff,
                    },
                ],
            },
            http_get_ack: 'electricity',
            init_funct: self => self.getElectricity(3, 'power'),
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
    'B1.PowerFactor': {
        http: {
            http_namespace: 'Appliance.Control.ElectricityX',
            http_payload: {
                electricity: [
                    {
                        channel: 0xffff,
                    },
                ],
            },
            http_get_ack: 'electricity',
            init_funct: self => self.getElectricity(3, 'factor'),
        },
        common: {
            name: 'Power Factor',
            type: 'number',
            role: 'value',
            read: true,
            write: false,
            def: 0,
        },
    },
    'B1.Voltage': {
        http: {
            http_namespace: 'Appliance.Control.ElectricityX',
            http_payload: {
                electricity: [
                    {
                        channel: 0xffff,
                    },
                ],
            },
            http_get_ack: 'electricity',
            init_funct: self => self.getElectricity(3, 'voltage'),
        },
        common: {
            name: 'Voltage',
            type: 'number',
            role: 'value.voltage',
            read: true,
            write: false,
            def: 0,
            unit: 'V',
        },
    },
    'B1.ThisMonthEnergy': {
        http: {
            http_namespace: 'Appliance.Control.ElectricityX',
            http_payload: {
                electricity: [
                    {
                        channel: 0xffff,
                    },
                ],
            },
            http_get_ack: 'electricity',
            init_funct: self => self.getElectricity(3, 'mConsume'),
        },
        common: {
            name: 'This Month Energy',
            type: 'number',
            role: 'value.energy',
            read: true,
            write: false,
            def: 0,
            unit: 'kWh',
        },
    },
    'B1.ThisMonthEnergyReturned': {
        http: {
            http_namespace: 'Appliance.Control.ElectricityX',
            http_payload: {
                electricity: [
                    {
                        channel: 0xffff,
                    },
                ],
            },
            http_get_ack: 'electricity',
            init_funct: self => self.getElectricity(3, 'mConsumeRe'),
        },
        common: {
            name: 'This Month Energy Returned',
            type: 'number',
            role: 'value.energy',
            read: true,
            write: false,
            def: 0,
            unit: 'kWh',
        },
    },
    'B2.Current': {
        http: {
            http_namespace: 'Appliance.Control.ElectricityX',
            http_payload: {
                electricity: [
                    {
                        channel: 0xffff,
                    },
                ],
            },
            http_get_ack: 'electricity',
            init_funct: self => self.getElectricity(4, 'current'),
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
    'B2.Power': {
        http: {
            http_namespace: 'Appliance.Control.ElectricityX',
            http_payload: {
                electricity: [
                    {
                        channel: 0xffff,
                    },
                ],
            },
            http_get_ack: 'electricity',
            init_funct: self => self.getElectricity(4, 'power'),
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
    'B2.PowerFactor': {
        http: {
            http_namespace: 'Appliance.Control.ElectricityX',
            http_payload: {
                electricity: [
                    {
                        channel: 0xffff,
                    },
                ],
            },
            http_get_ack: 'electricity',
            init_funct: self => self.getElectricity(4, 'factor'),
        },
        common: {
            name: 'Power Factor',
            type: 'number',
            role: 'value',
            read: true,
            write: false,
            def: 0,
        },
    },
    'B2.Voltage': {
        http: {
            http_namespace: 'Appliance.Control.ElectricityX',
            http_payload: {
                electricity: [
                    {
                        channel: 0xffff,
                    },
                ],
            },
            http_get_ack: 'electricity',
            init_funct: self => self.getElectricity(4, 'voltage'),
        },
        common: {
            name: 'Voltage',
            type: 'number',
            role: 'value.voltage',
            read: true,
            write: false,
            def: 0,
            unit: 'V',
        },
    },
    'B2.ThisMonthEnergy': {
        http: {
            http_namespace: 'Appliance.Control.ElectricityX',
            http_payload: {
                electricity: [
                    {
                        channel: 0xffff,
                    },
                ],
            },
            http_get_ack: 'electricity',
            init_funct: self => self.getElectricity(4, 'mConsume'),
        },
        common: {
            name: 'This Month Energy',
            type: 'number',
            role: 'value.energy',
            read: true,
            write: false,
            def: 0,
            unit: 'kWh',
        },
    },
    'B2.ThisMonthEnergyReturned': {
        http: {
            http_namespace: 'Appliance.Control.ElectricityX',
            http_payload: {
                electricity: [
                    {
                        channel: 0xffff,
                    },
                ],
            },
            http_get_ack: 'electricity',
            init_funct: self => self.getElectricity(4, 'mConsumeRe'),
        },
        common: {
            name: 'This Month Energy Returned',
            type: 'number',
            role: 'value.energy',
            read: true,
            write: false,
            def: 0,
            unit: 'kWh',
        },
    },
    'C1.Current': {
        http: {
            http_namespace: 'Appliance.Control.ElectricityX',
            http_payload: {
                electricity: [
                    {
                        channel: 0xffff,
                    },
                ],
            },
            http_get_ack: 'electricity',
            init_funct: self => self.getElectricity(5, 'current'),
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
    'C1.Power': {
        http: {
            http_namespace: 'Appliance.Control.ElectricityX',
            http_payload: {
                electricity: [
                    {
                        channel: 0xffff,
                    },
                ],
            },
            http_get_ack: 'electricity',
            init_funct: self => self.getElectricity(5, 'power'),
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
    'C1.PowerFactor': {
        http: {
            http_namespace: 'Appliance.Control.ElectricityX',
            http_payload: {
                electricity: [
                    {
                        channel: 0xffff,
                    },
                ],
            },
            http_get_ack: 'electricity',
            init_funct: self => self.getElectricity(5, 'factor'),
        },
        common: {
            name: 'Power Factor',
            type: 'number',
            role: 'value',
            read: true,
            write: false,
            def: 0,
        },
    },
    'C1.Voltage': {
        http: {
            http_namespace: 'Appliance.Control.ElectricityX',
            http_payload: {
                electricity: [
                    {
                        channel: 0xffff,
                    },
                ],
            },
            http_get_ack: 'electricity',
            init_funct: self => self.getElectricity(5, 'voltage'),
        },
        common: {
            name: 'Voltage',
            type: 'number',
            role: 'value.voltage',
            read: true,
            write: false,
            def: 0,
            unit: 'V',
        },
    },
    'C1.ThisMonthEnergy': {
        http: {
            http_namespace: 'Appliance.Control.ElectricityX',
            http_payload: {
                electricity: [
                    {
                        channel: 0xffff,
                    },
                ],
            },
            http_get_ack: 'electricity',
            init_funct: self => self.getElectricity(5, 'mConsume'),
        },
        common: {
            name: 'This Month Energy',
            type: 'number',
            role: 'value.energy',
            read: true,
            write: false,
            def: 0,
            unit: 'kWh',
        },
    },
    'C1.ThisMonthEnergyReturned': {
        http: {
            http_namespace: 'Appliance.Control.ElectricityX',
            http_payload: {
                electricity: [
                    {
                        channel: 0xffff,
                    },
                ],
            },
            http_get_ack: 'electricity',
            init_funct: self => self.getElectricity(5, 'mConsumeRe'),
        },
        common: {
            name: 'This Month Energy Returned',
            type: 'number',
            role: 'value.energy',
            read: true,
            write: false,
            def: 0,
            unit: 'kWh',
        },
    },
    'C2.Current': {
        http: {
            http_namespace: 'Appliance.Control.ElectricityX',
            http_payload: {
                electricity: [
                    {
                        channel: 0xffff,
                    },
                ],
            },
            http_get_ack: 'electricity',
            init_funct: self => self.getElectricity(6, 'current'),
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
    'C2.Power': {
        http: {
            http_namespace: 'Appliance.Control.ElectricityX',
            http_payload: {
                electricity: [
                    {
                        channel: 0xffff,
                    },
                ],
            },
            http_get_ack: 'electricity',
            init_funct: self => self.getElectricity(6, 'power'),
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
    'C2.PowerFactor': {
        http: {
            http_namespace: 'Appliance.Control.ElectricityX',
            http_payload: {
                electricity: [
                    {
                        channel: 0xffff,
                    },
                ],
            },
            http_get_ack: 'electricity',
            init_funct: self => self.getElectricity(6, 'factor'),
        },
        common: {
            name: 'Power Factor',
            type: 'number',
            role: 'value',
            read: true,
            write: false,
            def: 0,
        },
    },
    'C2.Voltage': {
        http: {
            http_namespace: 'Appliance.Control.ElectricityX',
            http_payload: {
                electricity: [
                    {
                        channel: 0xffff,
                    },
                ],
            },
            http_get_ack: 'electricity',
            init_funct: self => self.getElectricity(6, 'voltage'),
        },
        common: {
            name: 'Voltage',
            type: 'number',
            role: 'value.voltage',
            read: true,
            write: false,
            def: 0,
            unit: 'V',
        },
    },
    'C2.ThisMonthEnergy': {
        http: {
            http_namespace: 'Appliance.Control.ElectricityX',
            http_payload: {
                electricity: [
                    {
                        channel: 0xffff,
                    },
                ],
            },
            http_get_ack: 'electricity',
            init_funct: self => self.getElectricity(6, 'mConsume'),
        },
        common: {
            name: 'This Month Energy',
            type: 'number',
            role: 'value.energy',
            read: true,
            write: false,
            def: 0,
            unit: 'kWh',
        },
    },
    'C2.ThisMonthEnergyReturned': {
        http: {
            http_namespace: 'Appliance.Control.ElectricityX',
            http_payload: {
                electricity: [
                    {
                        channel: 0xffff,
                    },
                ],
            },
            http_get_ack: 'electricity',
            init_funct: self => self.getElectricity(6, 'mConsumeRe'),
        },
        common: {
            name: 'This Month Energy Returned',
            type: 'number',
            role: 'value.energy',
            read: true,
            write: false,
            def: 0,
            unit: 'kWh',
        },
    },
};

module.exports = {
    refossem06,
};
