import { expect } from "@playwright/test";
import { BasePage } from "./basePage";
import { CheckoutMessages } from "../constants/messages";

export class CheckoutPage extends BasePage {
  private firstNameInput = this.page.locator("#billing_first_name");
  private lastNameInput = this.page.locator("#billing_last_name");
  private companyInput = this.page.locator("#billing_company");
  private countrySelect = this.page.locator("#billing_country");
  private address1Input = this.page.locator("#billing_address_1");
  private address2Input = this.page.locator("#billing_address_2");
  private cityInput = this.page.locator("#billing_city");
  private stateSelect = this.page.locator("select#billing_state");
  private stateInput = this.page.locator("input#billing_state");
  private postcodeInput = this.page.locator("#billing_postcode");
  private phoneInput = this.page.locator("#billing_phone");
  private emailInput = this.page.locator("#billing_email");
  private commentsInput = this.page.locator("#order_comments");
  private orderButton = this.page.locator("#place_order");

  async expectCheckoutPageDisplayed() {
    await expect(this.page).toHaveURL(/\/checkout\/?/);
  }

  async expectItemDetailsInOrder(items: any) {
    for (let i = 0; i < items.count; i++) {
      const [name, price] = items[i];
      const cartItem = this.page.locator(".cart_item").nth(i);
      const actualName = await cartItem
        .locator("td.product-name")
        .evaluate((el) => el.childNodes[0].textContent?.trim());
      const actualPrice = await cartItem
        .locator("td.product-total")
        .first()
        .innerText();
      expect(actualName).toMatch(new RegExp(name, "i"));
      expect(actualPrice).toBe(price);
    }
  }

  async fillBillingDetails(info: any) {
    await this.firstNameInput.fill(info.firstName);
    await this.lastNameInput.fill(info.lastName);
    await this.companyInput.fill(info.company);
    await this.countrySelect.selectOption({ label: info.country });
    await this.address1Input.fill(info.address1);
    await this.address2Input.fill(info.address2);
    await this.cityInput.fill(info.city);
    (await this.stateSelect.isVisible()) &&
      (await this.stateSelect.selectOption({ label: info.state }));
    (await this.stateInput.isVisible()) &&
      (await this.stateInput.fill(info.state));
    await this.postcodeInput.fill(info.zipcode);
    await this.phoneInput.fill(info.phone);
    await this.emailInput.fill(info.email);
    await this.commentsInput.fill(info.notes);
  }

  async selectPaymentMethod(paymentMethod: string) {
    await this.page.getByText(paymentMethod).click();
  }

  async placeOrder(info: any) {
    await this.fillBillingDetails(info);
    await this.selectPaymentMethod(info.paymentMethod);
    await this.orderButton.click();
  }

  async expectOrderPageDisplayed() {
    await expect(
      this.page.getByText(CheckoutMessages.ORDER_SUCCESS)
    ).toBeVisible();
    await expect(this.page).toHaveURL(/\/order-received\/?/);
  }

  async expectOrderInfoDisplayed(info: any, items: any) {
    const billingAddress = await this.page.locator("address").innerText();

    expect(billingAddress).toContain(info.firstName);
    expect(billingAddress).toContain(info.lastName);
    expect(billingAddress).toContain(info.company);
    expect(billingAddress).toContain(info.address1);
    expect(billingAddress).toContain(info.city);
    expect(billingAddress).toContain(info.country);
    expect(billingAddress).toContain(info.phone);
    expect(billingAddress).toContain(info.email);
    for (let i = 0; i < items.count; i++) {
      const [name, price] = items[i];
      const cartItem = this.page.locator(".order_item").nth(i);
      const productName = await this.page
        .locator("td.product-name a")
        .innerText();
      const productTotal = await this.page
        .locator("td.product-total")
        .innerText();
      expect(productName).toMatch(new RegExp(name, "i"));
      expect(productTotal).toBe(price);
    }
  }
}
