import { newE2EPage } from '@stencil/core/testing';

describe('pop-activity', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<pop-activity></pop-activity>');

    const element = await page.find('pop-activity');
    expect(element).toHaveClass('hydrated');
  });
});
