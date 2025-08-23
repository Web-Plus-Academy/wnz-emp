
  // ----------------- Employee Dataset -----------------
  const employees = {
    "WNZ0001": {
      name: "Saran Velmurugan",
      role: "Senior Software Engineer | Full Stack Development",
      department: "Engineering",
      email: "saran@example.com",
      phone: "+91 98765 43210",
      location: "Bangalore, India",
      photo: "https://i.pravatar.cc/150?img=3",
      payouts: [
        { month: "January 2025", amount: 75000, status: "Paid" },
        { month: "February 2025", amount: 76000, status: "Paid" },
        { month: "March 2025", amount: 1, status: "Pending" }
      ],
      points: 599
    },
    "WNZ0002": {
      name: "Priya R",
      role: "UI/UX Designer",
      department: "Design",
      email: "priya@example.com",
      phone: "+91 98765 11111",
      location: "Chennai, India",
      photo: "https://i.pravatar.cc/150?img=5",
      payouts: [
        { month: "January 2025", amount: 60000, status: "Paid" },
        { month: "February 2025", amount: 60500, status: "Paid" },
        { month: "March 2025", amount: 61000, status: "Pending" }
      ],
      points: 2100
    }
  };

  // ----------------- Get Employee ID from URL -----------------
  const urlParams = new URLSearchParams(window.location.search);
  const empId = urlParams.get("empId") || "EMP-10245"; // fallback

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
  infoItems[1].textContent = emp.department;
  infoItems[2].textContent = emp.email;
  infoItems[3].textContent = emp.phone;
  infoItems[4].textContent = emp.location;

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
    { name: "Phone", threshold: 300 },
    { name: "Laptop", threshold: 600 },
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
    div.textContent = `${reward.name} – ${reward.threshold} points`;
    if (emp.points >= reward.threshold) {
      div.classList.add("unlocked");
      div.textContent += " ✅ Unlocked";
    }
    achievementsEl.appendChild(div);
  });

  // Badge Logic
  let badge = "";
  if (emp.points >= 2000) {
    badge = `<span class="badge silver">🥈 Silver Badge</span>`;
  } else if (emp.points >= 100) {
    badge = `<span class="badge bronze">🥉 Bronze Badge</span>`;
  }
  badgeContainer.innerHTML = badge;
