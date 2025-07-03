import { test } from "@playwright/test";
import { config } from "../config";
import { LoginPage } from "../pages/loginPage";
import { ProductPage } from "../pages/productPage";
import { CartPage } from "../pages/cartPage";
import { CheckoutPage } from "../pages/checkoutPage";
import { PaymentMethod } from "../constants/paymentMethod";
import { checkoutInfo } from "../data/checkoutInfo";
import { RequiredMessage } from "../constants/messages";

for (const [key, value] of Object.entries(RequiredMessage)) {
  test(`Ensure proper error handling when mandatory fields are blank: ${value}`, async ({
    page,
  }) => {
    const checkoutInfoUpdate = { ...checkoutInfo, [key]: "" };
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const totalItemToOrder = 1;

    await loginPage.navigateTo("/my-account");
    await loginPage.login(config.userEmail, config.userPassword);

    await loginPage.navigateTo("/cart");
    await cartPage.emptyCart();

    // . Go to Shop page
    await loginPage.navigateTo("/shop");
    await loginPage.closeAdIfVisible();
    // . Select multiple items and add to cart
    const items = await productPage.addRandomProductToCart(totalItemToOrder);

    // . Go to the cart and verify all selected items
    await productPage.navigateTo("/cart");
    await cartPage.expectItemDetailsMiniContent(items);

    // 1. Leave mandatory fields (address, payment info) blank
    // 2. Click 'Confirm Order'
    await cartPage.gotoCheckout();
    await checkoutPage.expectCheckoutPageDisplayed();
    await checkoutPage.expectItemDetailsInOrder(items);
    await checkoutPage.placeOrder(
      checkoutInfoUpdate,
      PaymentMethod.DIRECT_BANK_TRANSFER
    );

    await checkoutPage.expectHighlightMissingFields(value);
  });
}
