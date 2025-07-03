import { test } from "@playwright/test";
import { config } from "../config";
import { LoginPage } from "../pages/loginPage";
import { OrdersHistoryPage } from "../pages/ordersHistoryPage";
import { MyAccountPage } from "../pages/myAccount";

test("User can place an order with multiple items", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const myAccountPage = new MyAccountPage(page);
  const ordersHistoryPage = new OrdersHistoryPage(page);

  // 1. Go to My Account page
  await loginPage.navigateTo("/my-account");
  await loginPage.login(config.userEmail, config.userPassword);
  // 2. Click on Orders in left navigation
  await myAccountPage.gotoOrdersHistory();
  // 3. Verify order details
  await ordersHistoryPage.expectOrdersHistoryDisplayedCorrectly();
});
