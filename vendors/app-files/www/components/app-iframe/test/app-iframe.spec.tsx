import { newSpecPage } from '@stencil/core/testing';
import { AppIframe } from '../app-iframe';

describe('app-iframe', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppIframe],
      html: `<app-iframe></app-iframe>`,
    });
    expect(page.root).toEqualHtml(`
      <app-iframe>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-iframe>
    `);
  });
});
