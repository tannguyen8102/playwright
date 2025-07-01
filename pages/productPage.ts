import { expect, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class ProductPage extends BasePage {
  async switchToView(view: 'grid' | 'list') {
    const btnSwitch = this.page.locator(`.switch-${view}`);
    await btnSwitch.click();
  }

  async expectView(view: 'grid' | 'list') {
    const container = this.page.locator('.products-loop');
    await expect(container).toHaveClass(new RegExp(`\\bproducts-${view}\\b`));
  }

  get productItems(): Locator {
    return this.page.locator('.products-loop .product');
  }

  async getTotalProductItems(): Promise<number> {
    return await this.productItems.count();
  }

  async getRandomProductItem(): Promise<[Locator, string, string]> {
    const count = await this.getTotalProductItems();
    if (count === 0) throw new Error('No product found on the page.');
    const randomIndex = Math.floor(Math.random() * count);
    const productLocator = this.productItems.nth(randomIndex);
    const title = await productLocator.locator('.product-title a').innerText();
    const price = await productLocator.locator('span.price bdi').last().innerText();
    return [productLocator, title, price];
  }

  async getRandomProductName(): Promise<string> {
    const randomItem = await this.getRandomProductItem();
    const title = randomItem.locator('.product-title a');
    return await title.innerText();
  }

  async addProductToCart(productLocator: Locator): Promise<void> {
    await productLocator.locator('.add_to_cart_button').first().click();
  }

}