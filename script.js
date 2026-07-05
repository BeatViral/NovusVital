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
const storyPrev = document.getElementById("storyPrev");
const storyNext = document.getElementById("storyNext");

const storyScenes = [
  {
    title: "From scattered wellness spending to one clear plan.",
    copy: "High-intent users waste money across fragmented providers, disconnected data, and unverified options."
  },
  {
    title: "Step 1: User sets a goal in under 4 minutes.",
    copy: "Energy, fat loss, better sleep, or longevity. The intake captures goals, budget, and constraints in one guided flow."
  },
  {
    title: "Step 2: NovusVital builds a practical protocol path.",
    copy: "The app maps vetted tests, therapies, supplements, and provider options to a realistic action plan."
  },
  {
    title: "Step 3: Booking and payment happen in one place.",
    copy: "Users can browse trusted partner offers, reserve appointments, and pay without juggling multiple systems."
  },
  {
    title: "Step 4: Outcomes are tracked over time.",
    copy: "Biomarker trends, adherence, and repeat behavior become visible so users know what is actually working."
  },
  {
    title: "Business model: revenue on every successful journey.",
    copy: "NovusVital earns from booking commissions, premium memberships, and partner tooling, with B2B expansion later."
  }
];

let storyIndex = 0;
let storyTimer = null;
const storyDurationMs = 45000;
const perSceneMs = Math.floor(storyDurationMs / storyScenes.length);

function renderStoryScene(index) {
  if (!storyTitle || !storyCopy || !storyProgress || !storyStep) {
    return;
  }

  const scene = storyScenes[index];
  storyTitle.textContent = scene.title;
  storyCopy.textContent = scene.copy;
  storyStep.textContent = `Scene ${index + 1} of ${storyScenes.length}`;

  const progress = ((index + 1) / storyScenes.length) * 100;
  storyProgress.style.width = `${progress}%`;
}

function stopStoryTimer() {
  if (storyTimer) {
    clearInterval(storyTimer);
    storyTimer = null;
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
  renderStoryScene(storyIndex);
  storyModal.classList.add("show");
  storyModal.setAttribute("aria-hidden", "false");

  storyTimer = setInterval(() => {
    storyIndex += 1;

    if (storyIndex >= storyScenes.length) {
      closeStoryModal();
      return;
    }

    renderStoryScene(storyIndex);
  }, perSceneMs);
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
