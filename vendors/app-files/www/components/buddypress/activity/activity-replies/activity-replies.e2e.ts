import { newE2EPage } from '@stencil/core/testing';

describe('activity-replies', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<activity-replies></activity-replies>');

    const element = await page.find('activity-replies');
    expect(element).toHaveClass('hydrated');
  });
});
