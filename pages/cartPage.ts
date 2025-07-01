import { expect, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class CartPage extends BasePage {
  async expectItemDetailsMiniContent(name: string, price: string) {
    const actualTitle = await this.page.locator('.product-title').first().innerText();
    const actualPrice = await this.page.locator('td.product-price').first().innerText();
    expect(actualTitle).toMatch(new RegExp(name, 'i'));
    expect(actualPrice).toBe(price);
  }

  async emptyCart() {
    const emptyText = this.page.getByText('YOUR SHOPPING CART IS EMPTY');
    if (!await emptyText.isVisible()) {
      const productItems = this.page.locator('table.cart tbody tr');
      const total = await productItems.count();
      for(let i = 0; i<total; i++) {
        await productItems.locator('a.remove-item').first().click();
      }
    }
  }

  async gotoCheckout() {
    await this.page.getByRole('link', { name: '2 Checkout' }).click();
  }

}