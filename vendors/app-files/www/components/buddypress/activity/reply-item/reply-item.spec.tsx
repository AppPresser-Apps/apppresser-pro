import { newSpecPage } from '@stencil/core/testing';
import { ReplyItem } from './reply-item';

describe('reply-item', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ReplyItem],
      html: `<reply-item></reply-item>`,
    });
    expect(page.root).toEqualHtml(`
      <reply-item>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </reply-item>
    `);
  });
});
