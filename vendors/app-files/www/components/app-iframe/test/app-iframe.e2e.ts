import { newE2EPage } from '@stencil/core/testing';

describe('app-iframe', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-iframe></app-iframe>');

    const element = await page.find('app-iframe');
    expect(element).toHaveClass('hydrated');
  });
});
