// Select the necessary elements
const expenseForm = document.querySelector(".section button"); // The submit button for the expense form
const itemInput = document.querySelector("input[type='text']"); // Item name input
const amountInput = document.querySelector("input[type='number']"); // Amount input
const expenseLog = document.querySelector(".section .expense-item"); // The expense list container

let totalSaved = 1250; // Initial total saved amount
let monthlyBudget = 3000; // Initial monthly budget

// Get elements for displaying total saved and monthly budget
const totalSavedElement = document.querySelector(
  ".dashboard-card:nth-child(1) p"
);
const monthlyBudgetElement = document.querySelector(
  ".dashboard-card:nth-child(4) p"
);
const simulateButton = document.getElementById("simulateButton");
const savingsResult = document.getElementById("savingsResult");
const saveAmountInput = document.getElementById("saveAmount");
const categorySelect = document.getElementById("categorySelect");

// Impulse Alert System elements
const impulseAlert = document.querySelector(".alert-section");

// Variables to track data for impulse alert system
let totalSpent = 0; // Total amount spent so far
let categoryCount = {}; // Object to track how many times each category is spent
let lastCategory = ""; // To track the last category entered

// Update displayed values for total saved and monthly budget
function updateUI() {
  totalSavedElement.textContent = `$${totalSaved}`;
  monthlyBudgetElement.textContent = `$${monthlyBudget.toFixed(2)}`;
}

// Update impulse alert system based on conditions
function updateImpulseAlert() {
  const spentPercentage = (totalSpent / monthlyBudget) * 100;

  // Update budget alert if 80% of the budget is spent
  if (spentPercentage >= 80) {
    const alertMessage = `You've spent 80% of your monthly budget!`;
    displayAlert(alertMessage);
  } else {
    removeAlert();
  }

  // Check for impulse purchase (more than 3 times in a row in the same category)
  if (categoryCount[lastCategory] >= 3) {
    const impulseMessage = `Impulse Purchase Detected: You've spent money on ${lastCategory} 3 times this week.`;
    displayAlert(impulseMessage);
  }
}

// Display an alert in the Impulse Alert section
function displayAlert(message) {
  const alertItem = document.createElement("div");
  alertItem.classList.add("alert-item");
  alertItem.textContent = message;
  impulseAlert.appendChild(alertItem);
}

// Remove the displayed alert
function removeAlert() {
  const existingAlerts = document.querySelectorAll(".alert-item");
  existingAlerts.forEach((alert) => alert.remove());
}

// Event listener for submitting an expense
expenseForm.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the form from reloading the page

  const itemName = itemInput.value;
  const itemAmount = parseFloat(amountInput.value);

  // Check if both fields are filled in
  if (itemName && !isNaN(itemAmount)) {
    // Update total spent
    totalSpent += itemAmount;

    // Track category spending (increase count for the category)
    if (!categoryCount[itemName]) {
      categoryCount[itemName] = 0;
    }
    categoryCount[itemName]++;

    // Set the last entered category
    lastCategory = itemName;

    // Create new expense item
    const newExpense = document.createElement("div");
    newExpense.classList.add("expense-item");
    newExpense.textContent = `${itemName}: $${itemAmount}`;

    // Add the new expense item to the log
    expenseLog.appendChild(newExpense);

    // Subtract the expense amount from the monthly budget
    monthlyBudget -= itemAmount;

    // Update the displayed monthly budget
    monthlyBudgetElement.textContent = `$${monthlyBudget.toFixed(2)}`;

    // Check for any alerts that need to be triggered
    updateImpulseAlert();

    // Reset the input fields
    itemInput.value = "";
    amountInput.value = "";
  } else {
    alert("Please enter both item and amount.");
  }
});

// Event listener for the simulate savings button
simulateButton.addEventListener("click", () => {
  const saveAmount = parseFloat(saveAmountInput.value);

  if (!isNaN(saveAmount) && saveAmount > 0) {
    // Subtract the saving amount from the monthly budget

    // Update the savings result message
    savingsResult.textContent = `You'd save $${saveAmount * 12} this year!`;

    // Update the UI for both total saved and monthly budget
    updateUI();
  } else {
    savingsResult.textContent = "Please enter a valid amount to save!";
  }
});
// Select the necessary elements for savings jar
const goalNameInput = document.querySelector("input[placeholder='Goal name']");
const targetAmountInput = document.querySelector(
  "input[placeholder='Target amount ($)']"
);
const putAwayInput = document.querySelector(
  "input[placeholder='Put away money ($)']"
);
const updateButton = document.querySelector(".savings-jar button");

const savingsGoalText = document.querySelector(".savings-jar h3");
const savingsText = document.querySelector(".savings-jar p");
const jarFill = document.querySelector(".jar-fill");

let totalSavedAmount = 0; // Initialize total saved amount

// Event listener for updating the savings jar
updateButton.addEventListener("click", function () {
  const goalName = goalNameInput.value.trim();
  const targetAmount = parseFloat(targetAmountInput.value);
  const putAwayAmount = parseFloat(putAwayInput.value);

  // Ensure input values are valid
  if (
    goalName &&
    !isNaN(targetAmount) &&
    targetAmount > 0 &&
    !isNaN(putAwayAmount) &&
    putAwayAmount > 0
  ) {
    // Update the goal name
    savingsGoalText.textContent = goalName;

    // Accumulate total saved amount
    totalSavedAmount += putAwayAmount;

    // Calculate the percentage of savings
    const percentageSaved = (totalSavedAmount / targetAmount) * 100;

    // Update savings text and jar fill
    savingsText.textContent = `$${totalSavedAmount} saved of $${targetAmount} (${Math.min(
      percentageSaved,
      100
    ).toFixed(2)}%)`;
    jarFill.style.height = `${Math.min(percentageSaved, 100)}%`;

    // Clear the input fields
    goalNameInput.value = "";
    targetAmountInput.value = "";
    putAwayInput.value = "";
  } else {
    alert(
      "Please enter valid values for goal name, target amount, and put away amount."
    );
  }
});
// Initial UI update
updateUI();
