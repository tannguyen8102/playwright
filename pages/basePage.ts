import { Page, Locator } from "@playwright/test";

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

  acceptDialog() {
    this.page.on("dialog", async (dialog) => {
      await dialog.accept();
    });
  }

  async waitForTextChange(locator: Locator, timeout = 10000): Promise<void> {
    const oldText = await locator.textContent();
    const start = Date.now();

    while (Date.now() - start < timeout) {
      const newText = await locator.textContent();
      if (newText !== oldText) return;
      await new Promise((res) => setTimeout(res, 200));
    }
  }
}
