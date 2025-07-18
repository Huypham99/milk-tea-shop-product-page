# [Ownego Javascript Developer Test]

## 🚀 Tech Stack

### Core Technologies

- **Vue.js 3** - The Progressive JavaScript Framework
- **Pinia** - Intuitive state management for Vue
- **Vite** - Next-Generation Frontend Tooling
- **TypeScript** - For type safety (if applicable)
- **Tailwind CSS** - A utility-first CSS framework
- **ESLint + Prettier** - For code quality & consistent formatting

---

## ✨ Features

### Product Listing

- Displays a list of beverage categories (e.g., Featured Items, Milk Tea, Fruit Tea, Coffee, Special Menu).
- Lists products within the selected category, including basic information like name, price, availability status (In Stock), and key attributes (e.g., calories, caffeine).
- Allows users to filter items by beverage category and topping type.

### Product Detail

- Shows detailed information for a specific product, including name, description, and price (price is dynamically calculated based on quantity, variations, and toppings).
- Allows users to adjust the product quantity.
- Provides options to select the size (e.g., Size M, Size L with different prices).
- Allows customization of sugar level (e.g., No Sugar, Less Sugar, 100% Sugar).
- Allows customization of ice level (e.g., No Ice, Less Ice, 100% Ice).
- Allows selection of one or more toppings.
- Displays nutritional information (calories) and availability status.
- An "Add [quantity] item(s) to cart" button to add the customized product to the shopping cart.

### Shopping Cart

- Lists all items added to the cart, including their name, selected options (size, sugar, ice), quantity, and price.
- Allows users to adjust the quantity of or remove items from the cart.
- Displays an order summary:
  - Total items and subtotal.
  - Shipping fee (calculated based on the cart's total value).
  - VAT (10%).
  - Grand total amount payable.
- Provides action buttons: a "Checkout" button to proceed to payment and a "Clear All" button to empty the cart.
- Displays a confirmation modal when the user attempts to clear all items from the cart.

---

## 🛠️ Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** >= 20.19.0
- **npm** >= 7.0.0

### Installation

1.  **Clone the repository**

    ```bash
    git clone [https://github.com/Huypham99/milk-tea-shop-product-page.git](https://github.com/Huypham99/milk-tea-shop-product-page.git)
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

### Development

1.  **Start the development server**

    ```bash
    npm run dev
    ```

    The application will be running at `http://localhost:3000`
