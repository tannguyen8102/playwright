import { test } from "@playwright/test";
import { config } from "../config";
import { LoginPage } from "../pages/loginPage";
import { ProductPage } from "../pages/productPage";
import { CartPage } from "../pages/cartPage";

test("User can place an order with multiple items", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);
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
  // 4. Add a product
  await productPage.addRandomProductToCart(totalItemToOrder);

  // 5. Go to the cart
  await productPage.navigateTo("/cart");
  // 6. Verify quantity of added product
  await cartPage.expectQuantityAndSubtitle(totalItemToOrder);
  // 7. Click on Plus(+) button
  await cartPage.plusQuantity();
  // 8. Verify quantity of product and SUB TOTAL price
  await cartPage.expectQuantityAndSubtitle(totalItemToOrder + 1);
  // 9. Enter 4 into quantity textbox then click on UPDATE CART button
  await cartPage.enterQuantity(4);
  await cartPage.updateCart();
  // 10. Verify quantity of product is 4 and SUB TOTAL price
  await cartPage.expectQuantityAndSubtitle(4);
  // 11. Click on Minus(-) button
  await cartPage.minusQuantity();
  // 12. Verify quantity of product and SUB TOTAL price
  await cartPage.expectQuantityAndSubtitle(3);
});
