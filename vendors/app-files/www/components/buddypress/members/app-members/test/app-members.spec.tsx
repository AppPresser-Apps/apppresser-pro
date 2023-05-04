import { newSpecPage } from '@stencil/core/testing';
import { AppMembers } from '../app-members';

describe('app-members', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppMembers],
      html: `<app-members></app-members>`,
    });
    expect(page.root).toEqualHtml(`
      <app-members>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-members>
    `);
  });
});
