import { newE2EPage } from '@stencil/core/testing';

describe('acf-card', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<acf-card></acf-card>');

    const element = await page.find('acf-card');
    expect(element).toHaveClass('hydrated');
  });
});
