import { expect } from "@playwright/test";
import { BasePage } from "./basePage";

export class OrdersHistoryPage extends BasePage {
  private ordersHistoryTable = this.page.locator("table.my_account_orders");
  private orderItem = this.page.locator("table.my_account_orders .order");

  async expectOrdersHistoryDisplayedCorrectly() {
    expect(await this.ordersHistoryTable.isVisible());
    const total = await this.orderItem.count();
    expect(total).toBeGreaterThan(0);
  }
}
