document.addEventListener("DOMContentLoaded", function () {
   let gear = document.querySelector(".mob-gear");
   let dimmer = document.querySelector(".black-overlay");
   let navPanel = document.querySelector(".nav-hid");
   let cross = document.querySelector(".cross");
   let rot = document.querySelector(".rot");

   gear.addEventListener("click", function () {
      dimmer.classList.toggle("dim-show");
      rot.classList.add("gear-rot");
      rot.classList.remove("anti-rot");
      navPanel.classList.add("nav-show");
      navPanel.classList.remove("nav-hide");
   });

   dimmer.addEventListener("click", function () {
      dimmer.classList.toggle("dim-show");
      rot.classList.add("anti-rot");
      rot.classList.remove("gear-rot");
      navPanel.classList.add("nav-hide");
      navPanel.classList.remove("nav-show");
   });

   cross.addEventListener("click", function () {
      dimmer.classList.toggle("dim-show");
      rot.classList.add("anti-rot");
      rot.classList.remove("gear-rot");
      navPanel.classList.add("nav-hide");
      navPanel.classList.remove("nav-show");
   });
});

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
   var currentScrollPos = window.pageYOffset;
   if (prevScrollpos > currentScrollPos) {
      document.getElementById("nav").style.top = "0";
   } else {
      document.getElementById("nav").style.top = "-100px";
   }
   prevScrollpos = currentScrollPos;
}



document.addEventListener("DOMContentLoaded", function () {
   var lazyloadImages;

   if ("IntersectionObserver" in window) {
      lazyloadImages = document.querySelectorAll("img.lazy");
      var imageObserver = new IntersectionObserver(function (entries, observer) {
         entries.forEach(function (entry) {
            if (entry.isIntersecting) {
               var image = entry.target;
               image.src = image.dataset.src;
               image.classList.remove("lazy");
               imageObserver.unobserve(image);
            }
         });
      });

      lazyloadImages.forEach(function (image) {
         imageObserver.observe(image);
      });
   } else {
      var lazyloadThrottleTimeout;
      lazyloadImages = document.querySelectorAll(".lazy");

      function lazyload() {
         if (lazyloadThrottleTimeout) {
            clearTimeout(lazyloadThrottleTimeout);
         }

         lazyloadThrottleTimeout = setTimeout(function () {
            var scrollTop = window.pageYOffset;
            lazyloadImages.forEach(function (img) {
               if (img.offsetTop < (window.innerHeight + scrollTop)) {
                  img.src = img.dataset.src;
                  img.classList.remove('lazy');
               }
            });
            if (lazyloadImages.length == 0) {
               document.removeEventListener("scroll", lazyload);
               window.removeEventListener("resize", lazyload);
               window.removeEventListener("orientationChange", lazyload);
            }
         }, 20);
      }

      document.addEventListener("scroll", lazyload);
      window.addEventListener("resize", lazyload);
      window.addEventListener("orientationChange", lazyload);
   }
})


// CONTACT FORM

// Form handling script
document.addEventListener('DOMContentLoaded', function () {
   const contactForm = document.getElementById('contact-form');
   const thankYouMessage = document.getElementById('thank-you-message');

   // Google Form URL and entry IDs
   const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSflGN9sE_2bnEMfadxxnhPtqOoCqNvkM3bvzeEbEetpbhQFqA/formResponse';
   const INPUT_NAMES = {
      name: "entry.1548877943",
      email: "entry.98171686",
      phone: "entry.506744197",
      company: "entry.733658251",
      message: "entry.1033800333"
   };

   contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Create a hidden form to submit to Google Forms
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = GOOGLE_FORM_URL;
      form.target = 'hidden_iframe'; // Prevents page reload

      // Get all form input values
      const formData = {
         name: document.getElementById('name').value,
         email: document.getElementById('email').value,
         phone: document.getElementById('phone').value,
         company: document.getElementById('company').value,
         message: document.getElementById('message').value
      };

      // Append hidden input fields with Google Form entry IDs
      Object.keys(INPUT_NAMES).forEach(key => {
         const input = document.createElement('input');
         input.type = 'hidden';
         input.name = INPUT_NAMES[key];
         input.value = formData[key];
         form.appendChild(input);
      });

      // Append the form to the body, submit it, and then remove it
      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);

      // Show thank you message and hide the form
      contactForm.style.display = 'none';
      thankYouMessage.style.display = 'block';
   });
});



document.addEventListener("DOMContentLoaded", () => {
   const slides = document.querySelector(".slides");
   const dotsContainer = document.querySelector(".dots");
   const buttonsContainer = document.querySelector(".buttons");
   const eventText = document.getElementById("eventText");
   const eventNum = document.getElementById("eventNum");
   const eventName = document.getElementById("eventName");

   const totalSlides = 3;
   let currentIndex = 1;
   let autoSlideInterval;

   // Event Names & Descriptions
   const slideData = [
      { name: "Event 1", text: "Gear up for an electrifying event at IIIT's fest! Teams of 4 will battle in two rounds: a quiz to secure a franchise spot, followed by a high-stakes player auction. With 100 crores, build your dream team of 12 players while balancing Indian and overseas stars. Master the bidding war, strategize your picks, and aim for the highest team rating to win. Will you outsmart the competition? Join the thrill and showcase your cricketing genius!" },

      { name: "Event 2", text: "Unleash your creativity in this week-long Instagram marketing showdown! Teams of 4-5 will craft and run a dynamic campaign for a given product, posting daily content, reels, and stories to maximize engagement. After 6 days of strategizing and engaging, teams will pitch their campaign results to a panel of judges. Showcase your skills in analytics, content creation, and storytelling to win exciting rewards! Join the challenge and prove your marketing prowess!" },

      { name: "Event 3", text: "Code your way to victory in this 24-hour offline hackathon at IIIT Guwahati! Teams of 2-5 will brainstorm, build, and pitch innovative tech solutions to real-world challenges. With mentorship, cutting-edge problem statements, and a ₹50,000 prize pool up for grabs, this is your chance to showcase your coding, problem-solving, and teamwork skills. After an intense coding sprint, top teams will present their projects to a panel of judges for cash prizes, internships, and startup incubation opportunities. Gear up for a high-energy, innovation-driven experience and make your mark in the tech world!" }
   ];

   function startAutoSlide() {
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(nextSlide, 5000);
   }

   function updateSlider(instant = false) {
      slides.style.transition = instant ? "none" : "transform 0.5s ease-in-out";
      slides.style.transform = `translateX(-${currentIndex * 100}%)`;

      // Update dots
      document.querySelectorAll(".dot").forEach((dot, index) => {
         dot.classList.toggle("active", index === (currentIndex - 1) % totalSlides);
      });

      // Update buttons
      document.querySelectorAll(".slide-button").forEach((button, index) => {
         button.classList.toggle("active", index === (currentIndex - 1) % totalSlides);
      });

      // Update Event Description
      const dataIndex = (currentIndex === 0) ? totalSlides - 1 : (currentIndex - 1) % totalSlides;
      eventText.textContent = slideData[dataIndex].text;
      eventName.textContent = slideData[dataIndex].name;
      eventNum.textContent = `# ${currentIndex} / ${totalSlides}`;
   }

   function createControls() {
      for (let i = 0; i < totalSlides; i++) {
         const dot = document.createElement("div");
         dot.classList.add("dot");
         dot.addEventListener("click", () => {
            currentIndex = i + 1;
            updateSlider();
            startAutoSlide();
         });
         dotsContainer.appendChild(dot);

         const button = document.createElement("button");
         button.classList.add("slide-button");
         button.textContent = `Event ${i+1}`;
         button.addEventListener("click", () => {
            currentIndex = i + 1;
            updateSlider();
            startAutoSlide();
         });
         buttonsContainer.appendChild(button);
      }
   }

   function nextSlide() {
      if (currentIndex >= totalSlides) {
         slides.style.transition = "transform 0.5s ease-in-out";
         currentIndex++;
         updateSlider();

         // Smooth transition fix for looping back to first slide
         setTimeout(() => {
            slides.style.transition = "none";
            currentIndex = 1;
            updateSlider(true);
         }, 500);
      } else {
         currentIndex++;
         updateSlider();
      }
   }

   // Cloning slides for seamless transition
   function setupInfiniteLoop() {
      const firstClone = slides.children[0].cloneNode(true);
      const lastClone = slides.children[totalSlides - 1].cloneNode(true);
      slides.appendChild(firstClone);
      slides.insertBefore(lastClone, slides.firstChild);
   }

   setupInfiniteLoop();
   createControls();
   updateSlider(true);
   startAutoSlide();
});



document.addEventListener("DOMContentLoaded", function () {
   const sliders = document.querySelectorAll(".slider");

   sliders.forEach(slider => {
      let slides = Array.from(slider.children);
      let totalSlides = slides.length;

      // Clone slides to create the infinite loop effect
      slides.forEach(slide => {
         let clone = slide.cloneNode(true);
         slider.appendChild(clone);
      });

      let scrollAmount = 0;
      const speed = 2; // Adjust speed for smoother movement

      function moveSlider() {
         scrollAmount += speed;
         if (scrollAmount >= slider.scrollWidth / totalSlides) {
            scrollAmount = 0; // Reset to maintain seamless effect
         }
         slider.style.transform = `translateX(-${scrollAmount}px)`;
      }

      setInterval(moveSlider, 30); // Controls animation speed
   });
});


