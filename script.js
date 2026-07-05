const marketplaceData = [
  {
    tag: "Diagnostics",
    title: "Advanced Longevity Panel",
    text: "65 biomarkers with physician-reviewed interpretation.",
    price: "$920"
  },
  {
    tag: "Therapy",
    title: "NAD+ Recovery Protocol",
    text: "In-clinic infusion package with tailored recovery support.",
    price: "$1,250"
  },
  {
    tag: "Retreat",
    title: "Alpine Performance Week",
    text: "7-day reset with cold thermogenesis and oxygen optimization.",
    price: "$6,800"
  },
  {
    tag: "Supplements",
    title: "Precision Stack Kit",
    text: "Personalized foundational stack shipped monthly.",
    price: "$290/mo"
  }
];

const marketGrid = document.getElementById("marketGrid");

if (marketGrid) {
  marketplaceData.forEach((item) => {
    const card = document.createElement("article");
    card.className = "market-card";
    card.innerHTML = `
      <div class="market-image"><span>${item.tag}</span></div>
      <div class="market-body">
        <h3>${item.title}</h3>
        <p>${item.text}</p>
        <div class="market-foot">
          <strong>${item.price}</strong>
          <button class="btn btn-ghost">Book</button>
        </div>
      </div>
    `;
    marketGrid.appendChild(card);
  });
}

const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${index * 70}ms`;
  observer.observe(item);
});

const intakeModal = document.getElementById("intakeModal");
const openIntake = document.getElementById("openIntake");
const closeIntake = document.getElementById("closeIntake");
const choices = document.getElementById("choices");
const choiceOutput = document.getElementById("choiceOutput");

if (openIntake && intakeModal) {
  openIntake.addEventListener("click", () => {
    intakeModal.classList.add("show");
    intakeModal.setAttribute("aria-hidden", "false");
  });
}

if (closeIntake && intakeModal) {
  closeIntake.addEventListener("click", () => {
    intakeModal.classList.remove("show");
    intakeModal.setAttribute("aria-hidden", "true");
  });
}

if (intakeModal) {
  intakeModal.addEventListener("click", (event) => {
    if (event.target === intakeModal) {
      intakeModal.classList.remove("show");
      intakeModal.setAttribute("aria-hidden", "true");
    }
  });
}

if (choices && choiceOutput) {
  choices.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) {
      return;
    }

    const selected = button.dataset.label;
    choiceOutput.textContent = `Path selected: ${selected}. Estimated setup budget: $1,200-$2,800 for month one.`;
  });
}

const playDemo = document.getElementById("playDemo");
if (playDemo) {
  playDemo.addEventListener("click", () => {
    window.alert("Demo storyboard: Intake -> Match -> Book -> Track. This prototype is presentation-ready for partner calls.");
  });
}
