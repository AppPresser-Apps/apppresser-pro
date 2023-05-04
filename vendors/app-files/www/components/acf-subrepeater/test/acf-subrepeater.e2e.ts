import { newE2EPage } from '@stencil/core/testing';

describe('acf-subrepeater', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<acf-subrepeater></acf-subrepeater>');

    const element = await page.find('acf-subrepeater');
    expect(element).toHaveClass('hydrated');
  });
});
