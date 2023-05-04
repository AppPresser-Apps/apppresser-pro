import { newSpecPage } from '@stencil/core/testing';
import { ModalPop } from '../modal-pop';

describe('modal-pop', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ModalPop],
      html: `<modal-pop></modal-pop>`,
    });
    expect(page.root).toEqualHtml(`
      <modal-pop>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </modal-pop>
    `);
  });
});
