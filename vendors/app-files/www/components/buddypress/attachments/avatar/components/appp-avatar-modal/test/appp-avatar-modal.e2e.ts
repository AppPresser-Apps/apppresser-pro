import { newE2EPage } from '@stencil/core/testing';

describe('appp-avatar-modal', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<appp-avatar-modal></appp-avatar-modal>');

    const element = await page.find('appp-avatar-modal');
    expect(element).toHaveClass('hydrated');
  });
});
