import { expect, Locator } from "@playwright/test";
import { BasePage } from "./basePage";
import {
  getUniqueRandomIndices,
  convertCurrencyToNumber,
} from "../utils/helpers";
import { Sorting } from "../constants/sorting";

export class ProductPage extends BasePage {
  private orderbySelect = this.page.locator("select.orderby");

  async switchToView(view: "grid" | "list") {
    const btnSwitch = this.page.locator(`.switch-${view}`);
    await btnSwitch.click();
  }

  async expectView(view: "grid" | "list") {
    const container = this.page.locator(".products-loop");
    await expect(container).toHaveClass(new RegExp(`\\bproducts-${view}\\b`));
  }

  get productItems(): Locator {
    return this.page.locator(".products-loop .product");
  }

  async getTotalProductItems(): Promise<number> {
    return await this.productItems.count();
  }

  async addRandomProductToCart(n: number): Promise<[string, string][]> {
    const total = await this.getTotalProductItems();

    if (total === 0) throw new Error("No products found on the page.");
    if (n > total)
      throw new Error(`Requested ${n} products, but only found ${total}.`);

    const indices = getUniqueRandomIndices(n, total);
    const results: [string, string][] = [];

    for (const index of indices) {
      const product = this.productItems.nth(index);
      const title = await product.locator(".product-title a").innerText();
      const price = await product.locator("span.price bdi").last().innerText();
      await product.locator(".add_to_cart_button").first().click();
      results.push([title, price]);
    }
    return results;
  }

  async selectOrderBy(orderBy: string) {
    await this.orderbySelect.selectOption({ label: orderBy });
  }

  async expectProductSortedCorrectly(orderBy: string) {
    const total = await this.getTotalProductItems();

    if (total === 0) throw new Error("No products found on the page.");

    for (let i = 0; i < total - 1; i++) {
      const product = this.productItems.nth(i);
      const nextProduct = this.productItems.nth(i);
      const price = await product.locator("span.price bdi").last().innerText();
      const nextPrice = await nextProduct
        .locator("span.price bdi")
        .last()
        .innerText();
      const current = convertCurrencyToNumber(price);
      const next = convertCurrencyToNumber(nextPrice);
      switch (orderBy) {
        case Sorting.SORT_BY_PRICE_HIGH_TO_LOW:
          expect(current).toBeLessThanOrEqual(next);
          break;
        case Sorting.SORT_BY_PRICE_LOW_TO_HIGH:
          expect(current).toBeGreaterThanOrEqual(next);
          break;
      }
    }
  }
}
