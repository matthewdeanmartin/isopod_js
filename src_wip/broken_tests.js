/**
 * @jest-environment jsdom
 */

import { JSDOM } from "jsdom";

// Mock the displayMessage function to prevent actual DOM manipulation during tests
jest.mock("../src/game.js", () => {
  const originalModule = jest.requireActual("../src/game.js");
  let x = {
    ...originalModule,
    displayMessage: jest.fn(),
  };
  return x;
});

import {
  gameState,
  move,
  look,
  take,
  displayInventory,
  checkWinCondition,
  displayMessage,
  setDocument,
} from "../src/game.js";

describe("Game Functions", () => {
  let dom;
  let document;

  beforeEach(async () => {
    // Set up our document body with a mock #game-output element
    dom = await JSDOM.fromFile("src/index.html");
    document = dom.window.document;
    // document.body.innerHTML = `
    //   <div id="game-output"></div>
    // `;

    setDocument(document);
    // Reset the game state before each test
    gameState.currentLocation = "beach";
    gameState.inventory = [];
    gameState.foundItems = { hideout: false, cookie: false, friend: false };
  });

  test("look() should display the correct description for the current location", () => {
    look();
    expect(displayMessage).toHaveBeenCalledWith(
      "You're on a sandy beach. You see some rocks to the north and a tidepool to the east.",
    );
  });

  test("displayInventory() should show an empty inventory message when no items are collected", () => {
    displayInventory();
    expect(displayMessage).toHaveBeenCalledWith("Your inventory is empty.");
  });

  test("displayInventory() should show collected items in the inventory", () => {
    gameState.inventory.push("cookie");
    displayInventory();
    expect(displayMessage).toHaveBeenCalledWith("Inventory: cookie");
  });

  test("checkWinCondition() should declare a win if all items are found", () => {
    gameState.foundItems = { hideout: true, cookie: true, friend: true };
    checkWinCondition();
    expect(displayMessage).toHaveBeenCalledWith(
      "Congratulations! You've found a hiding spot, a cookie crumb, and an isopod friend. You win!",
    );
  });
});
