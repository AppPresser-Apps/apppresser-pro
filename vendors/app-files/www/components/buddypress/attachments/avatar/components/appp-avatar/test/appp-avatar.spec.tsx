import { newSpecPage } from '@stencil/core/testing';
import { ApppAvatar } from '../appp-avatar';

describe('appp-avatar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ApppAvatar],
      html: `<appp-avatar></appp-avatar>`,
    });
    expect(page.root).toEqualHtml(`
      <appp-avatar>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </appp-avatar>
    `);
  });
});
