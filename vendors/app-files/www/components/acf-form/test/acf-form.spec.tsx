import { newSpecPage } from '@stencil/core/testing';
import { AcfForm } from '../acf-form';

describe('acf-form', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AcfForm],
      html: `<acf-form></acf-form>`,
    });
    expect(page.root).toEqualHtml(`
      <acf-form>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </acf-form>
    `);
  });
});
