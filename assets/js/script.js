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


// NAV BAR VISIBLE ON SCROOL UP
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



// LAZY IMAGE LODER

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



//EVENTS SLIDER

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelector(".slides");
  const dotsContainer = document.querySelector(".dots");
  const buttonsContainer = document.querySelector(".buttons");
  const eventText = document.getElementById("eventText");
  const eventNum = document.getElementById("eventNum");
  const eventName = document.getElementById("eventName");

  const totalSlides = 5;
  let currentIndex = 1;
  let autoSlideInterval;

  // Event Names & Descriptions
  const slideData = [
    { name: "digital-duel", text: "digital duel is an intense marketing competition where participants battle it out to create the most impactful and creative marketing strategies.\n\nwhether you’re a branding enthusiast, a content genius, or a data-driven strategist, this event will challenge your ability to think on your feet and sell like a pro.\n\nparticipants will be given a product, brand, or scenario and must craft innovative marketing campaigns within a limited timeframe. the challenge may include social media strategies, ad campaigns, brand positioning, or crisis management. teams will pitch their ideas to a panel of judges who will evaluate creativity, feasibility, and overall impact.\n\nthis event tests your marketing knowledge, creativity, and presentation skills. whether you’re into digital advertising, influencer marketing, or traditional branding, digital duel will push you to think outside the box and compete for the title of the ultimate marketing strategist." },
    { name: "inspirathon", text: "inspirathon is an exciting hackathon powered by stpi, designed to bring together the brightest minds to solve real-world challenges through technology and innovation.\n\nthis event provides a platform for developers, designers, and problem-solvers to collaborate, brainstorm, and build innovative solutions within a limited timeframe. participants will work on problem statements that focus on cutting-edge technologies, business challenges, and social impact, pushing their creativity and technical skills to the limit.\n\nwith mentorship from industry experts and access to valuable resources, inspirathon offers an incredible opportunity to showcase talent, develop groundbreaking projects, and compete for exciting rewards. whether you're a student, developer, or entrepreneur, this hackathon is the perfect stage to turn ideas into reality and make a meaningful impact." },

    { name: "ipl-auction", text: "ipl auction is a thrilling event where participants step into the role of team owners and bid for players to build their ultimate cricket squad.\n\nwith a limited virtual budget, teams must strategize to create a balanced lineup while competing against other franchises in a live auction. each team will be assigned a fixed budget and will have to bid for players based on their real-world performances. the challenge lies in making smart financial decisions while ensuring a strong team combination of batters, bowlers, and all-rounders.\n\nthe event tests participants' decision-making, budgeting, and cricket knowledge. whether you're a cricket enthusiast or just love strategy games, this auction promises an exciting and competitive experience. assemble your squad, outbid your rivals, and prove you have what it takes to build a championship-winning team." },

    { name: "panel-discussion", text: "panel discussion is an engaging and insightful event where industry experts, entrepreneurs, and thought leaders come together to discuss trending topics, challenges, and future opportunities in the business and startup ecosystem.\n\nthis session provides a platform for exchanging ideas, sharing experiences, and gaining valuable knowledge from professionals who have navigated the industry. the discussion will cover key topics such as innovation, entrepreneurship, market trends, and strategies for success.\n\nparticipants will have the opportunity to listen to expert opinions, ask questions, and engage in meaningful conversations that broaden their perspectives. whether you're an aspiring entrepreneur, a business enthusiast, or someone curious about the industry, the panel discussion promises to be an enlightening experience filled with valuable insights and takeaways." },

    { name: "speaker-session", text: "speaker session is an inspiring and insightful event featuring padmashree awardee and renowned inventor uddhav barali. known for his groundbreaking contributions to innovation and technology, he will share his journey, experiences, and the impact of his inventions on society.\n\nthis session provides a unique opportunity to gain valuable insights from a visionary who has revolutionized problem-solving through creativity and engineering. he will discuss his challenges, achievements, and the thought process behind his most notable inventions, offering inspiration to aspiring entrepreneurs and innovators.\n\nparticipants will have the chance to interact, ask questions, and learn directly from an industry leader whose work has made a lasting difference. whether you are passionate about technology, startups, or social impact, this speaker session promises to be an enlightening and motivational experience." }



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
      button.textContent = `Event ${i + 1}`;
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




// MERCH FLIPPING

document.addEventListener('DOMContentLoaded', function () {
  // Get all merch image containers
  const merchImages = document.querySelectorAll('.merch-img');

  // For each merch image container
  merchImages.forEach((merchImg) => {
    // Get existing front and back images if they exist
    const frontImage = merchImg.querySelector('.merch-front');
    const backImage = merchImg.querySelector('.merch-back');

    // Create flip button if it doesn't exist
    let flipButton = merchImg.querySelector('.flip-btn');
    if (!flipButton) {
      flipButton = document.createElement('button');
      flipButton.className = 'flip-btn';
      flipButton.innerHTML = '<i class="fas fa-sync-alt"></i> Flip';
      merchImg.appendChild(flipButton);
    }

    // Create magnify button if it doesn't exist
    let magnifyButton = merchImg.querySelector('.magnify-btn');
    if (!magnifyButton) {
      magnifyButton = document.createElement('button');
      magnifyButton.className = 'magnify-btn';
      magnifyButton.innerHTML = '<i class="fas fa-search-plus"></i>';
      merchImg.appendChild(magnifyButton);
    }

    // Create a wrapper for the images with perspective if it doesn't exist
    let cardWrapper = merchImg.querySelector('.merch-card');
    if (!cardWrapper) {
      cardWrapper = document.createElement('div');
      cardWrapper.className = 'merch-card';

      // If the front and back images already exist, move them into the wrapper
      if (frontImage && backImage) {
        // Remove them from their current parent
        if (frontImage.parentNode) {
          frontImage.parentNode.removeChild(frontImage);
        }
        if (backImage.parentNode) {
          backImage.parentNode.removeChild(backImage);
        }

        // Add them to the wrapper
        cardWrapper.appendChild(frontImage);
        cardWrapper.appendChild(backImage);
      } else {
        // Create front and back image containers if they don't exist
        const newFrontImage = document.createElement('div');
        newFrontImage.className = 'merch-front';
        newFrontImage.style.backgroundImage = merchImg.style.backgroundImage || '';

        const newBackImage = document.createElement('div');
        newBackImage.className = 'merch-back';
        newBackImage.style.backgroundImage = merchImg.style.backgroundImage || '';

        cardWrapper.appendChild(newFrontImage);
        cardWrapper.appendChild(newBackImage);
      }

      // Insert the wrapper at the beginning of merchImg
      merchImg.insertBefore(cardWrapper, merchImg.firstChild);
    }

    // Flag to track if card is flipped
    let isFlipped = false;

    // Function to toggle flip
    const toggleFlip = () => {
      isFlipped = !isFlipped;
      if (isFlipped) {
        cardWrapper.classList.add('flipped');
      } else {
        cardWrapper.classList.remove('flipped');
      }
    };

    // Remove existing event listeners to prevent duplicates
    const newFlipButton = flipButton.cloneNode(true);
    flipButton.parentNode.replaceChild(newFlipButton, flipButton);
    flipButton = newFlipButton;

    const newMagnifyButton = magnifyButton.cloneNode(true);
    magnifyButton.parentNode.replaceChild(newMagnifyButton, magnifyButton);
    magnifyButton = newMagnifyButton;

    // Add event listener to flip button
    flipButton.addEventListener('click', function (e) {
      e.stopPropagation(); // Prevent event bubbling
      toggleFlip();
    });

    // Add event listener to merch image (excluding buttons)
    merchImg.addEventListener('click', function (e) {
      // Check if the click was on a button or within a button
      if (e.target === flipButton || flipButton.contains(e.target) ||
        e.target === magnifyButton || magnifyButton.contains(e.target)) {
        return; // Don't flip if clicking on buttons
      }
      toggleFlip();
    });

    // Add event listener to open image in new tab when clicking on the magnify button
    magnifyButton.addEventListener('click', function (e) {
      e.stopPropagation(); // Prevent the flip from happening

      const currentFront = merchImg.querySelector('.merch-front');
      const currentBack = merchImg.querySelector('.merch-back');

      // Determine which image to show based on current state
      const imageUrl = isFlipped && currentBack ?
        currentBack.src :
        currentFront ? currentFront.src : '';

      if (imageUrl) {
        window.open(imageUrl, '_blank');
      }
    });
  });
});