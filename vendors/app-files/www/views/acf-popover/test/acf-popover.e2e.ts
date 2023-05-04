import { newE2EPage } from '@stencil/core/testing';

describe('acf-popover', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<acf-popover></acf-popover>');

    const element = await page.find('acf-popover');
    expect(element).toHaveClass('hydrated');
  });
});
