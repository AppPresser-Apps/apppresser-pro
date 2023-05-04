import { newSpecPage } from '@stencil/core/testing';
import { AcfDateTime } from '../acf-date-time';

describe('acf-date-time', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AcfDateTime],
      html: `<acf-date-time></acf-date-time>`,
    });
    expect(page.root).toEqualHtml(`
      <acf-date-time>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </acf-date-time>
    `);
  });
});
