"use strict"

const scrollTriggers = document.querySelectorAll(".scroll-trigger");

const observer = new IntersectionObserver( (entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle("in-view", entry.isIntersecting);
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
    };
  })
},
{
  threshold: 0,
});

scrollTriggers.forEach(scrollTrigger => {
  observer.observe(scrollTrigger);
})

const navObserver = new IntersectionObserver((nav) => {
  function transitionend() {
    observer.observe(this);
    this.removeEventListener("transitionend", transitionend);
  }
  if (nav[0].isIntersecting) {
    scrollTriggers.forEach(scrollTrigger => {
      scrollTrigger.classList.toggle("in-view", false);
      scrollTrigger.addEventListener("transitionend", transitionend);
    })
  }
})

navObserver.observe(document.getElementById("nav"));

// auto load all animations if nav bar clicked
// need to change this to only autoload animations that are above

// IS THIS WHOLE THING WAY OVERCOMPLICATED?? Look back at jquery version and see if can be copied using transitioneend events?

document.querySelectorAll("nav a").forEach(link => {
  function preLoadAnimations() {
    for (let scrollTrigger of scrollTriggers) {
      // this is not going to work because the scrollTriggers are not the same as the anchor targets and do not currently have id
      if (scrollTrigger.id == this.hash.slice(1)) break;
      scrollTrigger.classList.add("in-view");
      observer.unobserve(scrollTrigger);
    }
  }
  link.addEventListener("click", preLoadAnimations);
})



/* PSEUDOCODE
loop over the links
if the target of the link is passed
make in view and unobserve
*/