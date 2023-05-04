import { newSpecPage } from '@stencil/core/testing';
import { PopActivity } from './pop-activity';

describe('pop-activity', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PopActivity],
      html: `<pop-activity></pop-activity>`,
    });
    expect(page.root).toEqualHtml(`
      <pop-activity>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </pop-activity>
    `);
  });
});
