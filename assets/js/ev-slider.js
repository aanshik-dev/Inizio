const slides = document.querySelector(".slides");
const dotsContainer = document.querySelector(".dots");
const buttonsContainer = document.querySelector(".buttons");
const eventText = document.getElementById("eventText");
const totalSlides = 3; // Number of unique slides
let currentIndex = 1;
let autoSlideInterval;

// Event Names & Descriptions
const slideData = [
   { name: "Opening Ceremony", text: "Gear up for an electrifying event at IIIT\'s fest! Teams of 4 will battle in two " +
          "rounds: a quiz to secure a franchise spot, followed by a high-stakes player auction. With 100 crores, build " +
          "your dream team of 12 players while balancing Indian and overseas stars. Master the bidding war, strategize " +
          "your picks, and aim for the highest team rating to win. Will you outsmart the competition? Join the thrill " +
          "and showcase your cricketing genius!" },
   { name: "Tech Conference", text: "Unleash your creativity in this week-long Instagram marketing showdown! Teams of " +
          "4-5 will craft and run a dynamic campaign for a given product, posting daily content, reels, and stories to " +
          "maximize engagement. After 6 days of strategizing and engaging, teams will pitch their campaign results to " +
          "a panel of judges. Showcase your skills in analytics, content creation, and storytelling to win exciting " +
          "rewards!Join the challenge and prove your marketing prowess!" },
   { name: "Closing Gala", text: "Code your way to victory in this 24-hour offline hackathon at IIIT Guwahati! Teams " +
          "of 2-5 will brainstorm, build, and pitch innovative tech solutions to real-world challenges. With " +
          "mentorship, cutting-edge problem statements, and a ₹50,000 prize pool up for grabs, this is your chance to " +
          "showcase your coding, problem-solving, and teamwork skills. After an intense coding sprint, top teams will " +
          "present their projects to a panel of judges for cash prizes, internships, and startup incubation " +
          "opportunities. Gear up for a high-energy, innovation-driven experience and make your mark in the tech world!" }
];

function startAutoSlide() {
   clearInterval(autoSlideInterval);
   autoSlideInterval = setInterval(nextSlide, 5000);
}

function updateSlider(instant = false) {
   slides.style.transition = instant ? "none" : "transform 0.5s ease-in-out";
   slides.style.transform = `translateX(-${currentIndex * 100}%)`;

   document.querySelectorAll(".dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === (currentIndex - 1) % totalSlides);
   });

   document.querySelectorAll(".slide-button").forEach((button, index) => {
      button.classList.toggle("active", index === (currentIndex - 1) % totalSlides);
   });

   // Update Event Description
   eventText.textContent = slideData[(currentIndex - 1) % totalSlides].text;
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
      button.textContent = slideData[i].name;
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
      currentIndex++;
      updateSlider();
      setTimeout(() => {
         currentIndex = 1;
         updateSlider(true);
      }, 500);
   } else {
      currentIndex++;
      updateSlider();
   }
}

createControls();
updateSlider(true);
startAutoSlide();
