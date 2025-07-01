import { expect } from "@playwright/test";
import { BasePage } from "./basePage";

export class CartPage extends BasePage {
  async expectItemDetailsMiniContent(items: any) {
    for (let i = 0; i < items.count; i++) {
      const [name, price] = items[i];
      const cartItem = this.page.locator(".cart_item").nth(i);
      const actualTitle = await cartItem
        .locator(".product-title")
        .first()
        .innerText();
      const actualPrice = await cartItem
        .locator("td.product-price")
        .first()
        .innerText();
      expect(actualTitle).toMatch(new RegExp(name, "i"));
      expect(actualPrice).toBe(price);
    }
  }

  async emptyCart() {
    const emptyText = this.page.getByText("YOUR SHOPPING CART IS EMPTY");
    if (!(await emptyText.isVisible())) {
      const productItems = this.page.locator("table.cart tbody tr");
      const total = await productItems.count();
      for (let i = 0; i < total; i++) {
        await productItems.locator("a.remove-item").first().click();
      }
    }
  }

  async gotoCheckout() {
    await this.page.getByRole("link", { name: "2 Checkout" }).click();
  }
}
