import { newE2EPage } from '@stencil/core/testing';

describe('acf-date-time', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<acf-date-time></acf-date-time>');

    const element = await page.find('acf-date-time');
    expect(element).toHaveClass('hydrated');
  });
});
