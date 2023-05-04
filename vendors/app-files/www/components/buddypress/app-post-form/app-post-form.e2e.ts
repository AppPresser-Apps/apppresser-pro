import { newE2EPage } from '@stencil/core/testing';

describe('app-post-form', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-post-form></app-post-form>');

    const element = await page.find('app-post-form');
    expect(element).toHaveClass('hydrated');
  });
});
