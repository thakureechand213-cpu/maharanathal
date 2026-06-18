// reviews_5.js — 5-star review pool

const openers = [
  "Absolutely fantastic experience!",
  "Couldn't have asked for better.",
  "Outstanding from start to finish.",
  "One of the best meals we've had.",
  "Everything was simply perfect.",
];

const highMentions = [
  "The {highCategory} was out of this world.",
  "We were blown away by the {highCategory}.",
  "{highCategory} was absolutely delicious.",
  "The staff made us feel right at home.",
];

const closers = [
  "Will definitely be back!",
  "Highly recommend to everyone.",
  "Already planning our next visit.",
  "Worth every penny.",
  "Five stars, no question.",
];

function buildPool() {
  const pool = new Set();
  let safety = 0;
  while (pool.size < 110 && safety < 3000) {
    safety++;
    const opener = openers[Math.floor(Math.random() * openers.length)];
    const high = highMentions[Math.floor(Math.random() * highMentions.length)];
    const closer = closers[Math.floor(Math.random() * closers.length)];
    pool.add(`${opener} ${high} ${closer}`);
  }
  return [...pool];
}

export const reviews5 = buildPool();
