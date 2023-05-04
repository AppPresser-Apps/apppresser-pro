import { newE2EPage } from '@stencil/core/testing';

describe('app-members', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-members></app-members>');

    const element = await page.find('app-members');
    expect(element).toHaveClass('hydrated');
  });
});
