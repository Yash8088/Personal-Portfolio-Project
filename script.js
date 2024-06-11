function valueSetters() {
  gsap.set("#nav a", {
    y: "-100%",
    opacity: 0,
  }); /* moving 'a' tags in nav up */
  gsap.set("#home .parent .child", { y: "100%" }); /* childs move down */
  gsap.set("#home .row img", { opacity: 0 }); /* image opacity becomes 0 */
}

function revealToSpan() {
  document.querySelectorAll(".reveal").forEach(function (elem) {
    /*select all reveal tags (h1) , for each call this function
     *elem = h1*   */
    let spanParent = document.createElement("span"); /* <span></span> created*/
    let spanChild = document.createElement("span"); /* <span></span> created*/

    spanParent.classList.add("parent"); /* <span class="parent"></span> */
    spanChild.classList.add("child"); /* <span class="child"></span> */

    spanChild.innerHTML = elem.innerHTML;
    /* <span class="child">Creative</span> * PUTS ELEMS TEXT CONTENT IN SPAN *  */

    spanParent.appendChild(spanChild);

    /* <span class="parent">   *PUT THE Child span inside the Parent span*
            <span class="child">Creative</span>
          </span> */

    elem.innerHTML = ""; /*take everything out of original h1*/
    elem.appendChild(spanParent); /* put the new code into the h1 elem */
  });
}

function loaderAnimation() {
  var tl = gsap.timeline(); /*gsap timeline */
  tl.from("#loader .child span", {
    x: 100,
    duration: 1.0,
    stagger: {
      amount: 0.2,
    },
    ease: Power3.easeInOut,
  });

  tl.to("#loader .parent .child", {
    y: "-110%",
    duration: 1,
    ease: Circ.easeInOut,
  });

  tl.to("#loader", {
    /* eases out the full screen, ends at height 0*/
    height: 0,
    duration: 1,
    ease: Circ.easeInOut,
  });

  tl.to("#green", {
    /* eases in green(green color) */
    height: "100vh",
    top: 0,
    duration: 1,
    delay: -0.8,
    ease: Circ.easeInOut,
  });

  tl.to("#green", {
    /* eases out green(green color)  , ends at height 0 */
    height: "0vh",
    duration: 1,
    delay: -0.5,
    ease: Circ.easeInOut,
    onComplete: function () {
      homeAnimation();
    },
  });
}

function homeAnimation() {
  var tl = gsap.timeline();

  tl.to("#nav a", {
    y: 0,
    opacity: 1,
    stagger: 0.05,
    ease: Expo.easeInOut,
  });

  tl.to("#home .parent .child", {
    y: 0,
    stagger: 0.1,
    duration: 1.2,
    ease: Expo.easeInOut,
  });

  tl.to("#home .row img", {
    opacity: 0.75,
    delay: -0.5,
    ease: Expo.easeInOut,
    onComplete: function () {},
  });
}

function locoInitialize() {
  const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
}

function cardHoverEffect() {
  //   const cnt = document.querySelector("#work");
  //   const cursorElem = document.querySelector("#cursor");
  //   const images = cursorElem.querySelectorAll("#elem img");

  //   let currentIndex = 0;
  //   let slideshowInterval;

  //   // Set initial active image
  //   images[currentIndex].classList.add("active");

  //   cnt.addEventListener("mousemove", function (dets) {
  //     // Move cursor
  //     const mouseX = dets.clientX;
  //     const mouseY = dets.clientY;
  //     cursorElem.style.transform = `translate(${mouseX}px, ${mouseY}px)`;

  //     // Change background color based on data-color attribute of the image
  //     if (dets.target.dataset.color) {
  //       document.querySelector("#work").style.backgroundColor =
  //         "#" + dets.target.dataset.color;
  //     } else {
  //       document.querySelector("#work").style.backgroundColor = ""; // Reset background color if no data-color attribute
  //     }
  //   });

  //   cnt.addEventListener("mouseenter", function () {
  //     cursorElem.style.display = "block"; // Show cursorElem on hover

  //     slideshowInterval = setInterval(() => {
  //       images[currentIndex].classList.remove("active");
  //       currentIndex = (currentIndex + 1) % images.length;
  //       images[currentIndex].classList.add("active");
  //     }, 1000); // Change image every 1 second
  //   });

  //   cnt.addEventListener("mouseleave", function () {
  //     cursorElem.style.display = "none"; // Hide cursorElem when not hovering

  //     clearInterval(slideshowInterval);
  //     images.forEach((image) => image.classList.remove("active")); // Remove active class from all images
  //     currentIndex = 0;
  //     document.querySelector("#work").style.backgroundColor = ""; // Reset background color on mouseleave
  //   });

  document.querySelectorAll(".cnt").forEach(function (cnt) {
    var showingImage;

    cnt.addEventListener("mousemove", function (dets) {
      document.querySelector("#cursor").children[
        dets.target.dataset.index
      ].style.opacity = 1;
      showingImage = dets.target;

      document.querySelector("#cursor").children[
        dets.target.dataset.index
      ].style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)`;

      showingImage.style.filter = "grayscale(1)";

      document.querySelector("#work").style.backgroundColor =
        "#" + dets.target.dataset.color;
    });

    cnt.addEventListener("mouseleave", function (dets) {
      document.querySelector("#cursor").children[
        showingImage.dataset.index
      ].style.opacity = 0;
      showingImage.style.filter = "grayscale(0)";
      document.querySelector("#work").style.backgroundColor = "#f2f2f2";
    });
  });
}

function scrollAppear() {
  gsap.registerPlugin(scrollTrigger);
  // Select all image containers
  const imageContainers = document.querySelectorAll(
    ".front img, .back img, .frame img"
  );

  // Loop through each image container
  imageContainers.forEach((container) => {
    // Set up ScrollTrigger for each container
    gsap.from(container, {
      opacity: 0, // Start with opacity 0
      y: 50, // Move 50px from top
      duration: 1, // Animation duration
      scrollTrigger: {
        trigger: container, // Use the container itself as the trigger
        start: "top 80%", // Start animation when the top of the container reaches 80% of the viewport
        end: "bottom 20%", // End animation when the bottom of the container reaches 20% of the viewport
        toggleActions: "play none none reverse", // Play animation when entering, reverse when leaving
        markers: true, // Optional: Add markers for debugging
      },
    });
  });
}

locoInitialize();
revealToSpan();
valueSetters();

loaderAnimation();

cardHoverEffect();
//scrollAppear();
