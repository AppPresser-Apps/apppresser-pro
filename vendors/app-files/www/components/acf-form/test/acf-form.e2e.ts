import { newE2EPage } from '@stencil/core/testing';

describe('acf-form', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<acf-form></acf-form>');

    const element = await page.find('acf-form');
    expect(element).toHaveClass('hydrated');
  });
});
