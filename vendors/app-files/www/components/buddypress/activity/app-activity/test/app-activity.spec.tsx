import { newSpecPage } from '@stencil/core/testing';
import { AppActivity } from '../app-activity';

describe('app-activity', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppActivity],
      html: `<app-activity></app-activity>`,
    });
    expect(page.root).toEqualHtml(`
      <app-activity>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-activity>
    `);
  });
});
