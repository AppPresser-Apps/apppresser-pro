import { newSpecPage } from '@stencil/core/testing';
import { PopUser } from '../pop-user';

describe('pop-user', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PopUser],
      html: `<pop-user></pop-user>`,
    });
    expect(page.root).toEqualHtml(`
      <pop-user>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </pop-user>
    `);
  });
});
