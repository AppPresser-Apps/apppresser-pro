import { newSpecPage } from '@stencil/core/testing';
import { AcfSubrepeater } from '../acf-subrepeater';

describe('acf-subrepeater', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AcfSubrepeater],
      html: `<acf-subrepeater></acf-subrepeater>`,
    });
    expect(page.root).toEqualHtml(`
      <acf-subrepeater>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </acf-subrepeater>
    `);
  });
});
