import { expect } from "@playwright/test";
import { BasePage } from "./basePage";

export class LoginPage extends BasePage {
  private usernameInput = this.page.locator("#username");
  private passwordInput = this.page.locator("#password");
  private loginButton = this.page.locator('[name="login"]');

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async assertLoginSuccess() {
    await expect(this.page.locator("text=Welcome")).toBeVisible();
  }
}
