const state = { spins: [] };
let streakTrigger = 5;
let dozenStreakTrigger = streakTrigger + 6;
let columnStreakTrigger = streakTrigger + 6;

const slider = document.getElementById("streakSlider");
const streakLabel = document.getElementById("streakValue");
slider.addEventListener("input", () => {
  streakTrigger = parseInt(slider.value);
  dozenStreakTrigger = streakTrigger + 6;
  streakLabel.innerText = streakTrigger;
  render();
});

function getColor(n) {
  if (n === 0) return "Green";
  const r = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
  return r.includes(n) ? "Red" : "Black";
}

function getColumn(n) {
  if (n === 0) return null; // 0 does not belong to any column
  const mod = n % 3;
  if (mod === 1) return 1;
  if (mod === 2) return 2;
  return 3; // mod === 0
}

function getDozen(n) {
  return n === 0 ? null : Math.floor((n - 1) / 12) + 1;
}

function getDozenAbsenceStreaks() {
  const result = { 1: 0, 2: 0, 3: 0 };

  for (const d of [1, 2, 3]) {
    let count = 0;
    for (let i = state.spins.length - 1; i >= 0; i--) {
      const spinDozen = state.spins[i].dozen;
      if (spinDozen === d) {
        break;
      } else {
        count++;
      }
    }

    result[d] = count;
  }

  return result;
}

function getColumnAbsenceStreaks() {
  const result = { 1: 0, 2: 0, 3: 0 };

  for (const c of [1, 2, 3]) {
    let count = 0;
    for (let i = state.spins.length - 1; i >= 0; i--) {
      const spinColumn = state.spins[i].column;
      if (spinColumn === c) {
        break;
      } else {
        count++;
      }
    }
    result[c] = count;
  }

  return result;
}

function getStreak(prop) {
  if (state.spins.length === 0) return null;
  let streakValue = state.spins[state.spins.length - 1][prop];
  let count = 0;
  for (let i = state.spins.length - 1; i >= 0; i--) {
    if (state.spins[i][prop] === streakValue) count++;
    else break;
  }
  return { value: streakValue, count };
}

function suggestBet() {
  const suggestions = [];

  // Dozen streak
  const dozenStreak = getStreak("dozen");
  if (dozenStreak.count >= streakTrigger) {
    const bet = [1, 2, 3].filter((d) => d != dozenStreak.value);
    suggestions.push(`Dozen streak: Bet ${bet.join(" and ")} (streak ${dozenStreak.count} on ${dozenStreak.value}° dozen)`);
  }

  // Color streak
  const colorStreak = getStreak("color");
  if (colorStreak.count >= streakTrigger && colorStreak.value !== "Green") {
    const opposite = colorStreak.value === "Red" ? "Black" : "Red";
    suggestions.push(`Color streak: Bet ${opposite} (streak ${colorStreak.count} ${colorStreak.value})`);
  }

  // Odd/Even streak
  const evenStreak = getStreak("isEven");
  if (evenStreak.count >= streakTrigger && evenStreak.value !== null) {
    suggestions.push(`Odd/Even streak: Bet ${evenStreak.value ? "Odd" : "Even"} (streak ${evenStreak.count})`);
  }

  // High/Low streak
  const highStreak = getStreak("isHigh");
  if (highStreak.count >= streakTrigger && highStreak.value !== null) {
    suggestions.push(`High/Low streak: Bet ${highStreak.value ? "1-18" : "19-36"} (streak ${highStreak.count})`);
  }

  // Dozen absence
  const dozenAbsenceStreaks = getDozenAbsenceStreaks();
  for (const dozen in dozenAbsenceStreaks) {
    const streak = dozenAbsenceStreaks[dozen];
    if (streak >= dozenStreakTrigger) {
      suggestions.push(`Dozen absence: Bet ${dozen}° dozen (streak ${streak})`);
    }
  }

  // Column absence
  const columnAbs = getColumnAbsenceStreaks();
  for (const col in columnAbs) {
    const streak = columnAbs[col];
    if (streak >= columnStreakTrigger) {
      suggestions.push(`Column absence: Bet ${col}° column (streak ${streak})`);
    }
  }

  if (suggestions.length === 0) return "No strong signal yet.";
  return suggestions.join("\n");
}

function addSpin(n) {
  const spin = {
    number: n,
    color: getColor(n),
    dozen: getDozen(n),
    column: getColumn(n),
    isEven: n === 0 ? null : n % 2 === 0,
    isHigh: n === 0 ? null : n > 18,
  };
  state.spins.push(spin);
  render();
}

function render() {
  const suggestions = suggestBet(); 
  const recent = state.spins
    .slice(-20)
    .reverse()
    .map((s) => `${s.number} (${s.color}, D${s.dozen || "-"})`)
    .join("\n");
  document.getElementById("log").innerText = `${suggestions}\n\nLast spins:\n${recent}`;
}

const input = document.getElementById("numberInput");
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const value = input.value.trim();
    if (value === "-1") {
      // Remove the last spin
      if (state.spins.length > 0) {
        state.spins.pop();
        render();
      }
    } else {
      const n = parseInt(value);
      if (!isNaN(n) && n >= 0 && n <= 36) {
        addSpin(n);
      }
    }
    input.value = "";
  }
});
