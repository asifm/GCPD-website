import Vue from 'vue';
import { format } from 'd3-format';

Vue.filter('thousandComma', val => format(',')(val));

Vue.filter('roundUnit', val => Math.round(val));

Vue.filter('removePeriods', str => str.replace(/\./g, ''));
