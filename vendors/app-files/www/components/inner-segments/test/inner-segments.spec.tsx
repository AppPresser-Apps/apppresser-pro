import { newSpecPage } from '@stencil/core/testing';
import { InnerSegments } from '../inner-segments';

describe('inner-segments', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [InnerSegments],
      html: `<inner-segments></inner-segments>`,
    });
    expect(page.root).toEqualHtml(`
      <inner-segments>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </inner-segments>
    `);
  });
});
