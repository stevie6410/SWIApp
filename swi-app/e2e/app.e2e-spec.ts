import { SwiAppPage } from './app.po';

describe('swi-app App', () => {
  let page: SwiAppPage;

  beforeEach(() => {
    page = new SwiAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
