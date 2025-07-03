import { test } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { ProductPage } from "../pages/productPage";
import { CartPage } from "../pages/cartPage";
import { CheckoutPage } from "../pages/checkoutPage";
import { PaymentMethod } from "../constants/paymentMethod";
import { checkoutInfo } from "../data/checkoutInfo";

test("Verify users try to buy an item without logging in (As a guest)", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const totalItemToOrder = 1;

  // 1. Open https://demo.testarchitect.com/
  // 2. Navigate to 'Shop' or 'Products' section
  await loginPage.navigateTo("/shop");
  await loginPage.closeAdIfVisible();
  // 3. Add a product to cart
  const items = await productPage.addRandomProductToCart(totalItemToOrder);

  // 4. Click on Cart button
  await productPage.navigateTo("/cart");
  await cartPage.expectItemDetailsMiniContent(items);

  // 5. Proceed to checkout and confirm order
  await cartPage.gotoCheckout();
  await checkoutPage.expectCheckoutPageDisplayed();
  await checkoutPage.expectItemDetailsInOrder(items);
  await checkoutPage.placeOrder(
    checkoutInfo,
    PaymentMethod.DIRECT_BANK_TRANSFER
  );

  await checkoutPage.expectOrderPageDisplayed();
  await checkoutPage.expectOrderedProductDisplayed(items);
});
