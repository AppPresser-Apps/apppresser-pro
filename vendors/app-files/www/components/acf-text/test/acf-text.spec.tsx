import { newSpecPage } from '@stencil/core/testing';
import { AcfText } from '../acf-text';

describe('acf-text', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AcfText],
      html: `<acf-text></acf-text>`,
    });
    expect(page.root).toEqualHtml(`
      <acf-text>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </acf-text>
    `);
  });
});
