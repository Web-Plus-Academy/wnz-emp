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
      points: 20
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
    { name: "Welcome Kit + 5k bonus", threshold: 300 },
    { name: "Blutooth Band + 3k bonus", threshold: 600 },
    { name: "Bike", threshold: 1000 },
    { name: "Trip Abroad", threshold: 2000 }
  ];

  const pointsEl = document.getElementById("points");
  const progressFill = document.getElementById("progressFill");
  const achievementsEl = document.getElementById("achievements");
  const badgeContainer = document.getElementById("badgeContainer");

  pointsEl.textContent = emp.points;

  const maxPoints = rewards[rewards.length - 1].threshold;
  progressFill.style.width = (emp.points / maxPoints * 100) + "%";

  // Achievements
  achievementsEl.innerHTML = "";
rewards.forEach(reward => {
  const div = document.createElement("div");
  div.classList.add("achievement");

  // Create inner elements
  const rewardName = document.createElement("p");
  rewardName.innerHTML = `<b>Reward:</b> ${reward.name}`;

  const rewardPoints = document.createElement("p");
  rewardPoints.innerHTML = `<b>Points Required:</b> ${reward.threshold}`;

  const rewardBonus = document.createElement("p");
  rewardBonus.innerHTML = `<b>Bonus:</b> ${reward.bonus ? reward.bonus : "—"}`;

  const rewardStatus = document.createElement("p");
  rewardStatus.innerHTML = `<b>Status:</b> ${
    emp.points >= reward.threshold ? "✅ Unlocked" : "🔒 Locked"
  }`;

  // Append children
  div.appendChild(rewardPoints);
  div.appendChild(rewardName);
  div.appendChild(rewardBonus);
  div.appendChild(rewardStatus);

  // Add unlocked styling if achieved
  if (emp.points >= reward.threshold) {
    div.classList.add("unlocked");
  }

  achievementsEl.appendChild(div);
});


let badge = "";
let progressText = "";
let progressPercent = 0;

// Badge logic
if (emp.points >= 2000) {
  badge = `<img class="badge" src="./badges/gold.png" alt="Gold Badge" width="80">`;
  progressText = "You’ve unlocked the highest badge 🎉";
  progressPercent = 100;
} else if (emp.points >= 1000) {
  badge = `<img class="badge" src="./badges/bronze3.png" alt="Silver Badge" width="100">`;
  progressPercent = Math.floor((emp.points / 2000) * 100);
  progressText = `${progressPercent}% progress towards Gold Badge`;
} else if (emp.points >= 100) {
  badge = `<img class="badge" src="./badges/bronze.png" alt="Bronze Badge" width="80">`;
  progressPercent = Math.floor((emp.points / 1000) * 100);
  progressText = `${progressPercent}% progress towards Silver Badge`;
} else {
  badge = `<img class="badge" src="./badges/bronze1.png" alt="Starter Badge" `;
  progressPercent = Math.floor((emp.points / 100) * 100);
  progressText = `${progressPercent}% progress towards Bronze Badge`;
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

