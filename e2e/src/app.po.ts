import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/#/auth');
  }

  navigateToMain() {
    return browser.get('/#/main');
  }
  // Function to regist a new user
  register(username, email, phone, dob, zipcode, password, repwd) {
    element(by.css('input[id=AN]')).sendKeys(username);
    browser.sleep(400);
    element(by.css('input[id=EA]')).sendKeys(email);
    browser.sleep(400);
    element(by.css('input[id=PN]')).sendKeys(phone);
    browser.sleep(400);
    element(by.css('input[id=DB]')).sendKeys(dob);
    browser.sleep(400);
    element(by.css('input[id=ZC]')).sendKeys(zipcode);
    browser.sleep(400);
    element(by.css('input[id=PW]')).sendKeys(password);
    browser.sleep(400);
    element(by.css('input[id=CP]')).sendKeys(repwd);
    browser.sleep(400);
    element(by.css('input[id=SB]')).click();
    browser.sleep(400);
  }

  // Function to login current user
  login(username, password) {
    element(by.css('input[id=accountName]')).sendKeys(username);
    element(by.css('input[id=accountPW]')).sendKeys(password);
    element(by.css('input[id=login_submit]')).click();
  }
}
