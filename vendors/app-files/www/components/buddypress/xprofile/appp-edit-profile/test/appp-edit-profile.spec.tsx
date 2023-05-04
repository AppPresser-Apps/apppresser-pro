import { newSpecPage } from '@stencil/core/testing';
import { ApppEditProfile } from '../appp-edit-profile';

describe('appp-edit-profile', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ApppEditProfile],
      html: `<appp-edit-profile></appp-edit-profile>`,
    });
    expect(page.root).toEqualHtml(`
      <appp-edit-profile>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </appp-edit-profile>
    `);
  });
});
