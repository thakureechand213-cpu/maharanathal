// reviews_2.js — 2-star review pool

const openers = [
  "Below average experience overall.",
  "Not quite what we expected.",
  "A bit of a letdown this visit.",
  "Mixed feelings about this visit, leaning negative.",
  "Several things could have gone better.",
];

const lowComplaints = [
  "The {lowCategory} really needs work.",
  "{lowCategory} was disappointing.",
  "We weren't happy with the {lowCategory}.",
  "{lowCategory} brought the experience down.",
];

const highMentions = [
  "The {highCategory} was decent at least.",
  "{highCategory} was the one bright spot.",
];

const closers = [
  "Might think twice before coming back.",
  "Hoping for better next time.",
  "There's room for improvement here.",
  "Not our best experience at this place.",
];

function buildPool() {
  const pool = new Set();
  let safety = 0;
  while (pool.size < 110 && safety < 3000) {
    safety++;
    const opener = openers[Math.floor(Math.random() * openers.length)];
    const closer = closers[Math.floor(Math.random() * closers.length)];
    const complaint = lowComplaints[Math.floor(Math.random() * lowComplaints.length)];
    const useHigh = Math.random() < 0.5;
    if (useHigh) {
      const high = highMentions[Math.floor(Math.random() * highMentions.length)];
      pool.add(`${opener} ${complaint} ${high} ${closer}`);
    } else {
      pool.add(`${opener} ${complaint} ${closer}`);
    }
  }
  return [...pool];
}

export const reviews2 = buildPool();
