import { newSpecPage } from '@stencil/core/testing';
import { AcfPopover } from '../acf-popover';

describe('acf-popover', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AcfPopover],
      html: `<acf-popover></acf-popover>`,
    });
    expect(page.root).toEqualHtml(`
      <acf-popover>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </acf-popover>
    `);
  });
});
