import { test } from "@playwright/test";
import { config } from "../config";
import { LoginPage } from "../pages/loginPage";
import { ProductPage } from "../pages/productPage";
import { CartPage } from "../pages/cartPage";
import { CheckoutPage } from "../pages/checkoutPage";
import { PaymentMethod } from "../constants/paymentMethod";
import { checkoutInfo } from "../data/checkoutInfo";

const paymentOptions = Object.values(PaymentMethod);

for (const method of paymentOptions) {
  test(`Verify users can buy an item using different payment methods (all payment methods): ${method}`, async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const totalItemToOrder = 1;

    // 1. Open browser and go to https://demo.testarchitect.com/
    // 2. Login with valid credentials
    await loginPage.navigateTo("/my-account");
    await loginPage.login(config.userEmail, config.userPassword);

    await loginPage.navigateTo("/cart");
    await cartPage.emptyCart();

    // 3. Go to Shop page
    await loginPage.navigateTo("/shop");
    await loginPage.closeAdIfVisible();
    // 4. Select multiple items and add to cart
    const items = await productPage.addRandomProductToCart(totalItemToOrder);

    // 5. Go to the cart and verify all selected items
    await productPage.navigateTo("/cart");
    await cartPage.expectItemDetailsMiniContent(items);

    // 6. Proceed to checkout and confirm order
    await cartPage.gotoCheckout();
    await checkoutPage.expectCheckoutPageDisplayed();
    await checkoutPage.expectItemDetailsInOrder(items);
    await checkoutPage.placeOrder(checkoutInfo, method);

    //  7. Verify order confirmation message
    await checkoutPage.expectOrderPageDisplayed();
    await checkoutPage.expectOrderInfoDisplayed(checkoutInfo, items);
  });
}
