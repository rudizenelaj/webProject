// Access the "All Orders" table body
const allOrdersTableBody = document.getElementById("all-orders-body");

document.addEventListener("DOMContentLoaded", function () {
  // Retrieve the order from localStorage
  const storedOrder = JSON.parse(localStorage.getItem("currentOrder")) || [];
  
  storedOrder.forEach(order => {
    // Create a new row in the table
    const newRow = allOrdersTableBody.insertRow();
    newRow.innerHTML = `
        <td>${order.customerName}</td>
        <td>${order.items}</td>
        <td>${order.totalOrderPrice}</td>
        <td><button class="complete-order-btn">Completed</button></td>
      `;
  });
});

// Use event delegation to handle complete order button clicks
allOrdersTableBody.addEventListener("click", function (event) {
  const target = event.target;
  let index = -1;
  if (target.classList.contains("complete-order-btn")) {
    // If the clicked element is a complete order button, remove the corresponding row
    const row = target.parentNode.parentNode;
    index = row.rowIndex - 1;
    row.parentNode.removeChild(row);

    // Clear the order from localStorage
    removeOrderByIndex(index);
  }
});

function removeOrderByIndex(index) {
  // Retrieve existing orders from localStorage
  var existingOrders = JSON.parse(localStorage.getItem('currentOrder')) || [];

  // Check if the index is within the bounds of the array
  if (index < 0 || index >= existingOrders.length) {
      console.error('Index out of bounds');
      return;
  }

  var orderToBeSaved = existingOrders[index];
  createOrder(orderToBeSaved.customerName, orderToBeSaved.items, orderToBeSaved.totalOrderPrice);

  // Remove the order at the specified index
  existingOrders.splice(index, 1);

  // Save the updated orders array back to localStorage
  localStorage.setItem('currentOrder', JSON.stringify(existingOrders));
}

// Function to create a new order
async function createOrder(customerName, items, totalOrderPrice) {
  const response = await fetch('http://localhost:3000/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ customerName, items, totalOrderPrice })
  });
  const data = await response.json();
  console.log(data);
}