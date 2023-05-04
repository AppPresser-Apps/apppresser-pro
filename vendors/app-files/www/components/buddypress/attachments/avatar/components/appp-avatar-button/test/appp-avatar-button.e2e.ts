import { newE2EPage } from '@stencil/core/testing';

describe('appp-avatar-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<appp-avatar-button></appp-avatar-button>');

    const element = await page.find('appp-avatar-button');
    expect(element).toHaveClass('hydrated');
  });
});
