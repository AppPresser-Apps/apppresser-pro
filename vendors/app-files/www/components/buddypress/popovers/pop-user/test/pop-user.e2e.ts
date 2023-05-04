import { newE2EPage } from '@stencil/core/testing';

describe('pop-user', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<pop-user></pop-user>');

    const element = await page.find('pop-user');
    expect(element).toHaveClass('hydrated');
  });
});
