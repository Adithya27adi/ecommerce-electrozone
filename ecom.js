
  // Product list
  var products = [
    { name: 'Wireless Headphones', image: 'bluetoothheadphones-2048px-6141.webp', price: 1999 },
    { name: 'Smart Watch', image: 'FkGweMeB7hdPgaSFQdgsfj.webp', price: 2499 },
    { name: 'Bluetooth Speaker', image: 'https://images.philips.com/is/image/PhilipsConsumer/TAS2505B_00-IMS-en_IN?$jpglarge$', price: 1299 }
  ];

  // Cart array
  var cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Render products to page
  function renderProducts() {
    var productList = document.getElementById('productList');
    var searchInput = document.getElementById('searchBar').value.toLowerCase();
    var hasMatch = false;
    productList.innerHTML = '';

    // Loop through each product
    for (var i = 0; i < products.length; i++) {
      var product = products[i];
      if (product.name.toLowerCase().includes(searchInput)) {
        hasMatch = true;
        var card = document.createElement('div');
        card.className = 'col-md-4';
        card.innerHTML = `
          <div class="card product-card shadow">
            <img src="${product.image}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">Price: ₹${product.price}</p>
              <button class="btn btn-sm btn-success add-to-cart" onclick="addToCart(${i})">Add to Cart</button>
            </div>
          </div>
        `;
        productList.appendChild(card);
      }
    }
    // Show/hide "no results" text
    var noResults = document.getElementById('noResults');
    noResults.style.display = hasMatch ? 'none' : 'block';
  }

  // Add a new product
  function addNewProduct() {
    var name = document.getElementById('newProductName').value;
    var image = document.getElementById('newProductImage').value;
    var price = parseFloat(document.getElementById('newProductPrice').value);
    if (name && image && price) {
      products.push({ name: name, image: image, price: price });
      document.getElementById('newProductName').value = '';
      document.getElementById('newProductImage').value = '';
      document.getElementById('newProductPrice').value = '';
      renderProducts();
    }
  }

  // Add item to cart
  function addToCart(index) {
    var product = products[index];
    var existing = cart.find(function(item) {
      return item.name === product.name;
    });
    if (existing) {
      existing.quantity++;
    } else {
      product.quantity = 1;
      cart.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
  }

  // Update cart count in header
  function updateCartCount() {
    var cartCount = document.getElementById('cartCount');
    var total = 0;
    for (var i = 0; i < cart.length; i++) {
      total += cart[i].quantity;
    }
    cartCount.textContent = total;
  }

  // Show cart items in modal
  function displayCart() {
    var cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    for (var i = 0; i < cart.length; i++) {
      var item = cart[i];
      var li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      li.innerHTML = `
        ${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}
        <button class="btn btn-sm btn-danger" onclick="removeFromCart(${i})">❌</button>
      `;
      cartItems.appendChild(li);
    }
  }

  // Remove item from cart
  function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
  }

  // Checkout function
  function checkout() {
    if (cart.length === 0) {
      alert("🛒 Your cart is empty!");
      return;
    }
    alert("✅ Thank you for your order!");
    cart.length = 0;
    localStorage.removeItem('cart');
    updateCartCount();
    displayCart();
  }

  // Add input event to search bar
  document.getElementById('searchBar').addEventListener('input', renderProducts);
  // When modal is opened, show cart
  document.getElementById('cartModal').addEventListener('show.bs.modal', displayCart);

  // Initial load
  updateCartCount();
  renderProducts();