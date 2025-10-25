// Modern Portfolio JavaScript for Anand Kumar Panigrahi

// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
  offset: 100
});

jQuery(document).ready(function($) {
  "use strict";

  // Navbar scroll effect
  var navbar = $('.navbar');
  var navbarHeight = navbar.outerHeight();

  $(window).scroll(function() {
    var scrollTop = $(this).scrollTop();
    
    if (scrollTop > 50) {
      navbar.addClass('scrolled');
    } else {
      navbar.removeClass('scrolled');
    }
  });

  // Smooth scrolling for navigation links
  $('a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    
    var target = this.hash;
    var $target = $(target);
    
    if ($target.length) {
      $('html, body').animate({
        scrollTop: $target.offset().top - navbarHeight
      }, 800, 'easeInOutCubic');
      
      // Update active nav link
      $('.navbar-nav .nav-link').removeClass('active');
      $(this).addClass('active');
      
      // Close mobile menu if open
      $('.navbar-collapse').collapse('hide');
    }
  });

  // Update active nav link on scroll
  $(window).scroll(function() {
    var scrollPos = $(document).scrollTop() + navbarHeight + 50;
    
    $('.navbar-nav .nav-link').each(function() {
      var currLink = $(this);
      var refElement = $(currLink.attr("href"));
      
      if (refElement.length && refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
        $('.navbar-nav .nav-link').removeClass("active");
        currLink.addClass("active");
      } else {
        currLink.removeClass("active");
      }
    });
  });

  // Skill bars animation
  function animateSkillBars() {
    $('.skill-progress').each(function() {
      var $this = $(this);
      var width = $this.data('width');
      
      if (width) {
        $this.css('--target-width', width);
        $this.animate({
          width: width
        }, 2000, 'easeOutCubic');
      }
    });
  }

  // Trigger skill bars animation when skills section is in view
  var skillsAnimated = false;
  $(window).scroll(function() {
    var skillsSection = $('#skills');
    if (skillsSection.length) {
      var skillsTop = skillsSection.offset().top;
      var skillsHeight = skillsSection.outerHeight();
      var windowTop = $(window).scrollTop();
      var windowHeight = $(window).height();
      
      if (windowTop + windowHeight > skillsTop + 100 && !skillsAnimated) {
        animateSkillBars();
        skillsAnimated = true;
      }
    }
  });

  // Typing animation for hero section
  function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    
    type();
  }

  // Initialize typing animation
  setTimeout(function() {
    var heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
      typeWriter(heroSubtitle, 'Backend Engineer', 150);
    }
  }, 1000);

  // Counter animation for hero stats
  function animateCounter(element, target, duration = 2000) {
    var start = 0;
    var increment = target / (duration / 16);
    
    function updateCounter() {
      start += increment;
      if (start < target) {
        element.textContent = Math.floor(start) + (target > 10 ? '+' : '');
        requestAnimationFrame(updateCounter);
      } else {
        if (target === 0) {
          element.textContent = '0';
        } else {
          element.textContent = target + (target > 10 ? '+' : '');
        }
      }
    }
    
    updateCounter();
  }

  // Trigger counter animations
  var countersAnimated = false;
  $(window).scroll(function() {
    var heroSection = $('.hero-section');
    if (heroSection.length && !countersAnimated) {
      var heroTop = heroSection.offset().top;
      var heroHeight = heroSection.outerHeight();
      var windowTop = $(window).scrollTop();
      var windowHeight = $(window).height();
      
      if (windowTop < heroHeight) {
        $('.stat-number').each(function() {
          var $this = $(this);
          var text = $this.text().replace('+', '');
          var target = parseInt(text);
          
          if (!isNaN(target)) {
            animateCounter(this, target);
          }
        });
        countersAnimated = true;
      }
    }
  });

  // Parallax effect for hero section
  $(window).scroll(function() {
    var scrolled = $(window).scrollTop();
    var parallax = $('.hero-section');
    var speed = 0.5;
    
    if (parallax.length) {
      var yPos = -(scrolled * speed);
      parallax.css('transform', 'translate3d(0, ' + yPos + 'px, 0)');
    }
  });

  // Tech orbit hover effects
  $('.tech-item').hover(
    function() {
      $(this).css('transform', 'scale(1.2)');
      var techName = $(this).data('tech');
      if (techName) {
        $(this).attr('title', techName);
      }
    },
    function() {
      $(this).css('transform', 'scale(1)');
    }
  );

  // Project card hover effects
  $('.project-card').hover(
    function() {
      $(this).find('.project-image img').css('transform', 'scale(1.1)');
    },
    function() {
      $(this).find('.project-image img').css('transform', 'scale(1)');
    }
  );

  // Testimonial carousel (if using owl carousel)
  if ($('.testimonial-carousel').length) {
    $('.testimonial-carousel').owlCarousel({
      items: 1,
      loop: true,
      autoplay: true,
      autoplayTimeout: 6000,
      autoplayHoverPause: true,
      nav: false,
      dots: true,
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      smartSpeed: 1000
    });
  }

  // Smooth reveal animations for elements
  function revealOnScroll() {
    var reveals = document.querySelectorAll('.fade-in');
    
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;
      
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add('visible');
      }
    }
  }

  $(window).scroll(revealOnScroll);
  revealOnScroll(); // Initial check

  // Mobile menu toggle
  $('.navbar-toggler').click(function() {
    $(this).toggleClass('active');
    $('.navbar-collapse').toggleClass('show');
  });

  // Close mobile menu when clicking outside
  $(document).click(function(e) {
    if (!$(e.target).closest('.navbar').length) {
      $('.navbar-collapse').removeClass('show');
      $('.navbar-toggler').removeClass('active');
    }
  });

  // Form validation and submission (if contact form exists)
  $('#contact-form').on('submit', function(e) {
    e.preventDefault();
    
    var form = $(this);
    var formData = form.serialize();
    
    // Add your form submission logic here
    console.log('Form submitted:', formData);
    
    // Show success message
    showNotification('Message sent successfully!', 'success');
  });

  // Notification system
  function showNotification(message, type = 'info') {
    var notification = $('<div class="notification notification-' + type + '">' + message + '</div>');
    
    $('body').append(notification);
    
    setTimeout(function() {
      notification.addClass('show');
    }, 100);
    
    setTimeout(function() {
      notification.removeClass('show');
      setTimeout(function() {
        notification.remove();
      }, 300);
    }, 3000);
  }

  // Loading screen (if needed)
  $(window).on('load', function() {
    $('.loader').fadeOut('slow');
    $('body').removeClass('loading');
  });

  // Lazy loading for images
  if ('IntersectionObserver' in window) {
    var imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(function(img) {
      imageObserver.observe(img);
    });
  }

  // Scroll to top button
  var scrollToTopBtn = $('<button class="scroll-to-top" title="Back to top"><i class="icon-arrow-up"></i></button>');
  $('body').append(scrollToTopBtn);

  $(window).scroll(function() {
    if ($(this).scrollTop() > 500) {
      scrollToTopBtn.addClass('show');
    } else {
      scrollToTopBtn.removeClass('show');
    }
  });

  scrollToTopBtn.click(function() {
    $('html, body').animate({scrollTop: 0}, 800);
  });

  // Performance optimization: Debounce scroll events
  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  // Apply debouncing to scroll events
  $(window).scroll(debounce(function() {
    // Scroll-dependent functions can be called here
  }, 10));

  // Preload critical images
  function preloadImages(urls) {
    urls.forEach(function(url) {
      var img = new Image();
      img.src = url;
    });
  }

  // Add critical images to preload
  preloadImages([
    'images/logo_10.jpg',
    'images/logo_11.png',
    'images/logo_12.png',
    'images/logo_13.jpeg',
    'images/logo_14.png',
    'images/logo_15.svg'
  ]);

  // Initialize tooltips (if using Bootstrap tooltips)
  $('[data-toggle="tooltip"]').tooltip();

  // Initialize popovers (if using Bootstrap popovers)
  $('[data-toggle="popover"]').popover();

  // Custom easing functions
  $.easing.easeInOutCubic = function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t + b;
    return c/2*((t-=2)*t*t + 2) + b;
  };

  $.easing.easeOutCubic = function (x, t, b, c, d) {
    return c*((t=t/d-1)*t*t + 1) + b;
  };

  // Console message for developers
  console.log('%c👋 Hello Developer!', 'color: #2563eb; font-size: 16px; font-weight: bold;');
  console.log('%cThis portfolio was crafted with ❤️ by Anand Kumar Panigrahi', 'color: #64748b; font-size: 12px;');
  console.log('%cInterested in working together? Let\'s connect!', 'color: #10b981; font-size: 12px;');

});

// Additional CSS for scroll-to-top button and notifications
var additionalCSS = `
<style>
.scroll-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: var(--gradient-primary);
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 20px;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transform: translateY(20px);
  transition: all 0.3s ease;
  z-index: 1000;
  box-shadow: var(--shadow-lg);
}

.scroll-to-top.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.scroll-to-top:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-xl);
}

.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px 20px;
  border-radius: 8px;
  color: white;
  font-weight: 500;
  z-index: 9999;
  transform: translateX(400px);
  transition: all 0.3s ease;
  box-shadow: var(--shadow-lg);
}

.notification.show {
  transform: translateX(0);
}

.notification-success {
  background: var(--success-color);
}

.notification-error {
  background: var(--danger-color);
}

.notification-info {
  background: var(--primary-color);
}

.loading {
  overflow: hidden;
}

.loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.lazy {
  opacity: 0;
  transition: opacity 0.3s;
}

.lazy.loaded {
  opacity: 1;
}

@media (max-width: 768px) {
  .scroll-to-top {
    bottom: 20px;
    right: 20px;
    width: 45px;
    height: 45px;
    font-size: 18px;
  }
  
  .notification {
    top: 10px;
    right: 10px;
    left: 10px;
    transform: translateY(-100px);
  }
  
  .notification.show {
    transform: translateY(0);
  }
}
</style>
`;

// Inject additional CSS
$('head').append(additionalCSS);