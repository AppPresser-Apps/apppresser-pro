import { newSpecPage } from '@stencil/core/testing';
import { AcfView } from '../acf-view';

describe('acf-view', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AcfView],
      html: `<acf-view></acf-view>`,
    });
    expect(page.root).toEqualHtml(`
      <acf-view>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </acf-view>
    `);
  });
});
