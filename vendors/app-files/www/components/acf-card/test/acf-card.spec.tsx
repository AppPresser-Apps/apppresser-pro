import { newSpecPage } from '@stencil/core/testing';
import { AcfCard } from '../acf-card';

describe('acf-card', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AcfCard],
      html: `<acf-card></acf-card>`,
    });
    expect(page.root).toEqualHtml(`
      <acf-card>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </acf-card>
    `);
  });
});
