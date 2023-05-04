import { newE2EPage } from '@stencil/core/testing';

describe('acf-view', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<acf-view></acf-view>');

    const element = await page.find('acf-view');
    expect(element).toHaveClass('hydrated');
  });
});
