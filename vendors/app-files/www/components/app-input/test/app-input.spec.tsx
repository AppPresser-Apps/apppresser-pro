import { newSpecPage } from '@stencil/core/testing';
import { AppInput } from '../app-input';

describe('app-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppInput],
      html: `<app-input></app-input>`,
    });
    expect(page.root).toEqualHtml(`
      <app-input>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-input>
    `);
  });
});
