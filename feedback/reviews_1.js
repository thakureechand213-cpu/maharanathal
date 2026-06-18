// reviews_1.js — 1-star review pool
// Generated via small template/word-bank combos to reach 100+ unique lines.
// Replace or extend freely — just keep the same export name and placeholder syntax.

const openers = [
  "Very disappointing visit.",
  "Not a good experience at all.",
  "Honestly quite upset with this visit.",
  "Would not recommend based on this experience.",
  "Service and food both fell short.",
  "Really let down this time.",
];

const lowComplaints = [
  "The {lowCategory} was particularly bad.",
  "{lowCategory} needs serious improvement.",
  "We were unhappy with the {lowCategory}.",
  "{lowCategory} ruined the experience for us.",
];

const closers = [
  "Won't be returning anytime soon.",
  "Hope management takes this seriously.",
  "Expected much better for the price.",
  "A complete waste of money.",
  "Hard to recommend to anyone.",
];

const plain = [
  "Overall a forgettable and frustrating visit.",
  "Multiple things went wrong during our visit.",
  "Far below what we expected from this place.",
];

function buildPool() {
  const pool = new Set();
  let safety = 0;
  while (pool.size < 110 && safety < 3000) {
    safety++;
    const useLow = Math.random() < 0.7;
    const opener = openers[Math.floor(Math.random() * openers.length)];
    const closer = closers[Math.floor(Math.random() * closers.length)];
    if (useLow) {
      const complaint = lowComplaints[Math.floor(Math.random() * lowComplaints.length)];
      pool.add(`${opener} ${complaint} ${closer}`);
    } else {
      const p = plain[Math.floor(Math.random() * plain.length)];
      pool.add(`${opener} ${p} ${closer}`);
    }
  }
  return [...pool];
}

export const reviews1 = buildPool();
