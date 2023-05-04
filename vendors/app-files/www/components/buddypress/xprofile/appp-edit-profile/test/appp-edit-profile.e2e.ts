import { newE2EPage } from '@stencil/core/testing';

describe('appp-edit-profile', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<appp-edit-profile></appp-edit-profile>');

    const element = await page.find('appp-edit-profile');
    expect(element).toHaveClass('hydrated');
  });
});
