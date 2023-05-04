import { newE2EPage } from '@stencil/core/testing';

describe('inner-segments', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<inner-segments></inner-segments>');

    const element = await page.find('inner-segments');
    expect(element).toHaveClass('hydrated');
  });
});
