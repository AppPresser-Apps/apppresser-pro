import { newE2EPage } from '@stencil/core/testing';

describe('acf-text', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<acf-text></acf-text>');

    const element = await page.find('acf-text');
    expect(element).toHaveClass('hydrated');
  });
});
