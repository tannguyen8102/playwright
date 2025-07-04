import { test } from "@playwright/test";
import { config } from "../config";
import { LoginPage } from "../pages/loginPage";
import { ProductPage } from "../pages/productPage";
import { CartPage } from "../pages/cartPage";

test("Verify users can clear the cart", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);
  const totalItemToOrder = 3;

  // 1. Open browser and go to https://demo.testarchitect.com/
  // 2. Login with valid credentials
  await loginPage.navigateTo("/my-account");
  await loginPage.login(config.userEmail, config.userPassword);

  await loginPage.navigateTo("/cart");
  await cartPage.emptyCart();

  // 3. Go to Shop page
  await loginPage.navigateTo("/shop");
  await loginPage.closeAdIfVisible();
  const items = await productPage.addRandomProductToCart(totalItemToOrder);

  // 4. Verify items show in table
  await productPage.navigateTo("/cart");
  await cartPage.expectItemDetailsMiniContent(items);

  // 5. Click on Clear shopping cart
  await cartPage.clearShoppingCart();

  // 6. Verify empty cart page displays
  await cartPage.expectCartEmpty();
});
