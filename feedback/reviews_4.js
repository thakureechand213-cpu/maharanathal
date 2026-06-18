// reviews_4.js — 4-star review pool

const openers = [
  "Really enjoyed our visit.",
  "A great experience overall.",
  "Very pleasant time, would recommend.",
  "Solid meal with just a couple of small things to improve.",
  "Good food and service overall.",
];

const highMentions = [
  "The {highCategory} was excellent.",
  "We especially loved the {highCategory}.",
  "{highCategory} was a real highlight.",
];

const minorNotes = [
  "Only the {lowCategory} could use a little more attention.",
  "Just felt the {lowCategory} was slightly less impressive than the rest.",
  "",
];

const closers = [
  "Would happily come back!",
  "Recommended for a good meal out.",
  "Already looking forward to next time.",
  "A great choice overall.",
];

function buildPool() {
  const pool = new Set();
  let safety = 0;
  while (pool.size < 110 && safety < 3000) {
    safety++;
    const opener = openers[Math.floor(Math.random() * openers.length)];
    const high = highMentions[Math.floor(Math.random() * highMentions.length)];
    const minor = minorNotes[Math.floor(Math.random() * minorNotes.length)];
    const closer = closers[Math.floor(Math.random() * closers.length)];
    pool.add(`${opener} ${high} ${minor} ${closer}`.replace(/\s+/g, " ").trim());
  }
  return [...pool];
}

export const reviews4 = buildPool();
