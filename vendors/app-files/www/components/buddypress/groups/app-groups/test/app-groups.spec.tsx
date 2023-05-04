import { newSpecPage } from '@stencil/core/testing';
import { AppGroups } from '../app-groups';

describe('app-groups', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppGroups],
      html: `<app-groups></app-groups>`,
    });
    expect(page.root).toEqualHtml(`
      <app-groups>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-groups>
    `);
  });
});
