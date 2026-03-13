const typedWords = [
  "MERN Stack Apps",
  "AI-Powered Websites",
  "Scalable Web Platforms",
  "Modern Business Solutions",
  "Intelligent User Experiences",
  "Full-Stack Product Systems"
];

const typedText = document.getElementById("typed-text");
const yearNode = document.getElementById("current-year");
const revealNodes = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll(".main-nav a");
const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

if (typedText) {
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const typeTick = () => {
    const currentWord = typedWords[wordIndex];
    typedText.textContent = currentWord.slice(0, charIndex);

    if (!deleting && charIndex < currentWord.length) {
      charIndex += 1;
      setTimeout(typeTick, 70);
      return;
    }

    if (!deleting && charIndex === currentWord.length) {
      deleting = true;
      setTimeout(typeTick, 1300);
      return;
    }

    if (deleting && charIndex > 0) {
      charIndex -= 1;
      setTimeout(typeTick, 40);
      return;
    }

    deleting = false;
    wordIndex = (wordIndex + 1) % typedWords.length;
    setTimeout(typeTick, 200);
  };

  typeTick();
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealNodes.forEach((node) => revealObserver.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add("is-visible"));
}

const sectionMap = [...navLinks]
  .map((link) => {
    const target = document.querySelector(link.getAttribute("href"));
    return target ? { link, target } : null;
  })
  .filter(Boolean);

if (sectionMap.length && "IntersectionObserver" in window) {
  const activeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        sectionMap.forEach(({ link, target }) => {
          link.classList.toggle("is-active", target === entry.target);
        });
      });
    },
    {
      rootMargin: "-35% 0px -50% 0px",
      threshold: 0.05
    }
  );

  sectionMap.forEach(({ target }) => activeObserver.observe(target));
}

const setFormMessage = (message, color) => {
  formMessage.textContent = message;
  formMessage.style.color = color;
};

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    setFormMessage("Sending your message...", "#cbd5e1");

    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: new FormData(contactForm),
        headers: { Accept: "application/json" }
      });

      if (!response.ok) {
        throw new Error("Submission failed.");
      }

      contactForm.reset();
      setFormMessage("Thanks for reaching out. I will get back to you soon.", "#86efac");
    } catch (error) {
      setFormMessage("Something went wrong. Please try again.", "#fca5a5");
    }
  });
}
