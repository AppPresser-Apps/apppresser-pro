import { newSpecPage } from '@stencil/core/testing';
import { ApppAvatarButton } from '../appp-avatar-button';

describe('appp-avatar-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ApppAvatarButton],
      html: `<appp-avatar-button></appp-avatar-button>`,
    });
    expect(page.root).toEqualHtml(`
      <appp-avatar-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </appp-avatar-button>
    `);
  });
});
