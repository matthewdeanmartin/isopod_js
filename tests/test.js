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

  test("move() should change location if direction is valid", () => {
    move("north");
    expect(gameState.currentLocation).toBe("rocks");
  });

  test("move() should not change location if direction is invalid", () => {
    move("west");
    expect(gameState.currentLocation).toBe("beach");
  });

  test("take() should add an item to inventory if it is in the current location", () => {
    // Move to the 'seaweed' location to pick up 'friend'
    gameState.currentLocation = "seaweed";
    take("friend");
    expect(gameState.inventory).toContain("friend");
    expect(gameState.foundItems.friend).toBe(true);
  });

  test("take() should not add an item to inventory if it is not in the current location", () => {
    // Try to pick up 'cookie' while at 'rocks'
    gameState.currentLocation = "rocks";
    take("cookie");
    expect(gameState.inventory).not.toContain("cookie");
  });

  test("checkWinCondition() should not declare a win if all items are not found", () => {
    checkWinCondition();
    expect(displayMessage).not.toHaveBeenCalledWith(
      "Congratulations! You've found a hiding spot, a cookie crumb, and an isopod friend. You win!",
    );
  });
});
