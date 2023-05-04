import { newE2EPage } from '@stencil/core/testing';

describe('modal-pop', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<modal-pop></modal-pop>');

    const element = await page.find('modal-pop');
    expect(element).toHaveClass('hydrated');
  });
});
