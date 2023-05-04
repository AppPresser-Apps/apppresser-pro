import { newSpecPage } from '@stencil/core/testing';
import { AppRepeater } from '../app-repeater';

describe('app-repeater', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppRepeater],
      html: `<app-repeater></app-repeater>`,
    });
    expect(page.root).toEqualHtml(`
      <app-repeater>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-repeater>
    `);
  });
});
