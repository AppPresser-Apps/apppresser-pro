import { newE2EPage } from '@stencil/core/testing';

describe('app-groups', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-groups></app-groups>');

    const element = await page.find('app-groups');
    expect(element).toHaveClass('hydrated');
  });
});
