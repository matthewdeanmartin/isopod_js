let document;

export function setDocument(doc) {
  document = doc;
}

export const gameState = {
  currentLocation: "beach",
  inventory: [],
  foundItems: {
    hideout: false,
    cookie: false,
    friend: false,
  },
  map: {
    beach: {
      description:
        "You're on a sandy beach. You see some rocks to the north and a tidepool to the east.",
      exits: { north: "rocks", east: "tidepool" },
    },
    rocks: {
      description:
        "You're among some large rocks. The beach is to the south and there's a small cave to the west.",
      exits: { south: "beach", west: "cave" },
    },
    tidepool: {
      description:
        "You're in a shallow tidepool. The beach is to the west and there's seaweed to the north.",
      exits: { west: "beach", north: "seaweed" },
    },
    cave: {
      description: "You're in a small, dark cave. The rocks are to the east.",
      exits: { east: "rocks" },
    },
    seaweed: {
      description:
        "You're surrounded by swaying seaweed. The tidepool is to the south.",
      exits: { south: "tidepool" },
    },
  },
};

const items = {
  hideout: { location: "cave", description: "a perfect hiding spot" },
  cookie: { location: "beach", description: "a delicious cookie crumb" },
  friend: { location: "seaweed", description: "another isopod" },
};

export function displayMessage(message) {
  const output = document.getElementById("game-output");
  output.innerHTML += message + "<br>";
  output.scrollTop = output.scrollHeight;
}

export function processCommand() {
  const input = document.getElementById("user-input");
  const command = input.value.toLowerCase().trim();
  input.value = "";

  if (command === "inventory") {
    displayInventory();
  } else if (["north", "south", "east", "west"].includes(command)) {
    move(command);
  } else if (command === "look") {
    look();
  } else if (command.startsWith("take ")) {
    take(command.split(" ")[1]);
  } else {
    displayMessage(
      "I don't understand that command. Try 'look', 'inventory', 'take [item]', or a direction (north, south, east, west).",
    );
  }

  checkWinCondition();
}

export function displayInventory() {
  if (gameState.inventory.length === 0) {
    displayMessage("Your inventory is empty.");
  } else {
    displayMessage("Inventory: " + gameState.inventory.join(", "));
  }
}

export function move(direction) {
  const currentLocation = gameState.map[gameState.currentLocation];
  if (currentLocation.exits[direction]) {
    gameState.currentLocation = currentLocation.exits[direction];
    look();
  } else {
    displayMessage("You can't go that way.");
  }
}

export function look() {
  const location = gameState.map[gameState.currentLocation];
  displayMessage(location.description);

  for (const [itemName, item] of Object.entries(items)) {
    if (
      item.location === gameState.currentLocation &&
      !gameState.inventory.includes(itemName) &&
      !gameState.foundItems[itemName]
    ) {
      displayMessage(`You see ${item.description} here.`);
    }
  }
}

export function take(item) {
  if (
    items[item] &&
    items[item].location === gameState.currentLocation &&
    !gameState.inventory.includes(item) &&
    !gameState.foundItems[item]
  ) {
    gameState.inventory.push(item);
    gameState.foundItems[item] = true;
    displayMessage(`You take the ${item}.`);
  } else {
    displayMessage("You can't take that.");
  }
}

export function checkWinCondition() {
  if (Object.values(gameState.foundItems).every((item) => item)) {
    displayMessage(
      "Congratulations! You've found a hiding spot, a cookie crumb, and an isopod friend. You win!",
    );
  }
}

export function init() {
  // Initialize the game
  displayMessage(
    "Welcome to Isopod Adventure! You're a small isopod on a mission to find a place to hide, a cookie crumb, and another isopod friend.",
  );
  displayMessage(
    "Type 'look' to see where you are, 'inventory' to check your items, 'take [item]' to collect something, or a direction (north, south, east, west) to move.",
  );
  look();
}
