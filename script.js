function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });





    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}
locomotiveAnimation();

function navbarAnimation() {
    gsap.to("#nav-logo svg", {
        transform: "translateY(-100%)",
        scrollTrigger: {
            trigger: "#container1",
            scroller: "#main",
            start: "top 0",
            end: "top -5%",
            scrub: true
        }
    })

    gsap.to("#nav-links", {
        transform: "translateY(-100%)",
        opacity: 0,
        scrollTrigger: {
            trigger: "#container1",
            scroller: "#main",
            start: "top 0",
            end: "top -5%",
            scrub: true
        }
    })
}
navbarAnimation();



function loadingAnimation() {
    gsap.from("#container1 h1", {
        y: 100,
        opacity: 0,
        delay: 0.1,
        duration: 0.3,
        stagger: 0.4
    })
}
loadingAnimation();


function loadingImg() {
    gsap.from("#container1-img img", {
        scale: 1.1,
        opacity: 0,
        delay: 1,
        duration: 1,
        ease: "power2.out"
    })
}
loadingImg();

function cursorAnimation() {
    document.addEventListener("mousemove", function (dets) {
        gsap.to("#cursor", {
            left: dets.x,
            top: dets.y,
            duration: 0.3,
        });
    });

    document.querySelectorAll(".child").forEach(function (elem) {
        elem.addEventListener("mouseenter", function () {
            gsap.to("#cursor", {
                transform: "translate(-50%,-50%) scale(1)",
            });
        });
        elem.addEventListener("mouseleave", function () {
            gsap.to("#cursor", {
                transform: "translate(-50%,-50%) scale(0)",
            });
        });
    });
}
cursorAnimation();

const email = document.getElementById("email");
const resetButton = document.querySelector(".reset-button");

const arrowBtn = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M11.293 4.707 17.586 11H4v2h13.586l-6.293 6.293 1.414 1.414L21.414 12l-8.707-8.707-1.414 1.414z"/></svg>`;
const enterBtn = ` <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path d="M17 13H8.414l4.293-4.293-1.414-1.414L4.586 14l6.707 6.707 1.414-1.414L8.414 15H19V4h-2v9z" />
            </svg>`

email.addEventListener("focus", () => {
    email.setAttribute("data-placeholder", email.placeholder);
    email.placeholder = "";
    resetButton.innerHTML = enterBtn;
});
email.addEventListener("blur", () => {
    email.placeholder = email.getAttribute("data-placeholder");
    resetButton.innerHTML = arrowBtn;
});
resetButton.innerHTML = arrowBtn;


function overlayAnimation() {
    document.querySelectorAll(".overlay").forEach(function (overlay) {
        const extendedOverlay = overlay.nextElementSibling; // get the .overlay-extended just after .overlay

        overlay.addEventListener("mouseenter", function () {
            gsap.to(extendedOverlay, {
                // height: "220px",    // how much it extends
                // opacity: 1,
                scaleY:1,
                marginTop:"30%",
                duration: 0.7,
                ease: "power2.out",
            });
        });

        overlay.addEventListener("mouseleave", function () {
            gsap.to(extendedOverlay, {
                scaleY:0,
                duration: 0.7,
                ease: "power2.inOut",
            });
        });
    });
}

overlayAnimation();
