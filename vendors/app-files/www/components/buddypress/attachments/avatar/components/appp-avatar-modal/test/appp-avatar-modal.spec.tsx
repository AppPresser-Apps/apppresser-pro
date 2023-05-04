import { newSpecPage } from '@stencil/core/testing';
import { ApppAvatarModal } from '../appp-avatar-modal';

describe('appp-avatar-modal', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ApppAvatarModal],
      html: `<appp-avatar-modal></appp-avatar-modal>`,
    });
    expect(page.root).toEqualHtml(`
      <appp-avatar-modal>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </appp-avatar-modal>
    `);
  });
});
