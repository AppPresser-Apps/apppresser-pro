import { newE2EPage } from '@stencil/core/testing';

describe('activity-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<activity-item></activity-item>');

    const element = await page.find('activity-item');
    expect(element).toHaveClass('hydrated');
  });
});
