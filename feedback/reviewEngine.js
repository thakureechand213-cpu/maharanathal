// reviewEngine.js
// Core logic: turn the guest's per-category star ratings into one
// auto-filled, editable review sentence.

import { reviews1 } from "./reviews_1.js";
import { reviews2 } from "./reviews_2.js";
import { reviews3 } from "./reviews_3.js";
import { reviews4 } from "./reviews_4.js";
import { reviews5 } from "./reviews_5.js";

const POOLS = {
  1: reviews1,
  2: reviews2,
  3: reviews3,
  4: reviews4,
  5: reviews5,
};

// Human-readable labels for each category id, used to fill placeholders.
// Keep these in sync with the `categories` array in index.html.
const CATEGORY_LABELS = {
  welcomeDrink: "Welcome Drink",
  farsan: "Farsan",
  sabji: "Sabji",
  roti: "Roti",
  rice: "Rice",
  dal: "Dal",
  sweet: "Sweet",
  staffBehaviour: "Staff Behaviour",
};

/**
 * Calculates the average rating across all CATEGORIES THE GUEST ACTUALLY RATED.
 * Categories left at 0 (untouched) are excluded — including them would
 * unfairly drag the average down just because the guest skipped a category.
 */
function calculateAverage(ratingsState) {
  const ratedValues = Object.values(ratingsState).filter((v) => v > 0);
  if (ratedValues.length === 0) return 0;
  const sum = ratedValues.reduce((a, b) => a + b, 0);
  return sum / ratedValues.length;
}

/**
 * Finds the highest and lowest rated categories (by value).
 * Only considers categories the guest actually rated (> 0).
 * Returns category LABELS (not ids) ready to drop into a sentence.
 * If there's a tie or too few rated categories, falls back gracefully.
 */
function findHighLow(ratingsState) {
  const rated = Object.entries(ratingsState).filter(([, v]) => v > 0);

  if (rated.length === 0) {
    return { highCategory: "the food", lowCategory: "the food" };
  }

  let highest = rated[0];
  let lowest = rated[0];

  for (const entry of rated) {
    if (entry[1] > highest[1]) highest = entry;
    if (entry[1] < lowest[1]) lowest = entry;
  }

  return {
    highCategory: CATEGORY_LABELS[highest[0]] || "the food",
    lowCategory: CATEGORY_LABELS[lowest[0]] || "the food",
  };
}

/**
 * Decides which whole-star pool to draw from, given a possibly-fractional average.
 * - Whole number average (e.g. 4.0) -> that pool directly.
 * - .5 average (e.g. 3.5) -> 50/50 coin flip between the lower and upper pool.
 *   This matters because a guest who averages 3.5 is genuinely "between"
 *   3-star and 4-star sentiment, so the review tone should reflect that
 *   uncertainty too, not always round the same direction.
 */
function pickPoolRating(average) {
  const rounded = Math.round(average * 2) / 2; // snap to nearest 0.5
  const isHalf = rounded % 1 !== 0;

  if (!isHalf) {
    // Clamp into 1-5 range just in case
    return Math.min(5, Math.max(1, rounded));
  }

  const lower = Math.floor(rounded);
  const upper = Math.ceil(rounded);
  const coinFlip = Math.random() < 0.5;
  const chosen = coinFlip ? lower : upper;
  return Math.min(5, Math.max(1, chosen));
}

/**
 * Fills {placeholders} in a template string with real values.
 */
function fillTemplate(template, values) {
  let text = template;
  text = text.replaceAll("{highCategory}", values.highCategory);
  text = text.replaceAll("{lowCategory}", values.lowCategory);
  // Clean up any double spaces left behind by removed placeholders
  return text.replace(/\s+/g, " ").trim();
}

/**
 * Main export: given the guest's ratingsState object,
 * returns a ready-to-use review string.
 */
export function generateReview(ratingsState) {
  const average = calculateAverage(ratingsState);

  if (average === 0) {
    return ""; // nothing rated yet, leave the field empty
  }

  const poolRating = pickPoolRating(average);
  const pool = POOLS[poolRating];
  const template = pool[Math.floor(Math.random() * pool.length)];

  const { highCategory, lowCategory } = findHighLow(ratingsState);

  return fillTemplate(template, { highCategory, lowCategory });
}

/**
 * Exposed for debugging / display purposes if you want to show the
 * guest their computed average somewhere in the UI (e.g. "3.5 ★ average").
 */
export function getAverageRating(ratingsState) {
  return calculateAverage(ratingsState);
}
