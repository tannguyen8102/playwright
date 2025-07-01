import { test } from '@playwright/test';
import { config } from '../config';
import { BasePage } from '../pages/BasePage';
import { LoginPage } from '../pages/loginPage';
import { ProductPage } from '../pages/productPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkoutPage';
import { Departments } from '../data/departments';

const checkoutInfo = {
  firstName: "Tan",
  lastName: "Nguyen",
  company: "AGEST",
  country: "Vietnam",
  address1: "36 Tran Quoc tuan",
  address2: "36 Tran Quoc tuan",
  city: "Hai Chau",
  state: "Da Nang",
  zipcode: "33139",
  phone: "+84123123123",
  email: "tan.trong.nguyen@agest.vn",
  notes: "Giao gio hanh chinh",
  paymentMethod: "Direct bank transfer"
};

test('Verify users can buy an item successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const basePage = new BasePage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  //   1. Open browser and go to https://demo.testarchitect.com/
  //   2. Login with valid credentials
  await basePage.navigateTo('/my-account');
  await loginPage.acceptCookieIfVisible();
  await loginPage.login(config.userEmail, config.userPassword);

  await loginPage.navigateTo('/cart');
  await cartPage.emptyCart();

  //   4. Select Electronic Components & Supplies
  await basePage.selectMenu(Departments.ELECTRONIC_COMPONENT_AND_SUPPLIES)
  //   5. Verify the items should be displayed as a grid
  //   await productPage.switchToView('grid');
  //   await productPage.expectView('grid');
  //   6. Switch view to list
  //   await productPage.switchToView('list');
  //   await productPage.switchToView('list');
  //   7. Verify the items should be displayed as a list
  // await productPage.expectView('list');
  //   8. Select any item randomly to purchase
  const [selectedLocator, name, price] = await productPage.getRandomProductItem();
  //   9. Click 'Add to Cart'
  await productPage.addProductToCart(selectedLocator);
  // 10. Go to the cart
  await productPage.navigateTo('/cart')
  // 11. Verify item details in mini content
  await cartPage.expectItemDetailsMiniContent(name, price);
  // 12. Click on Checkout
  await cartPage.gotoCheckout();
  // 13. Verify Checkout page displays
  await checkoutPage.expectCheckoutPageDisplayed();
  // 14. Verify item details in order
  await checkoutPage.expectItemDetailsInOrder(name, price);
  // 15. Fill the billing details with default payment method
  // 16. Click on PLACE ORDER
  await checkoutPage.placeOrder(checkoutInfo);
  // 16. Verify Order status page displays
  await checkoutPage.expectOrderPageDisplayed();
  // 17. Verify the Order details with billing and item information
  await checkoutPage.expectOrderInfoDisplayed(checkoutInfo, name, price);
});