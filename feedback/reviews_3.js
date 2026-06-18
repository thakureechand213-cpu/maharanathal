// reviews_3.js — 3-star review pool (balanced: mentions both a strength and a weakness)

const openers = [
  "Average experience overall.",
  "A fairly mixed visit.",
  "It was okay, nothing special.",
  "Decent for the price, with room to grow.",
  "Some good moments, some not so good.",
  "A middle-of-the-road visit.",
  "Neither great nor bad, just average.",
];

const balanced = [
  "Loved the {highCategory}, but the {lowCategory} needs attention.",
  "{highCategory} was great, though {lowCategory} fell short.",
  "Enjoyed the {highCategory}, while {lowCategory} was a bit underwhelming.",
  "{highCategory} stood out, but {lowCategory} let things down a little.",
  "{highCategory} was a highlight, though {lowCategory} could be better.",
  "Happy with the {highCategory}, less so with the {lowCategory}.",
];

const closers = [
  "Might give it another try.",
  "Could be great with a few tweaks.",
  "A fair experience, neither great nor bad.",
  "Worth trying again to see if things improve.",
  "On the fence about returning.",
  "Reasonable, but not memorable.",
];

function buildPool() {
  const pool = new Set();
  let safety = 0;
  while (pool.size < 110 && safety < 3000) {
    safety++;
    const opener = openers[Math.floor(Math.random() * openers.length)];
    const mid = balanced[Math.floor(Math.random() * balanced.length)];
    const closer = closers[Math.floor(Math.random() * closers.length)];
    pool.add(`${opener} ${mid} ${closer}`);
  }
  return [...pool];
}

export const reviews3 = buildPool();
