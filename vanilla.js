"use strict";

function loadScrollAnimations() {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.id == "nav") {
          scrollTriggers.forEach((trigger) => trigger.classList.toggle("in-view", trigger.id == "nav"));
        } else {
          let willAppear = entry.boundingClientRect.y < document.documentElement.clientHeight;
          entry.target.classList.toggle("in-view", willAppear); 
        };
      };
    })
  },
  {
    threshold: 0,
  });

  let scrollTriggers = document.querySelectorAll('.scroll-trigger');
  scrollTriggers.forEach((trigger) => observer.observe(trigger));
};

loadScrollAnimations();