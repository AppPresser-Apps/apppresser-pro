import { newE2EPage } from '@stencil/core/testing';

describe('reply-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<reply-item></reply-item>');

    const element = await page.find('reply-item');
    expect(element).toHaveClass('hydrated');
  });
});
