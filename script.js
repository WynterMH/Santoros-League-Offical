
        gsap.registerPlugin(ScrollTrigger);

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
        
        // First part: SANTOS title zoom and fade
        introSantosTimeline
            .to(".santos-title", {
                scale: 5,
                opacity: 0,
                duration: 1
            })
            // Reveal prison scene as SANTOS fades
            .to(".prison-scene", {
                opacity: 1,
                duration: 0.5
            }, 0.8) // Start slightly before SANTOS completely fades
            // Then zoom through the sky
            .to(".sky", {
                scale: 1.5,
                duration: 1
            }, 1.5);

        // First Image Sequence Animation
        // First Image Sequence Animation with Zoom
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
    end: "+=400%", // Increased from 300% for smoother transition
    pin: true,
    pinSpacing: true,
    onUpdate: self => {
        const progress = self.progress;
        const totalImages = firstSequenceImages.length;
        const imageIndex = Math.min(Math.floor(progress * totalImages), totalImages - 1);
        
        // Special zoom effect between image 1 and 2 (bars to window)
        if (imageIndex === 1 && progress * totalImages > 1.5) {
            const zoomProgress = (progress * totalImages - 1.5) * 2;
            const zoomScale = 1 + (zoomProgress * 4);
            const windowX = -0.25 * (zoomScale - 1); // Adjust these values based on your image
            const windowY = -0.3 * (zoomScale - 1);
            
            gsap.to(firstSequenceImages[1], {
                scale: zoomScale,
                x: windowX,
                y: windowY,
                duration: 0.5
            });

            // When zoom completes, transition to next image
            if (zoomProgress >= 1) {
                gsap.to(firstSequenceImages[1], { opacity: 0, duration: 0.5 });
                gsap.to(firstSequenceImages[2], { opacity: 1, duration: 0.5 });
            }
        } 
        // Standard image sequence progression
        else {
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
            x: () => `-${document.querySelector(".scroll-container").scrollWidth - window.innerWidth}px`,
            ease: "none",
            scrollTrigger: {
                trigger: ".scroll-container",
                start: "top top",
                end: () => `+=${document.querySelector(".scroll-container").scrollWidth - window.innerWidth}`,
                scrub: true,
                pin: true,
                pinSpacing: true,
                anticipatePin: 1 // Helps prevent jumps
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
                anticipatePin: 1 // Helps prevent jumps
            }
        });

        // Zoom in/out effect on first horizontal sections
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

        // Zoom in/out effect on second horizontal sections
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

        // Image upload functionality
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
        
        flashbackTrigger.addEventListener('click', () => {
            flashbackContent.style.display = 'block';
            playFlashbackSequence();
        });
        
        closeFlashback.addEventListener('click', () => {
            flashbackContent.style.display = 'none';
        });
        
        function playFlashbackSequence() {
            const flashbackImages = document.querySelectorAll('.flashback-sequence img');
            let currentIndex = 0;
            
            // Reset - show only first image
            flashbackImages.forEach((img, i) => {
                img.classList.remove('active');
                if (i === 0) img.classList.add('active');
            });
            
            // Auto-play through images
            const flashbackInterval = setInterval(() => {
                flashbackImages[currentIndex].classList.remove('active');
                currentIndex = (currentIndex + 1) % flashbackImages.length;
                flashbackImages[currentIndex].classList.add('active');
                
                // If we've gone through all images, stop the interval
                if (currentIndex === flashbackImages.length - 1) {
                    clearInterval(flashbackInterval);
                    
                    // Auto-close after last image (optional)
                    setTimeout(() => {
                        // flashbackContent.style.display = 'none';
                    }, 2000);
                }
            }, 2000); // Change image every 2 seconds
        }
        document.getElementById('imageContainer').addEventListener('click', function() {
            const secondaryImage = document.getElementById('secondaryImage');
            secondaryImage.classList.toggle('show');
            
            // Optional: Change the indicator text when clicked
            const indicator = this.querySelector('.click-indicator');
            if (secondaryImage.classList.contains('show')) {
                indicator.textContent = 'Click to return';
            } else {
                indicator.textContent = 'Click for flashback';
            }
        });
        