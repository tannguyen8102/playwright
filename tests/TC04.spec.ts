import { test } from "@playwright/test";
import { config } from "../config";
import { LoginPage } from "../pages/loginPage";
import { ProductPage } from "../pages/productPage";
import { CartPage } from "../pages/cartPage";
import { Sorting } from "../constants/sorting";

const sorting = Object.values(Sorting);

for (const orderby of sorting) {
  test(`Verify users can sort items by price: ${orderby}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    // 1. Open browser and go to https://demo.testarchitect.com/
    // 2. Login with valid credentials
    await loginPage.navigateTo("/my-account");
    await loginPage.login(config.userEmail, config.userPassword);

    await loginPage.navigateTo("/cart");
    await cartPage.emptyCart();

    // 3. Go to Shop page
    await loginPage.navigateTo("/shop");
    await loginPage.closeAdIfVisible();
    // 4. Switch view to list
    await productPage.switchToView("list");
    // 5. Sort items by price (low to high / high to low)
    await productPage.selectOrderBy(orderby);
    // 6. Verify the order of items
    await productPage.expectProductSortedCorrectly(orderby);
  });
}
