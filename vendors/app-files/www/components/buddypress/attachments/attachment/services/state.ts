import { createStore } from "@stencil/store";

const { state, onChange } = createStore({
  attachments: [],
});

onChange('attachments', value => {
    console.log('attachments data changed', value);
});

export const AttachmentStore = state;
export const AttachmentStoreChange = onChange;
