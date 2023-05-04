import { newSpecPage } from '@stencil/core/testing';
import { AppPostForm } from './app-post-form';

describe('app-post-form', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppPostForm],
      html: `<app-post-form></app-post-form>`,
    });
    expect(page.root).toEqualHtml(`
      <app-post-form>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-post-form>
    `);
  });
});
