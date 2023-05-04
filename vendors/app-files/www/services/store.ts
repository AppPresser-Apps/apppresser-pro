import { createStore } from "@stencil/store";

export const { state, onChange } = createStore({
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
