import { AppPage } from './app.po';
import {browser, by, element} from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });
  it('1. Should register a new user', () => {
    page.navigateTo();
    page.register('e2eUser', 'ue2e@rice.edu', '111-111-1111', '06011997', '12345', '123', '123');
    expect(element(by.id('SB')).isEnabled()).toBe(true);
  });

  // 2. Test to log in as realUser, the browser then redirect to /main page
  it('2. Log in as new User', () => {
    page.navigateTo();
    page.login('e2eUser', '123');
    browser.waitForAngular();
    expect(browser.driver.getCurrentUrl()).toMatch('/#/main/e2eUser');
  });
});

describe('ArticlePage test', () => {
  let page: AppPage;
  let original: number;
  let oriHead: any;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
    page.login('e2eUser', '123');

    element.all(by.css('.articles')).count().then(count => {
      original = count;
      element(by.css('.head')).getText().then(text => {
        oriHead = text;
      });
    });
  });
  it('3. Create new article and validate article appears in feed', () => {
    const newArticle = 'post a new article(e2eTest)';
    element(by.css('#post_new')).sendKeys(newArticle);
    element(by.css('#share_new_post')).click();
    expect(element.all(by.css('.articles')).count()).toBe(original + 1);
  });

  it('4. Update headline headline and verify change', () => {
    const newStatus = 'this is e2eTest headline';
    expect(element(by.css('.head')).getText()).toEqual(oriHead);
    element(by.css('.change_headline')).clear();
    element(by.css('.change_headline')).sendKeys(newStatus);
    element(by.css('#change_btn')).click();
    expect(element(by.css('.head')).getText()).toEqual('"this is e2eTest headline"');
  });

  it('5. Log out new user', () => {
    element(by.css('#log_out')).click();
    expect(browser.driver.getCurrentUrl()).toMatch('/#/auth');
  });
});

describe('LandingPage test', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('6. log in as test user', () => {
    page.navigateTo();
    page.login('jf58', '123');
    browser.waitForAngular();
    expect(browser.driver.getCurrentUrl()).toMatch('/#/main/jf58');
  });
});

describe('ArticlePage', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
    page.login('jf58', '123');
  });
  // tslint:disable-next-line:max-line-length
  it('7.Search for a keyword that matches only one of test user\'s articles and verify only one article shows, and verify the author', () => {
    const search = 'this is post4';
    element(by.css('#search_content')).sendKeys(search);
    element(by.css('.search')).click();
    expect(element.all(by.css('.articles')).count()).toBe(1);
    expect(element.all(by.css('.articles')).get(0).all(by.css('#author')).get(0).getText()).toEqual('Author: jf58');
  });

  it('8.  log out as test user', () => {
    element(by.css('#log_out')).click();
    expect(browser.driver.getCurrentUrl()).toMatch('/#/auth');
  });
});
