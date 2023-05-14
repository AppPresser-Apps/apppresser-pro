import { c as createStore } from './index-7106c220.js';

const { state, onChange } = createStore({
  data: {},
  detail: {},
  api: [],
  preferences: {},
  auth: false,
  biometric: false,
  database: null,
  buddypress: {},
  activity: [],
  activity_item: {},
  transients: {},
  global: {}
});

export { onChange as o, state as s };
