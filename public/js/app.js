"use strict";

const products = [
  {
    id: 1,
    name: "MacBook Air M2",
    price: 999,
    image: "./imgs/loptop.png",
    category: "laptop",
  },
  {
    id: 2,
    name: "Sony WH-1000XM5",
    price: 399,
    image: "./imgs/headset.png",
    category: "headphones",
  },
  {
    id: 3,
    name: "Apple Watch Series 9",
    price: 429,
    image: "./imgs/watch.png",
    category: "watch",
  },
];

const cart = [];

const productsContainer = document.querySelector("#products-container");

const searchBox = document.querySelector("#search-box");

const searchForm = document.querySelector("form");

const cartCount = document.querySelector("#cart-count");

const cartDropdown = document.querySelector("#cart-dropdown");

function renderProducts(productsArray) {
  const productsHTML = productsArray
    .map(function (product) {
      return `<div
          class="border border-border p-4 flex flex-col gap-3 rounded-xl shadow-md"
        >
          <div class="flex justify-center">
            <img
              class="object-contain w-40 h-40"
              src="${product.image}"
              alt="${product.name}"
            />
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-heading font-bold">${product.name}</p>
            <span class="text-primary font-bold">$${product.price}</span>
          </div>
          <button
            class="add-to-cart-btn mt-auto w-full bg-primary hover:bg-primary-dark text-surface text-sm font-medium px-3 py-2 rounded-md transition-colors"
            data-id="${product.id}"
          >
            Add to Cart
          </button>
        </div>`;
    })
    .join(" ");

  productsContainer.innerHTML = productsHTML;
}

renderProducts(products);

function renderCart() {
  if (cart.length === 0) {
    cartDropdown.innerHTML = `
      <p class="text-center text-body py-4">
        Your cart is empty.
      </p>
    `;
    return;
  }
  const cartHTML = cart
    .map(function (item) {
      return `<div class="flex justify-between items-center gap-3 py-3 border-b border-border">
        <div>
          <p class="text-heading font-bold">${item.name}</p>
          <p class="text-body text-sm">Quantity: ${item.quantity}</p>
        </div>
        <p class="text-primary font-bold">$${item.price * item.quantity}</p>
      </div>`;
    })
    .join("");

  const totalPrice = cart.reduce(function (sum, item) {
    return sum + item.price * item.quantity;
  }, 0);

  cartDropdown.innerHTML = `
    ${cartHTML}
    <div class="flex justify-between items-center pt-4 mt-2">
      <p class="text-heading font-bold text-lg">Total :</p>
      <p class="text-primary font-bold text-lg">$${totalPrice}</p>
    </div>
  `;
}

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const searchTerm = searchBox.value.trim().toLowerCase();

  if (searchTerm === "") {
    renderProducts(products);
    return;
  }

  const filteredProducts = products.filter(function (product) {
    return product.name.toLowerCase().includes(searchTerm);
  });

  if (filteredProducts.length === 0) {
    productsContainer.innerHTML = `
      <p class="col-span-3 text-center text-body text-lg py-10">
        No product found
      </p>
    `;
  } else {
    renderProducts(filteredProducts);
  }
});

productsContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("add-to-cart-btn")) {
    const productId = event.target.dataset.id;

    const selectedProduct = products.find(function (product) {
      return product.id === Number(productId);
    });

    const cartItem = cart.find(function (item) {
      return item.id === selectedProduct.id;
    });

    if (cartItem) {
      cartItem.quantity++;
    } else {
      cart.push({ ...selectedProduct, quantity: 1 });
    }

    const totalItems = cart.reduce(function (sum, item) {
      return sum + item.quantity;
    }, 0);

    cartCount.textContent = totalItems;

    renderCart();
  }
});

renderCart();
