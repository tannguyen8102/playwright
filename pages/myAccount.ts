import { BasePage } from "./basePage";

export class MyAccountPage extends BasePage {
  async gotoOrdersHistory() {
    await this.page.getByRole("link", { name: " Orders" }).click();
  }
}
