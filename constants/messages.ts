export const CheckoutMessages = {
  ORDER_SUCCESS: "Thank you. Your order has been received.",
} as const;

export const RequiredMessage = {
  firstName: "Billing First name is a required field.",
  lastName: "Billing Last name is a required field.",
  address1: "Billing Street address is a required field.",
  city: "Billing Town / City is a required field.",
  zipcode: "Billing ZIP Code is a required field.",
  phone: "Billing Phone is a required field.",
  email: "Billing Email address is a required field.",
} as const;
