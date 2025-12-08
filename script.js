/**
 * Portfolio Website JavaScript
 * Provides interactive functionality for the portfolio
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initContactForm();
    initScrollAnimations();
    initSmoothScroll();
});

/**
 * Mobile Menu Toggle
 * Handles the responsive navigation menu for mobile devices
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(function(link) {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('nav')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
}

/**
 * Contact Form Handler
 * Handles form submission with validation
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Basic validation
            if (!validateForm(data)) {
                showFormStatus('Please fill in all required fields correctly.', 'error');
                return;
            }

            // Simulate form submission (replace with actual API call)
            showFormStatus('Sending message...', 'success');
            
            // Simulate successful submission after delay
            setTimeout(function() {
                showFormStatus('Thank you for your message! I will get back to you soon.', 'success');
                form.reset();
            }, 1000);
        });
    }

    function validateForm(data) {
        // Check if all required fields are filled
        if (!data.name || !data.email || !data.subject || !data.message) {
            return false;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return false;
        }

        return true;
    }

    function showFormStatus(message, type) {
        if (formStatus) {
            formStatus.textContent = message;
            formStatus.className = 'form-status ' + type;
        }
    }
}

/**
 * Scroll Animations
 * Adds fade-in animations to elements as they enter the viewport
 */
function initScrollAnimations() {
    // Elements to animate
    var animatedElements = document.querySelectorAll(
        '.card, .project-card, .cv-item, .contact-method'
    );

    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(function(el) {
            el.style.opacity = '0';
            observer.observe(el);
        });
    } else {
        // Fallback for older browsers
        animatedElements.forEach(function(el) {
            el.classList.add('fade-in');
        });
    }
}

/**
 * Smooth Scroll
 * Provides smooth scrolling for anchor links
 */
function initSmoothScroll() {
    var anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            var targetId = this.getAttribute('href');
            
            if (targetId !== '#') {
                var targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    event.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

/**
 * Utility: Debounce function
 * Limits the rate at which a function can fire
 */
function debounce(func, wait) {
    var timeout;
    return function() {
        var context = this;
        var args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            func.apply(context, args);
        }, wait);
    };
}

/**
 * Utility: Throttle function
 * Ensures a function is called at most once in a specified period
 */
function throttle(func, limit) {
    var inThrottle;
    return function() {
        var context = this;
        var args = arguments;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(function() {
                inThrottle = false;
            }, limit);
        }
    };
}



fetch("pinned.json")
  .then(res => res.json())
  .then(data => {
    const container = document.querySelector(".projects");
    container.innerHTML = "";
    data.forEach(({ node }) => {
      const tags = node.languages.nodes.map(lang => `<span class="tag">${lang.name}</span>`).join("");
      container.innerHTML += `
        <div class="project-card completed">
          <div class="project-content">
            <h3>${node.name}</h3>
            <p class="project-status completed-status">Pinned</p>
            <p>${node.description || "No description available."}</p>
            <div class="project-tags">${tags}</div>
            <{node.url}View on GitHub</a>
          </div>
        </div>
      `;
    });
  })
  .catch(err => console.error(err));


// Get the container element where posts will be displayed
const postsContainer = document.getElementById('posts');

// Use the Fetch API to get data from the JSONPlaceholder API
fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json()) // Convert the response to JSON format
  .then(posts => {
    // Loop through each post and display it on the page
    posts.forEach(post => {
      // Create a new div element for each post
      const postDiv = document.createElement('div');
      postDiv.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.body}</p>
      `;
      // Append the new div to the container
      postsContainer.appendChild(postDiv);
    });
  })
  .catch(error => console.error('Error fetching posts:', error));
