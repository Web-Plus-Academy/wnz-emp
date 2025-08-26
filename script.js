// ----------------- Employee Dataset -----------------
  const employees = {
    "WNSR01": {
      name: "Mandapalli Deva Sai Nandini",
      role: "Cyber Security Trainer | Campus ambassador",
      email: "devasainandinimandapalli@gmail.com",
      phone: "+91 9392194979",
      location: "2-250-C-6-1, Madanapalle, Andhra Pradesh",
      photo: "https://res.cloudinary.com/dqg8ameoa/image/upload/v1756016597/Black_and_Gold_Luxury_Achievement_Certificate_ejugi7.png",
      payouts: [
        { month: "September 2025", amount: 2800, status: "Pending" }
      ],
      points: 10
    },
    "WNSR02": {
      name: "Priya R",
      role: "UI/UX Designer",
      // department: "Design",
      email: "priya@example.com",
      phone: "+91 98765 11111",
      location: "Chennai, India",
      photo: "https://i.pravatar.cc/150?img=5",
      payouts: [
        { month: "January 2025", amount: 60000, status: "Paid" },
        { month: "February 2025", amount: 60500, status: "Paid" },
        { month: "March 2025", amount: 61000, status: "Pending" }
      ],
      points: 1100
    }
  };

  // ----------------- Get Employee ID from URL -----------------
  const urlParams = new URLSearchParams(window.location.search);
  const empId = urlParams.get("empId"); // fallback

  const emp = employees[empId];
  if (!emp) {
    document.body.innerHTML = `<h2 style="text-align:center;color:red;">❌ Employee not found</h2>`;
    throw new Error("Employee not found");
  }

  // ----------------- Render Profile -----------------
  document.querySelector(".profile-header img").src = emp.photo;
  document.querySelector(".profile-header h2").textContent = emp.name;
  document.querySelector(".profile-header p").textContent = emp.role;

  const infoItems = document.querySelectorAll(".info-item span");
  infoItems[0].textContent = empId;
  // infoItems[1].textContent = emp.department;
  infoItems[1].textContent = emp.email;
  infoItems[2].textContent = emp.phone;
  infoItems[3].textContent = emp.location;

  // ----------------- Render Payouts -----------------
  const tableBody = document.getElementById("payoutTable");
  let total = 0;
  emp.payouts.forEach(payout => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${payout.month}</td>
      <td>₹${payout.amount.toLocaleString()}</td>
      <td class="status-${payout.status.toLowerCase()}">${payout.status}</td>
    `;
    tableBody.appendChild(row);

    if (payout.status === "Paid") total += payout.amount;
  });
  document.getElementById("totalEarned").textContent = "Total Earned: ₹" + total.toLocaleString();

  // ----------------- Task Tracker -----------------

  const rewards = [
  { threshold: 300,  badge: "Bronze 1",  amount: "₹3,000", reward: "Welcome Kit",      rewardCost: "₹1,000", bonus: "₹500",   totalWorth: "₹4,500",   number: 1 },
  { threshold: 600,  badge: "Bronze 2",  amount: "₹3,000", reward: "Blutooth Band",    rewardCost: "₹1,500", bonus: "₹500",   totalWorth: "₹5,000",   number: 2 },
  { threshold: 1000, badge: "Bronze 3",  amount: "₹4,000", reward: "Powerbank",        rewardCost: "₹2,000", bonus: "₹700",   totalWorth: "₹6,700",   number: 3 },
  { threshold: 1600, badge: "Silver 1",  amount: "₹6,000", reward: "Keyboard + Mouse", rewardCost: "₹3,500", bonus: "₹1,000", totalWorth: "₹10,500",  number: 4 },
  { threshold: 2300, badge: "Silver 2",  amount: "₹7,000", reward: "Air Pods",         rewardCost: "₹4,000", bonus: "₹1,200", totalWorth: "₹12,200",  number: 5 },
  { threshold: 3100, badge: "Silver 3",  amount: "₹8,000", reward: "Webcam",           rewardCost: "₹5,000", bonus: "₹1,300", totalWorth: "₹14,300",  number: 6 },
  { threshold: 4100, badge: "Gold 1",    amount: "₹10,000", reward: "Smart Watch",     rewardCost: "₹7,000", bonus: "₹1,500", totalWorth: "₹18,500",  number: 7 },
  { threshold: 6100, badge: "Gold 2",    amount: "₹20,000", reward: "Tab",             rewardCost: "₹15,000",bonus: "₹2,500", totalWorth: "₹37,500",  number: 8 },
  { threshold: 8800, badge: "Gold 3",    amount: "₹27,000", reward: "Smart Phone",     rewardCost: "₹22,000",bonus: "₹3,000", totalWorth: "₹52,000",  number: 9 },
  { threshold: 13800,badge: "Platinum 1",amount: "₹50,000", reward: "Desktop Setup",   rewardCost: "₹40,000",bonus: "₹4,500", totalWorth: "₹94,500",  number: 10 },
  { threshold: 19800,badge: "Platinum 2",amount: "₹60,000", reward: "iPad",            rewardCost: "₹50,000",bonus: "₹5,000", totalWorth: "₹115,000", number: 11 },
  { threshold: 27800,badge: "Platinum 3",amount: "₹80,000", reward: "iPhone",          rewardCost: "₹60,000",bonus: "₹7,000", totalWorth: "₹147,000", number: 12 },
  { threshold: 37800,badge: "Diamond",   amount: "₹100,000",reward: "Laptop",          rewardCost: "₹70,000",bonus: "₹10,000",totalWorth: "₹180,000", number: 13 },
  { threshold: 57800,badge: "RUBY",      amount: "₹200,000",reward: "MacBook",         rewardCost: "₹100,000",bonus: "₹30,000",totalWorth: "₹330,000",number: 14 }
];

const pointsEl = document.getElementById("points");
const progressFill = document.getElementById("progressFill");
const achievementsEl = document.getElementById("achievements");
const badgeContainer = document.getElementById("badgeContainer");

pointsEl.textContent = emp.points;

// Progress bar relative to last reward
const maxPoints = rewards[rewards.length - 1].threshold;
progressFill.style.width = (emp.points / maxPoints * 100) + "%";

// Achievements rendering
achievementsEl.innerHTML = "";
rewards.forEach(reward => {
  const div = document.createElement("div");
  div.classList.add("achievement");

  const rewardPoints = document.createElement("p");
  rewardPoints.innerHTML = `<b>Points Required:</b> ${reward.threshold}`;

  const rewardBadge = document.createElement("p");
  rewardBadge.innerHTML = `<b>Badge:</b> ${reward.badge}`;

  const rewardName = document.createElement("p");
  rewardName.innerHTML = `<b>Reward:</b> ${reward.reward}`;

  const rewardCost = document.createElement("p");
  rewardCost.innerHTML = `<b>Reward Cost:</b> ${reward.rewardCost}`;

  const rewardBonus = document.createElement("p");
  rewardBonus.innerHTML = `<b>Bonus:</b> ${reward.bonus}`;

  const rewardWorth = document.createElement("p");
  rewardWorth.innerHTML = `<b>Total Partner Worth:</b> ${reward.totalWorth}`;

  const rewardStatus = document.createElement("p");
  rewardStatus.innerHTML = `<b>Status:</b> ${emp.points >= reward.threshold ? "✅ Unlocked" : "🔒 Locked"}`;

  div.appendChild(rewardPoints);
  div.appendChild(rewardBadge);
  div.appendChild(rewardName);
  div.appendChild(rewardCost);
  div.appendChild(rewardBonus);
  div.appendChild(rewardWorth);
  div.appendChild(rewardStatus);

  if (emp.points >= reward.threshold) {
    div.classList.add("unlocked");
  }

  achievementsEl.appendChild(div);
});



let badge = "";
let progressText = "";
let progressPercent = 0;

// Badge logic
if (emp.points >= 57800) {
  badge = `<img class="badge" src="./badges/ruby.png" alt="RUBY Badge" width="120">`;
  progressText = "🎉 You’ve unlocked the highest badge (RUBY)!";
  progressPercent = 100;
} else if (emp.points >= 37800) {
  badge = `<img class="badge" src="./badges/diamond.png" alt="Diamond Badge" width="110">`;
  progressPercent = Math.floor((emp.points / 57800) * 100);
  progressText = `${progressPercent}% progress towards RUBY Badge`;
} else if (emp.points >= 27800) {
  badge = `<img class="badge" src="./badges/platinum3.png" alt="Platinum 3 Badge" width="110">`;
  progressPercent = Math.floor((emp.points / 37800) * 100);
  progressText = `${progressPercent}% progress towards Diamond Badge`;
} else if (emp.points >= 19800) {
  badge = `<img class="badge" src="./badges/platinum2.png" alt="Platinum 2 Badge" width="110">`;
  progressPercent = Math.floor((emp.points / 27800) * 100);
  progressText = `${progressPercent}% progress towards Platinum 3 Badge`;
} else if (emp.points >= 13800) {
  badge = `<img class="badge" src="./badges/platinum1.png" alt="Platinum 1 Badge" width="110">`;
  progressPercent = Math.floor((emp.points / 19800) * 100);
  progressText = `${progressPercent}% progress towards Platinum 2 Badge`;
} else if (emp.points >= 8800) {
  badge = `<img class="badge" src="./badges/gold3.png" alt="Gold 3 Badge" width="100">`;
  progressPercent = Math.floor((emp.points / 13800) * 100);
  progressText = `${progressPercent}% progress towards Platinum 1 Badge`;
} else if (emp.points >= 6100) {
  badge = `<img class="badge" src="./badges/gold2.png" alt="Gold 2 Badge" width="100">`;
  progressPercent = Math.floor((emp.points / 8800) * 100);
  progressText = `${progressPercent}% progress towards Gold 3 Badge`;
} else if (emp.points >= 4100) {
  badge = `<img class="badge" src="./badges/gold1.png" alt="Gold 1 Badge" width="100">`;
  progressPercent = Math.floor((emp.points / 6100) * 100);
  progressText = `${progressPercent}% progress towards Gold 2 Badge`;
} else if (emp.points >= 3100) {
  badge = `<img class="badge" src="./badges/silver3.png" alt="Silver 3 Badge" width="90">`;
  progressPercent = Math.floor((emp.points / 4100) * 100);
  progressText = `${progressPercent}% progress towards Gold 1 Badge`;
} else if (emp.points >= 2300) {
  badge = `<img class="badge" src="./badges/silver2.png" alt="Silver 2 Badge" width="90">`;
  progressPercent = Math.floor((emp.points / 3100) * 100);
  progressText = `${progressPercent}% progress towards Silver 3 Badge`;
} else if (emp.points >= 1600) {
  badge = `<img class="badge" src="./badges/silver1.png" alt="Silver 1 Badge" width="90">`;
  progressPercent = Math.floor((emp.points / 2300) * 100);
  progressText = `${progressPercent}% progress towards Silver 2 Badge`;
} else if (emp.points >= 1000) {
  badge = `<img class="badge" src="./badges/bronze3.png" alt="Bronze 3 Badge" width="80">`;
  progressPercent = Math.floor((emp.points / 1600) * 100);
  progressText = `${progressPercent}% progress towards Silver 1 Badge`;
} else if (emp.points >= 600) {
  badge = `<img class="badge" src="./badges/bronze2.png" alt="Bronze 2 Badge" width="80">`;
  progressPercent = Math.floor((emp.points / 1000) * 100);
  progressText = `${progressPercent}% progress towards Bronze 3 Badge`;
} else if (emp.points >= 300) {
  badge = `<img class="badge" src="./badges/bronze1.png" alt="Bronze 1 Badge" width="80">`;
  progressPercent = Math.floor((emp.points / 600) * 100);
  progressText = `${progressPercent}% progress towards Bronze 2 Badge`;
} else {
  badge = `<img class="badge" src="./badges/starter.png" alt="Starter Badge" width="70">`;
  progressPercent = Math.floor((emp.points / 300) * 100);
  progressText = `${progressPercent}% progress towards Bronze 1 Badge`;
}


// Render
document.getElementById("badgeContainer").innerHTML = `
  <div class="badge-block">
    ${badge}
    <p>${progressText}</p>
    <div style="background:#eee; border-radius:10px; height:15px; width:200px; overflow:hidden;">
      <div style="background:#4caf50; height:15px; width:${progressPercent}%;"></div>
    </div>
  </div>
`;



// Clear old
achievementsEl.innerHTML = "";

// Separate unlocked and locked
const unlocked = rewards.filter(r => emp.points >= r.threshold);
const locked = rewards.filter(r => emp.points < r.threshold);

// Next achievement = the first locked one
let nextAchievement = locked.length > 0 ? locked[0] : null;

// New order: [Next Achievement] + [Remaining Locked (after next)] + [Unlocked (completed)]
let orderedRewards = [];
if (nextAchievement) {
  orderedRewards.push(nextAchievement); // always show next target first
  orderedRewards = orderedRewards.concat(locked.slice(1)); // rest of locked
}
orderedRewards = orderedRewards.concat(unlocked); // push completed to last

// Render in order
orderedRewards.forEach(reward => {
  const div = document.createElement("div");
  div.classList.add("achievement");

  const rewardPoints = document.createElement("p");
  rewardPoints.innerHTML = `<b>Points Required:</b> ${reward.threshold}`;

  const rewardBadge = document.createElement("p");
  rewardBadge.innerHTML = `<b>Badge:</b> ${reward.badge}`;

  const rewardName = document.createElement("p");
  rewardName.innerHTML = `<b>Reward:</b> ${reward.reward}`;

  const rewardCost = document.createElement("p");
  rewardCost.innerHTML = `<b>Reward Cost:</b> ${reward.rewardCost}`;

  const rewardBonus = document.createElement("p");
  rewardBonus.innerHTML = `<b>Bonus:</b> ${reward.bonus}`;

  const rewardWorth = document.createElement("p");
  rewardWorth.innerHTML = `<b>Total Partner Worth:</b> ${reward.totalWorth}`;

  const rewardStatus = document.createElement("p");
  rewardStatus.innerHTML = `<b>Status:</b> ${emp.points >= reward.threshold ? "✅ Unlocked" : "🔒 Locked"}`;

  div.appendChild(rewardPoints);
  div.appendChild(rewardBadge);
  div.appendChild(rewardName);
  div.appendChild(rewardCost);
  div.appendChild(rewardBonus);
  div.appendChild(rewardWorth);
  div.appendChild(rewardStatus);

  // Styling
  if (emp.points >= reward.threshold) {
    div.classList.add("unlocked");
  } else if (reward === nextAchievement) {
    div.classList.add("next"); // highlight upcoming achievement
  }

  achievementsEl.appendChild(div);
});


// Badge logic
if (emp.points >= 2000) {
  badge = `<img class="badge" src="./badges/gold.png" alt="Gold Badge" width="80">`;
  progressText = "You’ve unlocked the highest badge 🎉";
  progressPercent = 100;
  showPopup("🎉 Congratulations! You unlocked the 'Gold Badge' 🏆");
} else if (emp.points >= 1000) {
  badge = `<img class="badge" src="./badges/bronze3.png" alt="Silver Badge" width="100">`;
  progressPercent = Math.floor((emp.points / 2000) * 100);
  progressText = `${progressPercent}% progress towards Gold Badge`;

  if (emp.points === 1000) {
    showPopup("🥈 Congratulations! You unlocked the **Silver Badge** 🎊");
  }
} else if (emp.points >= 100) {
  badge = `<img class="badge" src="./badges/bronze.png" alt="Bronze Badge" width="80">`;
  progressPercent = Math.floor((emp.points / 1000) * 100);
  progressText = `${progressPercent}% progress towards Silver Badge`;

  if (emp.points === 100) {
    showPopup("🥉 Congratulations! You unlocked the **Bronze Badge** 🎊");
  }
} else {
  badge = `<img class="badge" src="./badges/bronze1.png" alt="Starter Badge" width="70">`;
  progressPercent = Math.floor((emp.points / 100) * 100);
  progressText = `${progressPercent}% progress towards Bronze Badge`;
}


function showPopup(message) {
  const popup = document.createElement("div");
  popup.className = "popup";
  popup.innerHTML = `
    <div class="popup-content">
      <span class="close-btn">&times;</span>
      <p>${message}</p>
    </div>
  `;
  document.body.appendChild(popup);

  // Close on click
  popup.querySelector(".close-btn").addEventListener("click", () => {
    popup.remove();
  });

  // Auto close after 4 seconds
  setTimeout(() => popup.remove(), 4000);
}
