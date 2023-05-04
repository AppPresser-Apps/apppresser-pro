import { newE2EPage } from '@stencil/core/testing';

describe('app-activity', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-activity></app-activity>');

    const element = await page.find('app-activity');
    expect(element).toHaveClass('hydrated');
  });
});
