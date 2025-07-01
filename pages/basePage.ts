import { Page } from "@playwright/test";

export class BasePage {
  constructor(protected page: Page) {}

  async navigateTo(path: string) {
    await this.page.goto(path);
  }

  async selectMenu(menu: string) {
    const menuAllDepartments1 = this.page.locator("#menu-all-departments-1");
    for (let i = 0; i < 10; i++) {
      await this.page.locator(".secondary-menu-wrapper").click();
      await this.page.waitForTimeout(1000);
      if (menuAllDepartments1.isVisible()) {
        break;
      }
    }
    const menuItem = this.page.locator(
      `xpath=//ul[@id="menu-all-departments-1"]//li/a[normalize-space(text())="${menu}"]`
    );
    await menuItem.click();
  }

  async closeAdIfVisible() {
    await this.page.locator(".pum-active .pum-close").click();
  }
}
