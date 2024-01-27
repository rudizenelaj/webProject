let navbar = document.querySelector(".navbar");

document.querySelector("#menu-btn").onclick = () => {
  navbar.classList.toggle("active");
  searchForm.classList.remove("active");
};

let searchForm = document.querySelector(".search-form");

document.querySelector("#search-btn").onclick = () => {
  searchForm.classList.toggle("active");
  navbar.classList.remove("active");
};

window.onscroll = () => {
  navbar.classList.remove("active");
  searchForm.classList.remove("active");
};

document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar");
  const searchForm = document.querySelector(".search-form");
  const orderTableBody = document.getElementById("order-history-body");
  const storeOrderBtn = document.getElementById("store-order-btn");
  const customerNameInput = document.getElementById("customer-name");
  let orderNumber = 1;
  let currentOrder = {}; // Object to keep track of the current order

  // Function to handle item clicks and update the current order
  function handleItemClick(itemName, itemPrice) {
    if (currentOrder[itemName]) {
      // If the item is already in the order, update the quantity
      currentOrder[itemName].quantity += 1;
    } else {
      // If the item is not in the order, add it with quantity 1
      currentOrder[itemName] = {
        price: itemPrice,
        quantity: 1,
      };
    }

    // Update the order history table with the current order
    updateOrderHistory();
  }

  // Function to update the order history table
  function updateOrderHistory() {
    // Clear the order history table and re-populate it with the current order
    orderTableBody.innerHTML = "";
    for (const itemName in currentOrder) {
      const item = currentOrder[itemName];
      const totalPrice = (
        parseFloat(item.price.replace("$", "")) * item.quantity
      ).toFixed(2);
      const row = orderTableBody.insertRow();
      row.innerHTML = `
                <td>${itemName} (Quantity: ${item.quantity})</td>
                <td>${totalPrice}</td>
                <td><button class="delete-order-btn">Delete</button></td>
            `;
    }
  }

  // Attach the handleItemClick function to the click event of each menu item button
  const addToOrderButtons = document.querySelectorAll(".menu .box .btn");
  addToOrderButtons.forEach((addToOrderButton) => {
    addToOrderButton.addEventListener("click", function () {
      const itemName = this.parentNode.querySelector("h3").innerText;
      const itemPrice = this.parentNode.querySelector(".price").innerText;

      // Call the handleItemClick function
      handleItemClick(itemName, itemPrice);
    });
  });

  // Use event delegation to handle delete button clicks
  orderTableBody.addEventListener("click", function (event) {
    const target = event.target;
    if (target.classList.contains("delete-order-btn")) {
      // If the clicked element is a delete button, remove the corresponding row
      const row = target.parentNode.parentNode;
      const itemName = row
        .querySelector("td:first-child")
        .innerText.split(" (")[0]; // Extract item name without quantity
      delete currentOrder[itemName];
      row.parentNode.removeChild(row);
    }
  });

  // Function to handle storing the order in the "All Orders" table
  storeOrderBtn.addEventListener("click", function () {
    const customerName = customerNameInput.value.trim();

    if (customerName && Object.keys(currentOrder).length > 0) {
      // Calculate the total order price
      const totalOrderPrice = Object.values(currentOrder)
        .reduce((total, item) => {
          return (
            total + parseFloat(item.price.replace("$", "")) * item.quantity
          );
        }, 0)
        .toFixed(2);
        var existingOrders = JSON.parse(localStorage.getItem("currentOrder")) || [];
        
        // Create an order object
        const order = {
          customerName: customerName,
          items: getAllOrderedItems(), // Assuming this function returns a string representation of all items
          totalOrderPrice: totalOrderPrice,
        };
        
        existingOrders.push(order);
        localStorage.setItem('currentOrder',JSON.stringify(existingOrders));
        

      // Refresh the page for a new order
      window.location.href = "order.html";
    } else {
      alert("Please enter your name and add items to your order.");
    }
  });

  // Function to get a string representation of all ordered items
  function getAllOrderedItems() {
    return Object.entries(currentOrder)
      .map(([itemName, item]) => {
        return `${itemName} (Quantity: ${item.quantity})`;
      })
      .join(", ");
  }
});
