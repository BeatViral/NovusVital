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
const storyModal = document.getElementById("storyModal");
const closeStory = document.getElementById("closeStory");
const storyTitle = document.getElementById("storyTitle");
const storyCopy = document.getElementById("storyCopy");
const storyProgress = document.getElementById("storyProgress");
const storyStep = document.getElementById("storyStep");
const storyLabel = document.getElementById("storyLabel");
const storyStat = document.getElementById("storyStat");
const storyHint = document.getElementById("storyHint");
const storyTimer = document.getElementById("storyTimer");
const storyDots = document.getElementById("storyDots");
const storyPrev = document.getElementById("storyPrev");
const storyNext = document.getElementById("storyNext");

const storyScenes = [
  {
    label: "Problem Framing",
    title: "From scattered wellness spending to one clear plan.",
    copy: "High-intent users waste money across fragmented providers, disconnected data, and unverified options.",
    stat: "$2.7k",
    hint: "Average monthly spend before consolidation across services and products."
  },
  {
    label: "Intake",
    title: "Step 1: User sets a goal in under 4 minutes.",
    copy: "Energy, fat loss, better sleep, or longevity. The intake captures goals, budget, and constraints in one guided flow.",
    stat: "4 min",
    hint: "Fast onboarding improves completion and boosts conversion into bookings."
  },
  {
    label: "Protocol Match",
    title: "Step 2: NovusVital builds a practical protocol path.",
    copy: "The app maps vetted tests, therapies, supplements, and provider options to a realistic action plan.",
    stat: "3.4x",
    hint: "Faster path from decision to action compared with fragmented app journeys."
  },
  {
    label: "Booking",
    title: "Step 3: Booking and payment happen in one place.",
    copy: "Users can browse trusted partner offers, reserve appointments, and pay without juggling multiple systems.",
    stat: "$1,740",
    hint: "Current pilot average booking value across diagnostic and therapy categories."
  },
  {
    label: "Outcomes",
    title: "Step 4: Outcomes are tracked over time.",
    copy: "Biomarker trends, adherence, and repeat behavior become visible so users know what is actually working.",
    stat: "+18.7%",
    hint: "Composite vitality score improvement over 8 weeks in pilot data."
  },
  {
    label: "Monetization",
    title: "Business model: revenue on every successful journey.",
    copy: "NovusVital earns from booking commissions, premium memberships, and partner tooling, with B2B expansion later.",
    stat: "24.2%",
    hint: "Blended take rate target from curated marketplace transactions."
  }
];

let storyIndex = 0;
let storySceneTimer = null;
let storyClockTimer = null;
let storyRemainingMs = 0;
const storyDurationMs = 45000;
const perSceneMs = Math.floor(storyDurationMs / storyScenes.length);

if (storyDots) {
  storyDots.innerHTML = storyScenes.map(() => "<span></span>").join("");
}

function formatDuration(ms) {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function renderStoryScene(index) {
  if (!storyTitle || !storyCopy || !storyProgress || !storyStep) {
    return;
  }

  const scene = storyScenes[index];
  if (storyLabel) {
    storyLabel.textContent = scene.label;
  }
  storyTitle.textContent = scene.title;
  storyCopy.textContent = scene.copy;
  if (storyStat) {
    storyStat.textContent = scene.stat;
  }
  if (storyHint) {
    storyHint.textContent = scene.hint;
  }
  storyStep.textContent = `Scene ${index + 1} of ${storyScenes.length}`;

  const progress = ((index + 1) / storyScenes.length) * 100;
  storyProgress.style.width = `${progress}%`;

  if (storyDots) {
    const dots = storyDots.querySelectorAll("span");
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex <= index);
    });
  }
}

function stopStoryTimer() {
  if (storySceneTimer) {
    clearInterval(storySceneTimer);
    storySceneTimer = null;
  }

  if (storyClockTimer) {
    clearInterval(storyClockTimer);
    storyClockTimer = null;
  }
}

function closeStoryModal() {
  if (!storyModal) {
    return;
  }

  stopStoryTimer();
  storyModal.classList.remove("show");
  storyModal.setAttribute("aria-hidden", "true");
}

function startStory() {
  if (!storyModal) {
    return;
  }

  stopStoryTimer();
  storyIndex = 0;
  storyRemainingMs = storyDurationMs;
  renderStoryScene(storyIndex);
  if (storyTimer) {
    storyTimer.textContent = formatDuration(storyRemainingMs);
  }
  storyModal.classList.add("show");
  storyModal.setAttribute("aria-hidden", "false");

  storySceneTimer = setInterval(() => {
    storyIndex += 1;

    if (storyIndex >= storyScenes.length) {
      closeStoryModal();
      return;
    }

    renderStoryScene(storyIndex);
  }, perSceneMs);

  storyClockTimer = setInterval(() => {
    storyRemainingMs -= 1000;
    if (storyTimer) {
      storyTimer.textContent = formatDuration(storyRemainingMs);
    }
  }, 1000);
}

function goToStoryScene(stepDelta) {
  const nextIndex = Math.max(0, Math.min(storyScenes.length - 1, storyIndex + stepDelta));
  if (nextIndex === storyIndex) {
    return;
  }

  storyIndex = nextIndex;
  renderStoryScene(storyIndex);
}

if (playDemo) {
  playDemo.addEventListener("click", startStory);
}

if (closeStory) {
  closeStory.addEventListener("click", closeStoryModal);
}

if (storyModal) {
  storyModal.addEventListener("click", (event) => {
    if (event.target === storyModal) {
      closeStoryModal();
    }
  });
}

if (storyPrev) {
  storyPrev.addEventListener("click", () => {
    goToStoryScene(-1);
  });
}

if (storyNext) {
  storyNext.addEventListener("click", () => {
    if (storyIndex >= storyScenes.length - 1) {
      closeStoryModal();
      return;
    }

    goToStoryScene(1);
  });
}
