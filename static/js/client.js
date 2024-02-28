// Client Partials

// nav
$(document).ready(function () {
    $("#menuBtn").click(function () {
        $("#mainMenu").toggleClass("show");
    });
});


// Main Nav
$(document).ready(function () {
    // Function to handle .nav-anchor-item click
    $(".nav-anchor-item").click(function () {
        // Close all other .nav-sub-anchor elements
        $(".nav-sub-anchor").not($(this).next('.nav-sub-anchor')).removeClass("active");

        // Toggle the visibility of the direct child .nav-sub-anchor
        $(this).next('.nav-sub-anchor').toggleClass("active");
    });

    // Function to handle .nav-anchor-span click
    $(".nav-anchor-span").click(function () {
        // Close the active .nav-sub-anchor
        $(".nav-sub-anchor.active").removeClass("active");
    });

    // Hide sub-anchors when clicking outside the main navigation
    $(document).click(function (event) {
        if (!$(event.target).closest('.nav-anchor-item').length) {
            $(".nav-sub-anchor").removeClass("active");
        }
    });

    // Prevent hiding sub-anchors when clicking on the main navigation
    $("#mainNav").click(function (event) {
        event.stopPropagation();
    });

    $('.nav-anchor-btn').click(function() {
        var droper = $(this).next('.nav-anchor-droper');

        // Check if the droper is currently visible
        if (droper.is(':visible')) {
            // If visible, slide up and then set display to none
            droper.slideUp(function() {
                droper.css('display', 'none');
            });
        } else {
            // If not visible, first set to display flex (to keep the flex properties),
            // then slide down in a way that respects the display flex
            droper.css('display', 'flex').hide().slideDown();
        }
    });
});

// Progressive form
$(document).ready(function() {
    var currentStep = 1;

    function showStep(step) {
        $('.inquiry-form .steps').removeClass('active');
        $('.inquiry-form .steps[data-step="' + step + '"]').addClass('active');
    }

    // Show the first step initially
    showStep(currentStep);

    $('#closeForm').click(function() {
        $('#progressiveForm').hide();
        history.back();
    });

    $('#prevButton').click(function() {
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
        }
    });

    $('#nextButton').click(function() {
        if (currentStep < $('.inquiry-form .steps').length) {
            currentStep++;
            showStep(currentStep);
        }
    });

    $('.tour-options input').click(function() {
        $(this).toggleClass('selected');
    });

    $('.travel-plan input').click(function() {
        $('.travel-plan input').removeClass('selected');
        $(this).toggleClass('selected');
    });

    $('.travel-calender input').click(function() {
        $('.travel-plan input').removeClass('selected');
        $(this).toggleClass('selected');
    });

    $('.custom-quote').on('input', function() {
        var value = $(this).val();
        value = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
        $(this).val(formatNumberWithCommas(value));
    });

    function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    
});


// Home page

// destination section
$(document).ready(function () {
    var slideIndex = 0;
    var profiles = $('.destination-curosel-profile');
  
    function showSlides() {
      // Hide all profiles
      profiles.removeClass('active');
  
      // Add a class to the current profile to trigger the transition
      var currentProfile = profiles.eq(slideIndex);
      currentProfile.addClass('active');
  
      // Increment the slide index
      slideIndex = (slideIndex + 1) % profiles.length;
  
      // Call showSlides function recursively after a certain time interval (e.g., 3000 milliseconds)
      setTimeout(showSlides, 6000);
    }
  
    // Start the slideshow
    showSlides();
  
    // Manual carousel control
  
    // Previous button click event
    $('.prev-btn').click(function () {
      // Decrement the slide index and ensure it's within bounds
      slideIndex = (slideIndex - 1 + profiles.length) % profiles.length;
      showSlides(); // Call showSlides to update the carousel
    });
  
    // Next button click event
    $('.next-btn').click(function () {
      // Increment the slide index and ensure it's within bounds
      slideIndex = (slideIndex + 1) % profiles.length;
      showSlides(); // Call showSlides to update the carousel
    });
  
    // Intersection Observer
    var scrollableLink = $('.scrollable-link');
  
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          scrollableLink.addClass('scroll-active');
        } else {
          scrollableLink.removeClass('scroll-active');
        }
      });
    }, { threshold: [0] });
  
    observer.observe(scrollableLink[0]);
  });
  
// testimonial curosel
$(document).ready(function () {
    function initializeCarousel(carouselId) {
        var currentIndex = 0;
        var totalTestimonials = $('#' + carouselId + ' .testimonial-profile').length;
        var intervalId;

        function startAutomaticCarousel() {
            intervalId = setInterval(function () {
                currentIndex = (currentIndex + 1) % totalTestimonials;
                updateCarousel();
            }, 5000); // Adjust the interval duration (in milliseconds) as needed
        }

        function stopAutomaticCarousel() {
            clearInterval(intervalId);
        }

        function updateCarousel() {
            $('#' + carouselId + ' .testimonial-profile').removeClass('active');
            $('#' + carouselId + ' .testimonial-profile').eq(currentIndex).addClass('active');

            $('#' + carouselId + ' .dot').removeClass('active');
            $('#' + carouselId + ' .dot').eq(currentIndex).addClass('active');
        }

        // Add dots dynamically based on the number of testimonials
        for (var i = 0; i < totalTestimonials; i++) {
            $('#' + carouselId + ' .dots-container').append('<div class="dot"></div>');
        }

        // Set the first dot as active initially
        $('#' + carouselId + ' .dot:first-child').addClass('active');

        // Start automatic carousel
        startAutomaticCarousel();

        // Pause automatic carousel when hovering over the testimonial slider
        $('#' + carouselId + ' .testimonial-slider').hover(function () {
            stopAutomaticCarousel();
        }, function () {
            startAutomaticCarousel();
        });

        // Manual navigation
        $('#' + carouselId + ' .next-btn').click(function () {
            currentIndex = (currentIndex + 1) % totalTestimonials;
            updateCarousel();
        });

        $('#' + carouselId + ' .prev-btn').click(function () {
            currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
            updateCarousel();
        });

        $('#' + carouselId + ' .dots-container').on('click', '.dot', function () {
            currentIndex = $(this).index();
            updateCarousel();
        });
    }

    // Initialize carousels
    initializeCarousel('carousel4');
    initializeCarousel('carousel5');
});



// safari experrience section 
(function($) {
  $.fn.experienceCarousel = function(opt) {
      var $this = this,
          profileClass = opt.profileClass || 'experience-profile',
          $profile = $this.find('.' + profileClass),
          profileCount = $profile.length;

      var defaultIndex = 2;

      changeIndex(defaultIndex);

      // Set an interval to swap content every 5 seconds (adjust as needed)
      var intervalId = setInterval(swapContent, 5000);

      // Pause carousel on hover
      $this.hover(
          function() {
              clearInterval(intervalId);
          },
          function() {
              intervalId = setInterval(swapContent, 5000);
          }
      );

      // Previous button click event
      $this.find('.prev-btn').on('click', function() {
          var nowIndex = $profile.index($this.find('.active'));
          var prevProfileIndex = nowIndex === 0 ? profileCount - 1 : nowIndex - 1;
          changeIndex(prevProfileIndex);
      });

      // Next button click event
      $this.find('.next-btn').on('click', function() {
          var nowIndex = $profile.index($this.find('.active'));
          var nextProfileIndex = (nowIndex + 1) % profileCount;
          changeIndex(nextProfileIndex);
      });

      function swapContent() {
          var nowIndex = $profile.index($this.find('.active'));
          var nextProfileIndex = (nowIndex + 1) % profileCount;
          changeIndex(nextProfileIndex);
      }

      function changeIndex(nowIndex) {
          $this.find('.active').removeClass('active');
          $this.find('.next').removeClass('next');
          $this.find('.prev').removeClass('prev');
          $this.find('.next_next').removeClass('next_next');
          $this.find('.prev_prev').removeClass('prev_prev');

          if (nowIndex === profileCount - 1) {
              $profile.eq(0).addClass('next_next');
              $profile.eq(1).addClass('next');
          }

          if (nowIndex === profileCount - 2) {
              $profile.eq(profileCount - 1).addClass('next');
          }

          if (nowIndex === 0) {
              $profile.eq(profileCount - 1).addClass('prev_prev');
              $profile.eq(0).addClass('prev');
          }

          if (nowIndex === 1) {
              $profile.eq(0).addClass('prev');
          }

          $profile.each(function(index) {
              if (index === nowIndex) {
                  $profile.eq(index).addClass('active');
              }

              if (index === nowIndex + 1) {
                  $profile.eq(index).addClass('next');
              }

              if (index === nowIndex + 2) {
                  $profile.eq(index).addClass('next_next');
              }

              if (index === nowIndex - 1) {
                  $profile.eq(index).addClass('prev');
              }

              if (index === nowIndex - 2) {
                  $profile.eq(index).addClass('prev_prev');
              }
          });
      }
  };
})(jQuery);

$('.experience-carousel').experienceCarousel({
  profileClass: 'experience-profile'
});


// safari-iconic-section
function toggleDropdown(button) {
  const allDropdowns = $('.dropdown-content');
  const allButtons = $('.dropdown-btn');
  const index = $(button).parent().children().index(button);

  allDropdowns.each(function(i) {
    const displayValue = i === index ? ($(this).css('display') === 'none' ? 'flex' : 'none') : 'none';
    $(this).css('display', displayValue);
    allButtons.eq(i).toggleClass('active', displayValue === 'flex');
  });
}


// Image transitions
$(document).ready(function () {
    var impactPhotos = $('.transition-imgs');
  
    impactPhotos.each(function() {
      var main_img = $(this).find('.main-img');
      var sub_img = $(this).find('.sub-img');
  
      var imgObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.intersectionRatio > 0) {
            // Apply your image transformations here
            main_img.css('transform', 'translateY(0%)');
            sub_img.css('transform', 'translateY(0%)');
          } else {
            // Reset image transformations when not in view
            main_img.css('transform', 'translateY(-6%)');
            sub_img.css('transform', 'translateY(6%)');
          }
        });
      }, { threshold: [0, 1] });
  
      imgObserver.observe(this);
    });
  });
  
// Enquiry content animation
$(document).ready(function () {
    var enquiryContent = $('.enquiry-content');

    enquiryContent.each(function() {
        var enquiryContentElement = $(this);

        var enquiryObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.intersectionRatio > 0) {
                    enquiryContentElement.addClass('animate-in');
                } else {
                    enquiryContentElement.removeClass('animate-in');
                }
            });
        }, { threshold: [0, 1] });

        enquiryObserver.observe(this);
    });
});



// Destination main page

// Destination hero section
const destinationZoomElement = $(".destination-hero-img");
let destinationZoom = 1;
const DESTINATION_ZOOM_SPEED = 0.3;
const DESTINATION_MAX_ZOOM = 3;
const DESTINATION_MIN_ZOOM = 1;

const destinationSection = $(".main-destination-section");
const destinationSectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // User has scrolled to the section, enable zoom
      enableDestinationZoom();
    } else {
      // User has scrolled away from the section, disable zoom
      disableDestinationZoom();
    }
  });
});

destinationSectionObserver.observe(destinationSection[0]); // Access the DOM element from the jQuery object

function enableDestinationZoom() {
  $(document).on("wheel touchmove", destinationZoomHandler);
  $(document).on("keydown", destinationKeyDownHandler);
}

function disableDestinationZoom() {
  $(document).off("wheel touchmove", destinationZoomHandler);
  $(document).off("keydown", destinationKeyDownHandler);
}

function destinationZoomHandler(e) {
  const delta = e.originalEvent.deltaY || (e.originalEvent.touches && e.originalEvent.touches[0].clientY - e.originalEvent.touches[1].clientY) || 0;
  const scrollDirection = delta > 0 ? "down" : "up";

  updateDestinationZoom(destinationZoomElement, scrollDirection, DESTINATION_ZOOM_SPEED, DESTINATION_MIN_ZOOM, DESTINATION_MAX_ZOOM);
}

function destinationKeyDownHandler(e) {
  const scrollDirection = e.key === "ArrowDown" ? "down" : e.key === "ArrowUp" ? "up" : null;

  if (scrollDirection) {
    updateDestinationZoom(destinationZoomElement, scrollDirection, DESTINATION_ZOOM_SPEED, DESTINATION_MIN_ZOOM, DESTINATION_MAX_ZOOM);
  }
}

function updateDestinationZoom(element, direction, speed, minZoom, maxZoom) {
  if (direction === "down") {
    destinationZoom += speed;
  } else {
    destinationZoom -= speed;
  }

  // Constrain zoom within specified limits
  destinationZoom = Math.min(Math.max(destinationZoom, minZoom), maxZoom);

  element.css("transform", `scale(${destinationZoom})`);

}

// exploration-curosel-section
jQuery(document).ready(function ($) {

    console.log("Initializing carousel");

    // Function to initialize the carousel
    function initCarousel(carouselContainer) {
        var slideCount = carouselContainer.find('.exploration-slide').length;
        var slideWidth = carouselContainer.find('.exploration-slide').outerWidth();
        var slideHeight = carouselContainer.find('.exploration-slide').outerHeight();
        var sliderUlWidth = slideCount * slideWidth;

        carouselContainer.find('.exploration-curosel').css({ width: slideWidth, height: slideHeight });
        carouselContainer.find('.exploration-sliders').css({ width: sliderUlWidth, marginLeft: -slideWidth });
        carouselContainer.find('.exploration-slide:last-child').prependTo(carouselContainer.find('.exploration-sliders'));

        function moveLeft() {
            carouselContainer.find('.exploration-sliders').animate({
                left: +slideWidth
            }, 200, function () {
                carouselContainer.find('.exploration-slide:last-child').prependTo(carouselContainer.find('.exploration-sliders'));
                carouselContainer.find('.exploration-sliders').css('left', '');
            });
        }

        function moveRight() {
            carouselContainer.find('.exploration-sliders').animate({
                left: -slideWidth
            }, 200, function () {
                carouselContainer.find('.exploration-slide:first-child').appendTo(carouselContainer.find('.exploration-sliders'));
                carouselContainer.find('.exploration-sliders').css('left', '');
            });
        }

        // Set interval for automatic slide change
        var intervalId;

        function startInterval() {
            intervalId = setInterval(moveRight, 6000);
        }

        function stopInterval() {
            clearInterval(intervalId);
        }

        carouselContainer.find('#checkbox').change(function () {
            if ($(this).is(':checked')) {
                startInterval();
            } else {
                stopInterval();
            }
        });

        carouselContainer.find('.prev').click(moveLeft);
        carouselContainer.find('.next').click(moveRight);

        // Start the interval by default
        startInterval();
    }

    // Call the initCarousel function for each carousel
    initCarousel($('#carousel1'));
    initCarousel($('#carousel2'));
    initCarousel($('#carousel3'));
    // Add more calls for additional carousels as needed
});

// Best destination
$(document).ready(function() {
  let slideIndex = 0;
  const slider = $('.best-destination-img-slider');
  const slides = $('.best-destination-img');

  // Clone the first slide and append it to the end
  slider.append(slides.first().clone());

  function showSlides() {
    if (slideIndex >= slides.length) {
      slideIndex = 0;
      // Append the first slide to the end for a continuous loop
      slider.append(slides.first().clone());

      // Reset the transform to the beginning without animation
      slider.css({ 'transition': 'none', 'transform': 'translateX(0)' });
      // Force reflow to apply the transform immediately
      slider.width();
      // Restore the transition for the upcoming animation
      slider.css({ 'transition': 'transform 0.6s ease-in-out' });
    }

    // Check if it's mobile or desktop
    const isMobile = window.innerWidth < 900; // You can adjust the breakpoint as needed

    const translateValue = isMobile ? -slideIndex * 110 + '%' : -slideIndex * 20 + '%';
    slider.css({ 'transform': 'translateX(' + translateValue + ')' });
  }

  window.nextSlide = function() {
    slideIndex++;
    showSlides();
  };

  window.prevSlide = function() {
    slideIndex--;
    showSlides();
  }

  // Show the first slide initially
  showSlides();

  // Loop the slideshow
  setInterval(window.nextSlide, 3000);
});



// intinerary page
// Intinerary slide show
document.addEventListener('DOMContentLoaded', function () {
    // Select all carousel elements
    const carousels = document.querySelectorAll('.intinerary-carousel');

    carousels.forEach(function(carousel) {
        const imgs = carousel.getElementsByClassName('intinerary-carosel-img');
        let idx = 0; // Current image index for each carousel

        function showImg(index) {
            // Hide all images in the current carousel
            Array.from(imgs).forEach(img => img.style.display = 'none');
            // Show the image of the current index in the current carousel
            imgs[index].style.display = 'block';
        }

        // Initial display for the current carousel
        showImg(idx);

        // Find the previous and next buttons relative to the current carousel
        const prevButton = carousel.parentElement.querySelector('.prev-intinerary');
        const nextButton = carousel.parentElement.querySelector('.next-intinerary');

        // Previous button functionality
        prevButton.addEventListener('click', function() {
            idx = idx > 0 ? idx - 1 : imgs.length - 1;
            showImg(idx);
            resetInterval(); // Reset the interval when manually navigating
        });

        // Next button functionality
        nextButton.addEventListener('click', function() {
            idx = (idx + 1) % imgs.length;
            showImg(idx);
            resetInterval(); // Reset the interval when manually navigating
        });

        // Function to automate the carousel
        function automateCarousel() {
            idx = (idx + 1) % imgs.length; // Increment index to move to the next image
            showImg(idx);
        }

        // Set the interval for automatic change
        let intervalId = setInterval(automateCarousel, 3000); // Change image every 3000 milliseconds (3 seconds)

        // Function to reset the interval when manually navigating
        function resetInterval() {
            clearInterval(intervalId); // Clear the existing interval
            intervalId = setInterval(automateCarousel, 3000); // Start a new interval
        }
    });
});

// intinerary img dropdown 
$(document).ready(function() {
    $('.drop-btn').click(function() {
        const btn = $(this); // Reference to the button
        // Toggle the next '.intinerary-carosel-activity-img' visibility
        const imgDiv = btn.closest('.your-intinerary-profile').find('.intinerary-carosel-activity-img');
        imgDiv.slideToggle(function() { // Use slideToggle with a callback function
            // Change the button icon based on visibility inside the callback
            if (imgDiv.is(':visible')) {
                btn.html('<i class="fa fa-fas fa-minus"></i>'); // Change icon to minus if visible
            } else {
                btn.html('<i class="fa fa-fas fa-plus"></i>'); // Change icon to plus if hidden
            }
        });
    });
});

// Booking Section
$(document).ready(function(){
    $(".book-now").click(function(){
        $(".booking-section").css('display', 'flex').hide().fadeIn(); // Set to flex, then hide it immediately, and finally use fadeIn
    });

    // Close the booking section when the close button is clicked
    $(".close-booking").click(function(){
        $(".booking-section").fadeOut(); // Use fadeOut for a smooth disappearance
    });

    // Optional: Close the booking section when clicking on the overlay background
    $(".booking-section").click(function(event){
        if(event.target == this) { // Check if the overlay itself was clicked
            $(this).fadeOut(); // Use fadeOut to hide
        }
    });
});

// footer

$(document).ready(function(){
    $(".main-footer-dropper").click(function(){
        // Check if the next sibling element is currently visible
        var $dropdownContent = $(this).next();
        if ($dropdownContent.is(":visible")) {
            // If visible, slide up (hide)
            $dropdownContent.slideUp("slow");
        } else {
            // If hidden, slide down (show) and then set display to flex
            $dropdownContent.slideDown("slow", function() {
                // This callback function is executed after the slideDown animation completes
                $(this).css('display', 'flex');
            });
        }
    });
});
