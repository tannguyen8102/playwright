import { expect } from "@playwright/test";
import { BasePage } from "./basePage";
import { CartMessages } from "../constants/messages";
import { convertCurrencyToNumber } from "../utils/helpers";

export class CartPage extends BasePage {
  private clearShoppingCartBtn = this.page.locator("a.clear-cart");
  private emptyText = this.page.getByText(CartMessages.EMPTY_CART);
  private updateCartBtn = this.page.locator('[name="update_cart"]');

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
    if (!(await this.emptyText.isVisible())) {
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

  async clearShoppingCart() {
    await this.clearShoppingCartBtn.click();
    this.acceptDialog();
  }

  async expectCartEmpty() {
    await expect(this.emptyText).toBeVisible();
  }

  async plusQuantity() {
    await this.page.locator(".quantity span.plus").first().click();
  }

  async minusQuantity() {
    await this.page.locator(".quantity span.minus").first().click();
  }

  async enterQuantity(value: Number) {
    const qtyInput = this.page.locator("input.qty").first();
    await qtyInput.fill(`${value}`);
  }

  async updateCart() {
    await this.updateCartBtn.click();
  }

  async expectQuantityAndSubtitle(quantity: number) {
    const subtotalLocator = this.page.locator("td.product-subtotal").first();
    await this.waitForTextChange(subtotalLocator);
    const qty = Number(
      await this.page.locator("input.qty").first().inputValue()
    );
    const price = convertCurrencyToNumber(
      await this.page.locator("td.product-price bdi").first().innerText()
    );
    expect(qty).toBe(quantity);
    const subtotalText = await subtotalLocator.innerText();
    const subtotalValue = convertCurrencyToNumber(subtotalText);
    expect(subtotalValue).toBe(price * quantity);
  }
}
