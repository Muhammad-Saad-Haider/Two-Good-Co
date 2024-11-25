// for smooth scrolling

// const scroll = new LocomotiveScroll({
//     el: document.querySelector(".main"),
//     smooth: true
// });

// Above locomotive and scroll trigger will not work simultaneously so the below function is used

function locomotiveAnimations() {
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

locomotiveAnimations();

// Nav logo (svg) animation

gsap.to(".nav-left svg", {
    transform: "translateY(-100%)",
    scrollTrigger: {
        trigger: ".first-page",
        scroller: ".main",
        start: "top 0",
        end: "top -5%",
        scrub: true
    }
});

// Nav links animation

gsap.to(".nav-right .nav-links", {
    transform: "translateY(-100%)",
    scrollTrigger: {
        trigger: ".first-page",
        scroller: ".main",
        start: "top 0",
        end: "top -5%",
        scrub: 1
    }
});

// loading animation

gsap.from(".first-page h1", {
    y: 100,
    opacity: 0,
    delay: 0.5,
    duration: 0.6,
    stagger: 0.1
});

gsap.from(".video-container", {
    y: 100,
    opacity: 0,
    delay: 0.8,
    duration: 0.7
});

// video play button animation

const videoCon = document.querySelector(".video-container");
const playBtn = document.querySelector("#play-btn");

videoCon.addEventListener("mouseenter", () => {
    gsap.to(playBtn, {
        scale: 1,
        opacity: 1
    })
});

videoCon.addEventListener("mouseleave", () => {
    gsap.to(playBtn, {
        scale: 0,
        opacity: 0
    })
});

videoCon.addEventListener("mousemove", (dets) => {
    // gsap.to(playBtn, {
    //     left: dets.x-50,
    //     top: dets.y-50
    // });
    
    gsap.to(playBtn, {
        left: dets.clientX - videoCon.getBoundingClientRect().left - 50 ,
        top: dets.clientY - videoCon.getBoundingClientRect().top - 50,
    });
});

// Play Button Functionality

const vdo = document.querySelector("#two-good-video");

playBtn.addEventListener("click", () => {
    console.log("clicked");

    vdo.muted = !vdo.muted;

    playBtn.style.display = "none";
});

// Moving Cursor in Shop section

const shop = document.querySelector(".shop-section");
const items = document.querySelectorAll(".item");
const cursor = document.querySelector("#cursor");

shop.addEventListener("mouseenter", () => {
    gsap.to(cursor, {
        scale: 1,
        opacity: 1,
    });
});

shop.addEventListener("mouseleave", () => {
    gsap.to(cursor, {
        scale: 0,
        opacity: 0,
    });
});

shop.addEventListener("mousemove", (dets) => {
    gsap.to(cursor, {
        left: dets.clientX - shop.getBoundingClientRect().left,
        top: dets.clientY - shop.getBoundingClientRect().top,
    });
});

items.forEach((item) => {
    item.addEventListener("mouseenter", () => {
        gsap.to(cursor, {
            scale: 1,
            // Below line changes color of the cursor in each item
            backgroundColor: item.getAttribute("data-color"),
            transform: "translate(-50%,-50%) scale(1)",
        });
    });

    item.addEventListener("mouseleave", () => {
        gsap.to(cursor, {
            scale: 0,
            transform: "translate(-50%,-50%) scale(1)",
        });
    });
});

// Appearing animations for all elements

const classes = [".buy-do-divider", ".images-section", ".headline", ".item", ".impact", ".email", ".links", ".foot-msg"];

classes.forEach((className) => {
    const elements = document.querySelectorAll(className);

    elements.forEach((element) => {
        gsap.from(element, {
            y: 100,
            opacity: 0,
            scrollTrigger: {
                trigger: element,
                scroller: ".main",
                start: "top 90%",
            }
        });
    });
});