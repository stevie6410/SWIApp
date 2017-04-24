import { browser, element, by } from 'protractor';

export class SWIWebAppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('swi-root h1')).getText();
  }
}
