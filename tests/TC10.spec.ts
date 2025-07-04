import { test } from "@playwright/test";
import { config } from "../config";
import { LoginPage } from "../pages/loginPage";
import { ProductPage } from "../pages/productPage";
import { getRandomComment, getRandomNumberBetween } from "../utils/helpers";

test("Verify users can post a review", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productPage = new ProductPage(page);

  // 1. Open browser and go to https://demo.testarchitect.com/
  // 2. Login with valid credentials
  await loginPage.navigateTo("/my-account");
  await loginPage.login(config.userEmail, config.userPassword);
  // 3. Go to Shop page
  await loginPage.navigateTo("/shop");
  await loginPage.closeAdIfVisible();
  // 4. Click on a product to view detail
  await productPage.openRandomProduct();
  // 5. Scroll down then click on REVIEWS tab
  await productPage.openReviews();
  // 6. Submit a review
  const comment = getRandomComment();
  const star = getRandomNumberBetween(1, 5);
  await productPage.addReviews(star, comment);
  // 7. Verify new review
  await productPage.openReviews();
  await productPage.expectCommentAdded(star, comment);
});
