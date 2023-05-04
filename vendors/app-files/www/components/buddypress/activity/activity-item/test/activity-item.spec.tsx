import { newSpecPage } from '@stencil/core/testing';
import { ActivityItem } from '../activity-item';

describe('activity-item', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ActivityItem],
      html: `<activity-item></activity-item>`,
    });
    expect(page.root).toEqualHtml(`
      <activity-item>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </activity-item>
    `);
  });
});
