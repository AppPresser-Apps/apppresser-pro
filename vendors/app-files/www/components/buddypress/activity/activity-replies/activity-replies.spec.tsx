import { newSpecPage } from '@stencil/core/testing';
import { ActivityReplies } from './activity-replies';

describe('activity-replies', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ActivityReplies],
      html: `<activity-replies></activity-replies>`,
    });
    expect(page.root).toEqualHtml(`
      <activity-replies>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </activity-replies>
    `);
  });
});
