import { newE2EPage } from '@stencil/core/testing';

describe('app-repeater', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-repeater></app-repeater>');

    const element = await page.find('app-repeater');
    expect(element).toHaveClass('hydrated');
  });
});
