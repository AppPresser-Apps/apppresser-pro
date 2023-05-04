import { newE2EPage } from '@stencil/core/testing';

describe('appp-avatar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<appp-avatar></appp-avatar>');

    const element = await page.find('appp-avatar');
    expect(element).toHaveClass('hydrated');
  });
});
