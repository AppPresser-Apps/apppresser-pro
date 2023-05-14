import { c as createStore } from './index-7106c220.js';

const { state, onChange } = createStore({
  attachments: [],
});
onChange('attachments', value => {
  console.log('attachments data changed', value);
});
const AttachmentStore = state;
const AttachmentStoreChange = onChange;

export { AttachmentStore as A };
