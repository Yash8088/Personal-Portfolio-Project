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
  var spin = document.getElementById("spin");
  if (spin) {
    spin.style.display = "none";
  }

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

      const color = "#" + dets.target.dataset.color;
      const projectTitles = document.querySelectorAll(".project-title");
      projectTitles.forEach((title) => {
        title.style.color = color;
      });

      const languageContainers = document.querySelectorAll(".languages-cnt");
      languageContainers.forEach((languages) => {
        languages.style.opacity = 0; // Hide languages
      });
    });

    cnt.addEventListener("mouseleave", function (dets) {
      document.querySelector("#cursor").children[
        showingImage.dataset.index
      ].style.opacity = 0;
      showingImage.style.filter = "grayscale(0)";
      document.querySelector("#work").style.backgroundColor = "#f2f2f2";

      const projectTitles = document.querySelectorAll(".project-title");
      projectTitles.forEach((title) => {
        title.style.color = "black";
      });

      const allLanguages = document.querySelectorAll(".languages-cnt");
      allLanguages.forEach((language) => {
        language.style.opacity = 1; // Hide all individual languages
      });
    });
  });
}
function onCardClick() {
  document.querySelectorAll(".cnt").forEach(function (cnt) {
    cnt.addEventListener("click", function () {
      const url = cnt.getAttribute("data-url");
      if (url) {
        window.open(url, "_blank");
      }
    });
  });
}

//for smaller screens parallax
function updateScrollSpeed() {
  const images = document.querySelectorAll(
    'img[data-index="0"], img[data-index="1"], img[data-index="2"]'
  );

  images.forEach((image) => {
    if (window.matchMedia("(max-width: 768px)").matches) {
      // When screen width is 768px or less
      image.setAttribute("data-scroll-speed", "-0.5");
    } else {
      // When screen width is more than 768px
      image.setAttribute("data-scroll-speed", "-1.5");
    }
  });
}

function navRedirect() {
  document.querySelectorAll("#nav a[data-target]").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent the default anchor behavior (jumping to the target)

      const targetId = this.getAttribute("data-target"); // Get the target ID from the data-target attribute
      const targetElement = document.getElementById(targetId); // Get the element by ID

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop, // Scroll to the top position of the target element
          behavior: "smooth", // Smooth scrolling
        });
      }
    });
  });
}

// Call the function to enable the navigation redirect
navRedirect();

function makeVisibile() {
  // Select all h3 and img elements inside any .scard (scard1, scard2, scard3)
  const elements = document.querySelectorAll(
    ".scard .icon-cnt h3, .scard .icon-cnt img"
  );

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add the 'visible' class when the element enters the viewport
          entry.target.classList.add("visible");
          // Optionally stop observing the element once it's visible
          observer.unobserve(entry.target);
        } else {
          // Optionally remove the 'visible' class when it exits the viewport
          entry.target.classList.remove("visible");
        }
      });
    },
    {
      threshold: 0.5, // Trigger when 50% of the element is visible
    }
  );

  // Observe each element
  elements.forEach((element) => {
    observer.observe(element);
  });
}

window.onload = function () {
  makeVisibile();
};

window.onload = function () {
  makeVisibile();
};

// Call the function after the page is loaded
document.addEventListener("DOMContentLoaded", makeVisibile);

locoInitialize();

// Initial check
//updateScrollSpeed();

// Add event listener for window resize
//window.addEventListener("resize", updateScrollSpeed);

revealToSpan();
valueSetters();

window.onload = function () {
  loaderAnimation();
};

locoInitialize();
navRedirect();

// Call the function to rotate images based on scroll position

cardHoverEffect();
onCardClick();
makeVisibile();
