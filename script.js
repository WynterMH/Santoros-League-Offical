// =======================  
// PRELOAD IMAGES  
// =======================  
function preloadImages(selector) {  
    document.querySelectorAll(selector).forEach(img => {  
        if (img.src) new Image().src = img.src;  
    });  
}  

// =======================  
// ANIMATION MANAGER  
// =======================  
const AnimationManager = {  
    init() {  
        this.preloadAssets();  
        this.setupAnimations();  
        this.addEventListeners();  
    },  

    preloadAssets() {  
        preloadImages('.image-sequence img');  
        preloadImages('.section-image');  
    },  

    setupAnimations() {  
        ScrollTrigger.create({
            trigger: "#fade-gif-trigger",
            start: "top center",
            end: "bottom center",
            onEnter: () => {
              gsap.to(".fade-gif", {
                opacity: 1,
                scale: 1,
                duration: 1.2,
                ease: "power4.out"
              });
              gsap.to(".gif-caption", {
                opacity: 1,
                duration: 1,
                delay: 0.3
              });
            },
            onLeaveBack: () => {
              gsap.to(".fade-gif", {
                opacity: 0,
                scale: 0.95,
                duration: 0.6
              });
              gsap.to(".gif-caption", {
                opacity: 0,
                duration: 0.5
              });
            }
          });
          
        gsap.registerPlugin(ScrollTrigger);  

        // ======== YOUR ORIGINAL ANIMATIONS START HERE ======== //
        
        // Combined Intro and Santos Animation
        const introSantosTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".intro-santos-container",
                start: "top top",
                end: "+=100%",
                scrub: true,
                pin: true,
                pinSpacing: true
            }
        });
        
        introSantosTimeline
            .to(".santos-title", {
                scale: 5,
                opacity: 0,
                duration: 1
            })
            .to(".prison-scene", {
                opacity: 1,
                duration: 0.5
            }, 0.8)
            .to(".sky", {
                scale: 1.5,
                duration: 1
            }, 1.5);

        // First Image Sequence Animation
        const firstSequenceImages = document.querySelectorAll('#first-sequence .image-sequence img');
        gsap.set(firstSequenceImages, { 
            opacity: 0,
            scale: 1,
            x: 0,
            y: 0
        });
        gsap.set(firstSequenceImages[0], { opacity: 1 });

        ScrollTrigger.create({
            trigger: "#first-sequence",
            start: "top top",
            end: "+=400%",
            pin: true,
            pinSpacing: true,
            onUpdate: self => {
                const progress = self.progress;
                const totalImages = firstSequenceImages.length;
                const imageIndex = Math.min(Math.floor(progress * totalImages), totalImages - 1);

                firstSequenceImages.forEach((img, i) => {
                    const isActive = i === imageIndex;
                    img.style.opacity = isActive ? 1 : 0;
                    if (isActive) img.classList.add('active');
                    else img.classList.remove('active');
                });
                
                // Special zoom effect
                if (imageIndex === 1 && progress * totalImages > 1.5) {
                    const zoomProgress = (progress * totalImages - 1.5) * 2;
                    const zoomScale = 1 + (zoomProgress * 4);
                    const windowX = -0.25 * (zoomScale - 1);
                    const windowY = -0.3 * (zoomScale - 1);
                    
                    gsap.to(firstSequenceImages[1], {
                        scale: zoomScale,
                        x: windowX,
                        y: windowY,
                        duration: 0.5
                    });

                    if (zoomProgress >= 1) {
                        gsap.to(firstSequenceImages[1], { opacity: 0, duration: 0.5 });
                        gsap.to(firstSequenceImages[2], { opacity: 1, duration: 0.5 });
                    }
                } else {
                    firstSequenceImages.forEach((img, i) => {
                        const isActive = i === imageIndex;
                        img.style.opacity = isActive ? 1 : 0;
                        if (isActive) {
                            img.style.scale = 1;
                            img.style.transform = 'translate(0, 0)';
                        }
                    });
                }
            }
        });

        // Second Image Sequence Animation
        
        ScrollTrigger.create({
            trigger: "#second-sequence",
            start: "top top",
            end: "+=300%",
            pin: true,
            pinSpacing: true,
            onUpdate: self => {
                const progress = self.progress;
                const images = document.querySelectorAll('#second-sequence .image-text-pair img');
                const totalImages = images.length;
                const activeIndex = Math.floor(progress * (totalImages - 1));
                
                images.forEach((img, index) => {
                    const text = img.nextElementSibling;
                    if(index === activeIndex) {
                        img.classList.add('active');
                        gsap.to(text, { opacity: 1, duration: 0.5 });
                    } else {
                        img.classList.remove('active');
                        gsap.to(text, { opacity: 0, duration: 0.3 });
                    }
                });
            }
        });

        // First Horizontal Scroll Animation (Left to Right)
        gsap.to(".scroll-container", {
            x: () => {
              const container = document.querySelector(".scroll-container");
              return -(container.scrollWidth - window.innerWidth);
            },
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: ".scroll-container",
              start: "top top",
              end: () => `+=${document.querySelector(".scroll-container").scrollWidth}`,
              scrub: 1.5, // Smoother scrubbing
              pin: true,
              anticipatePin: 1,
              onUpdate: self => {
                // Parallax effect for images
                gsap.to(".section-image", {
                  xPercent: -self.progress * 15,
                  ease: "sine.out"
                });
              }
            }
          });

        // Third Image Sequence Animation
        ScrollTrigger.create({
            trigger: "#third-sequence",
            start: "top top",
            end: "+=300%",
            pin: true,
            pinSpacing: true,
            onUpdate: self => {
                const progress = self.progress;
                const images = document.querySelectorAll('#third-sequence .image-text-pair img');
                const totalImages = images.length;
                const activeIndex = Math.floor(progress * (totalImages - 1));
                
                images.forEach((img, index) => {
                    const text = img.nextElementSibling;
                    if(index === activeIndex) {
                        img.classList.add('active');
                        gsap.to(text, { opacity: 1, duration: 0.5 });
                    } else {
                        img.classList.remove('active');
                        gsap.to(text, { opacity: 0, duration: 0.3 });
                    }
                });
            }
        });

        // Vertical Sections
        gsap.utils.toArray(".vertical-section").forEach((section, i) => {
            ScrollTrigger.create({
                trigger: section,
                start: "top top",
                pin: true,
                pinSpacing: false
            });
        });

        // Future Zoom & Fade Effect
        gsap.to(".future-title", {
            scale: 5,
            opacity: 0,
            scrollTrigger: {
                trigger: ".future-container",
                start: "top top",
                end: "bottom top",
                scrub: true,
                pin: true,
                pinSpacing: false
            }
        });

        
        

        // Zoom effects
        gsap.utils.toArray(".section").forEach((section) => {
            gsap.fromTo(section, { scale: 0.8 }, {
                scale: 1,
                scrollTrigger: {
                    trigger: section,
                    start: "left center",
                    end: "right center",
                    scrub: true
                }
            });
        });

        gsap.utils.toArray(".right-section").forEach((section) => {
            gsap.fromTo(section, { scale: 0.8 }, {
                scale: 1,
                scrollTrigger: {
                    trigger: section,
                    start: "left center",
                    end: "right center",
                    scrub: true
                }
            });
        });

        const fadePairs = document.querySelectorAll("#fade-horizontal .fade-pair");
        fadePairs.forEach((pair) => {
        gsap.set(pair.querySelector("img"), { opacity: 0, x: "100%" });
        gsap.set(pair.querySelector(".fade-text"), { opacity: 0 });
        });

        ScrollTrigger.create({
        trigger: "#fade-horizontal",
        start: "top top",
        end: "+=300%",
        scrub: true,
        pin: true,
        onUpdate: (self) => {
            const progress = self.progress;
            const total = fadePairs.length;
            const index = Math.floor(progress * total);
            const localProgress = (progress * total) % 1;

            fadePairs.forEach((pair, i) => {
            const img = pair.querySelector("img");
            const text = pair.querySelector(".fade-text");

            if (i === index) {
                gsap.to(img, {
                opacity: 1,
                x: `${(1 - localProgress) * 100}%`,
                duration: 0.2,
                overwrite: "auto",
                });
                gsap.to(text, { opacity: 1, duration: 0.3, overwrite: "auto" });
            } else if (i === index - 1) {
                gsap.to(img, {
                opacity: 1 - localProgress,
                x: `-${localProgress * 100}%`,
                duration: 0.2,
                overwrite: "auto",
                });
                gsap.to(text, { opacity: 0, duration: 0.2, overwrite: "auto" });
            } else {
                gsap.to(img, { opacity: 0, x: "100%", duration: 0.2, overwrite: "auto" });
                gsap.to(text, { opacity: 0, duration: 0.2, overwrite: "auto" });
            }
            });
        },
        });


        // ======== YOUR ORIGINAL ANIMATIONS END HERE ======== //

        // New Act Transition
        gsap.to("#act1-end", { 
            opacity: 0,
            scrollTrigger: {
                trigger: "#act1-end",
                start: "top center",
                end: "bottom top",
                scrub: true
            }
        });
        const angerPairs = document.querySelectorAll("#anger-sequence .anger-pair");

ScrollTrigger.create({
  trigger: "#anger-sequence",
  start: "top top",
  end: "+=300%",
  scrub: true,
  pin: true,
  onUpdate: (self) => {
    const progress = self.progress;
    const total = angerPairs.length;
    const index = Math.floor(progress * total);
    const localProgress = (progress * total) % 1;

    angerPairs.forEach((pair, i) => {
      const img = pair.querySelector("img");
      const text = pair.querySelector(".anger-text");

      if (i === index) {
        // Shake in place
        gsap.to(img, {
          opacity: 1,
          x: () => (Math.random() - 0.5) * 10,
          y: () => (Math.random() - 0.5) * 10,
          rotation: () => (Math.random() - 0.5) * 4,
          duration: 0.1,
          ease: "none",
          overwrite: true,
        });

        gsap.to(text, { opacity: 1, duration: 0.4 });
      } else {
        gsap.to(img, {
          opacity: 0,
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.3,
          overwrite: true,
        });
        gsap.to(text, { opacity: 0, duration: 0.3 });
      }
    });
  }
});

// In script.js - Add this after anger scene animation
const zoomPairs = gsap.utils.toArray('.zoom-pair');
let activeZoomIndex = 0;

ScrollTrigger.create({
    trigger: ".zoom-sequence-container",
    start: "top top",
    end: "+=300%",
    scrub: 1.2,
    pin: true,
    onUpdate: self => {
        const total = zoomPairs.length;
        const rawProgress = self.progress * total;
        const newIndex = Math.floor(rawProgress);
        const pairProgress = rawProgress % 1;

        // Only update when index changes
        if (newIndex !== activeZoomIndex) {
            // Fade out current
            gsap.to(zoomPairs[activeZoomIndex], {
                opacity: 0,
                scale: 0.8,
                duration: 1.2,
                ease: "power3.inOut",
                onComplete: () => {
                    zoomPairs[activeZoomIndex].classList.remove('active');
                }
            });

            // Update index
            activeZoomIndex = Math.min(newIndex, total - 1);

            // Fade in new
            gsap.fromTo(zoomPairs[activeZoomIndex],
                { opacity: 0, scale: 1.3 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1.5,
                    ease: "power3.inOut",
                    onStart: () => {
                        zoomPairs[activeZoomIndex].classList.add('active');
                    }
                }
            );
        }

        // Continuous zoom effect
        if (zoomPairs[activeZoomIndex]) {
            gsap.to(zoomPairs[activeZoomIndex], {
                scale: 1 - (pairProgress * 0.15),
                duration: 0.1
            });
        }
    }
});

    },  

    addEventListeners() {  
        // Original event listeners
        document.querySelectorAll('input[type="file"]').forEach((input, index) => {
            input.addEventListener('change', function(e) {
                if (this.files && this.files[0]) {
                    const reader = new FileReader();
                    const imgElements = document.querySelectorAll('.section-image, .right-section .section-image');
                    
                    reader.onload = function(e) {
                        if (index < imgElements.length) {
                            imgElements[index].src = e.target.result;
                        }
                    };
                    reader.readAsDataURL(this.files[0]);
                }
            });
        });

        // Flashback functionality
        const flashbackTrigger = document.querySelector('.flashback-trigger');
        const flashbackContent = document.querySelector('.flashback-content');
        const closeFlashback = document.querySelector('.close-flashback');
        // Add to AnimationManager.addEventListeners()
        const flashbackTrigger2 = document.querySelector('#flashbackTrigger2');
        const flashbackContent2 = document.querySelector('#flashbackContent2');
        const closeFlashback2 = document.querySelector('#flashbackContent2 .close-flashback');

        if(flashbackTrigger2) {
            flashbackTrigger2.addEventListener('click', () => {
                flashbackContent2.style.display = 'block';
                playFlashbackSequence('#flashbackContent2 .flashback-sequence');
            });
        }

        if(closeFlashback2) {
            closeFlashback2.addEventListener('click', () => {
                flashbackContent2.style.display = 'none';
            });
        }

        // Update playFlashbackSequence to accept selector
        function playFlashbackSequence(selector) {
            const flashbackImages = document.querySelectorAll(`${selector} img`);
            let currentIndex = 0;
            
            flashbackImages.forEach((img, i) => {
                img.classList.remove('active');
                if (i === 0) img.classList.add('active');
            });
            
            const flashbackInterval = setInterval(() => {
                flashbackImages[currentIndex].classList.remove('active');
                currentIndex = (currentIndex + 1) % flashbackImages.length;
                flashbackImages[currentIndex].classList.add('active');
                
                if (currentIndex === flashbackImages.length - 1) {
                    clearInterval(flashbackInterval);
                }
            }, 2000);
        }
        
        if(flashbackTrigger) {
            flashbackTrigger.addEventListener('click', () => {
                flashbackContent.style.display = 'block';
                this.playFlashbackSequence();
            });
        }
        
        if(closeFlashback) {
            closeFlashback.addEventListener('click', () => {
                flashbackContent.style.display = 'none';
            });
        }

        // Image container toggle
        // In AnimationManager.addEventListeners()
        document.getElementById('imageContainer')?.addEventListener('click', function() {
            const secondaryImage = document.getElementById('secondaryImage');
            const primaryText = document.querySelector('#primaryImage + .flashback-text');
            const secondaryText = document.querySelector('#secondaryImage + .flashback-text');
            
            // Toggle visibility
            secondaryImage.classList.toggle('show');
            
            // Animate text transitions
            gsap.to(secondaryText, { 
                opacity: secondaryImage.classList.contains('show') ? 1 : 0,
                duration: 0.5 
            });
            gsap.to(primaryText, { 
                opacity: secondaryImage.classList.contains('show') ? 0 : 1,
                duration: 0.5 
            });

            // Original indicator update
            const indicator = this.querySelector('.click-indicator');
            if (indicator) {
                indicator.textContent = secondaryImage.classList.contains('show') 
                    ? 'Click to return' 
                    : 'Click for flashback';
            }
        });
    },

    playFlashbackSequence() {
        const flashbackImages = document.querySelectorAll('.flashback-sequence img');
        let currentIndex = 0;
        
        flashbackImages.forEach((img, i) => {
            img.classList.remove('active');
            if (i === 0) img.classList.add('active');
        });
        
        const flashbackInterval = setInterval(() => {
            flashbackImages[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % flashbackImages.length;
            flashbackImages[currentIndex].classList.add('active');
            
            if (currentIndex === flashbackImages.length - 1) {
                clearInterval(flashbackInterval);
                setTimeout(() => {
                    // flashbackContent.style.display = 'none';
                }, 2000);
            }
        }, 2000);
    }
};


// Add this to your animation setup
ScrollTrigger.create({
    trigger: ".gif-container",
    start: "top center",
    end: "bottom center",
    onEnter: () => {
      // Force GIF to restart/play
      const gif = document.querySelector(".scrolling-gif");
      gif.style.opacity = 1;
      gif.src = gif.src; // Restart GIF
      gsap.to(gif, {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "power4.out"
      });
    },
    onLeaveBack: () => {
      gsap.to(".scrolling-gif", {
        opacity: 0,
        scale: 0.9,
        duration: 0.5
      });
    }
  });
// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', () => AnimationManager.init());

// In script.js
document.addEventListener('DOMContentLoaded', () => {
    const draggable = document.querySelector('.draggable');
    const checkpoints = document.querySelectorAll('.checkpoint');
    const checkpointImages = document.querySelectorAll('.checkpoint-img');
    const endZone = document.querySelector('.end-zone');
    const trackWidth = document.querySelector('.track').offsetWidth;
  
    // Initialize Draggable
    Draggable.create(draggable, {
      type: "x",
      bounds: ".game-container",
      edgeResistance: 0.65,
      onPress() {
        gsap.to(draggable, { scale: 1.2, duration: 0.2 });
      },
      onDrag() {
        const currentX = this.x;
        
        // Update draggable position
        gsap.set(draggable, { x: currentX });
        
        // Check checkpoints
        checkpoints.forEach((cp, index) => {
          const cpX = parseInt(cp.style.left) / 100 * trackWidth;
          if (Math.abs(currentX - cpX) < 15) {
            gsap.to(checkpointImages[index], {
              opacity: 1,
              y: 0,
              duration: 0.3
            });
          } else {
            gsap.to(checkpointImages[index], {
              opacity: 0,
              y: 20,
              duration: 0.3
            });
          }
        });
  
        // Check end zone
        if (currentX >= trackWidth * 0.85) {
          gsap.to(endZone, {
            opacity: 1,
            scale: 1.5,
            duration: 0.5,
            onComplete: () => {
              gsap.to([draggable, endZone], {
                x: 0,
                scale: 1,
                opacity: 1,
                duration: 1
              });
            }
          });
        }
      },
      onRelease() {
        gsap.to(draggable, { scale: 1, duration: 0.2 });
      }
    });
  });

  // NEW TYPEWRITER OBSERVER (non-conflicting with existing animations)
document.addEventListener("DOMContentLoaded", () => {
    const typewriterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const text = entry.target.querySelector('.typewriter-text');
            if (text) {
                text.classList.toggle('typewriter-visible', entry.isIntersecting);
            }
        });
    }, { threshold: 0.4 });

    // Target only sections that don't have flashback content
    document.querySelectorAll('.section:not(.flashback-content)').forEach(section => {
        typewriterObserver.observe(section);
    });
});
// Updated JavaScript with looping behavior
ScrollTrigger.create({
    trigger: ".video-trigger-section",
    start: "top center",
    end: "bottom center",
    onEnter: () => {
        const video = document.querySelector('.scroll-video');
        video.classList.add('playing');
        
        gsap.to(video, {
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "power4.out",
            onStart: () => {
                video.play().catch(error => {
                    // Fallback for autoplay restrictions
                    video.controls = true;
                });
            }
        });
    },
    onLeaveBack: () => {
        const video = document.querySelector('.scroll-video');
        video.pause();
        gsap.to(video, {
            opacity: 0,
            scale: 0.95,
            duration: 0.8
        });
    }
});
onEnter: () => {
    const video = document.querySelector('.scroll-video');
    video.currentTime = 0; // Reset to start
    // ... rest of existing code
}
const fadePairs = document.querySelectorAll('#fade-sequence .fade-pair');

fadePairs.forEach(pair => {
    gsap.set(pair.querySelector('img'), { opacity: 0, x: '100%' });
    gsap.set(pair.querySelector('.fade-text'), { opacity: 0 });
});

gsap.set(fadePairs[0].querySelector('img'), { opacity: 1, x: '0%' });
gsap.set(fadePairs[0].querySelector('.fade-text'), { opacity: 1 });

ScrollTrigger.create({
    trigger: "#fade-sequence",
    start: "top top",
    end: "+=300%",
    scrub: true,
    pin: true,
    pinSpacing: true,
    onUpdate: self => {
        const progress = self.progress;
        const total = fadePairs.length;
        const index = Math.min(Math.floor(progress * total), total - 1);

        fadePairs.forEach((pair, i) => {
            const img = pair.querySelector('img');
            const text = pair.querySelector('.fade-text');
            if (i === index) {
                gsap.to(img, { opacity: 1, x: '0%', duration: 0.5 });
                gsap.to(text, { opacity: 1, duration: 0.5 });
            } else {
                gsap.to(img, { opacity: 0, x: '100%', duration: 0.5 });
                gsap.to(text, { opacity: 0, duration: 0.5 });
            }
        });
    }
});