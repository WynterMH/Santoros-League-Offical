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
                const images = document.querySelectorAll('#second-sequence .image-sequence img');
                const totalImages = images.length;
                const imageIndex = Math.min(Math.floor(progress * totalImages), totalImages - 1);
                
                images.forEach((img, i) => {
                    img.classList.remove('active');
                    if (i === imageIndex) {
                        img.classList.add('active');
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
                const images = document.querySelectorAll('#third-sequence .image-sequence img');
                const totalImages = images.length;
                const imageIndex = Math.min(Math.floor(progress * totalImages), totalImages - 1);
                
                images.forEach((img, i) => {
                    img.classList.remove('active');
                    if (i === imageIndex) {
                        img.classList.add('active');
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

        // Second Horizontal Scroll Animation (Right to Left)
        gsap.from(".right-scroll-container", {
            x: () => `-${document.querySelector(".right-scroll-container").scrollWidth - window.innerWidth}px`,
            ease: "none",
            scrollTrigger: {
                trigger: ".right-scroll-container",
                start: "top top",
                end: () => `+=${document.querySelector(".right-scroll-container").scrollWidth - window.innerWidth}`,
                scrub: true,
                pin: true,
                pinSpacing: true,
                anticipatePin: 1
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
        document.getElementById('imageContainer')?.addEventListener('click', function() {
            const secondaryImage = document.getElementById('secondaryImage');
            secondaryImage?.classList.toggle('show');
            
            const indicator = this.querySelector('.click-indicator');
            if (indicator) {
                indicator.textContent = secondaryImage?.classList.contains('show') 
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