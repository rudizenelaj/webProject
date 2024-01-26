// Access the "All Orders" table body
const allOrdersTableBody = document.getElementById("all-orders-body");

document.addEventListener("DOMContentLoaded", function () {
  // Retrieve the order from localStorage
  const storedOrder = JSON.parse(localStorage.getItem("currentOrder"));

  if (storedOrder) {
    // Create a new row in the table
    const newRow = allOrdersTableBody.insertRow();
    newRow.innerHTML = `
        <td>${storedOrder.customerName}</td>
        <td>${storedOrder.items}</td>
        <td>${storedOrder.totalOrderPrice}</td>
        <td><button class="complete-order-btn">Completed</button></td>
      `;
  }
});

// Use event delegation to handle complete order button clicks
allOrdersTableBody.addEventListener("click", function (event) {
  const target = event.target;
  if (target.classList.contains("complete-order-btn")) {
    // If the clicked element is a complete order button, remove the corresponding row
    const row = target.parentNode.parentNode;
    row.parentNode.removeChild(row);

    // Clear the order from localStorage
    localStorage.removeItem("currentOrder");
  }
});
