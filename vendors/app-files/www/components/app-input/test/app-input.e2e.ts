import { newE2EPage } from '@stencil/core/testing';

describe('app-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-input></app-input>');

    const element = await page.find('app-input');
    expect(element).toHaveClass('hydrated');
  });
});
