import { SWIWebAppPage } from './app.po';

describe('swiweb-app App', () => {
  let page: SWIWebAppPage;

  beforeEach(() => {
    page = new SWIWebAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('swi works!');
  });
});
