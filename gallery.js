document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("photoModal");
    const modalImg = document.getElementById("modalImage");
    const modalTitle = document.getElementById("modalTitle");
    const modalSubtitle = document.getElementById("modalSubtitle");
    const closeBtn = document.querySelector(".modal-close");
  
    const leftArrow = document.querySelector(".left-arrow");
    const rightArrow = document.querySelector(".right-arrow");
  
    // Collect all photos into an array
    const photos = [...document.querySelectorAll(".hero-photo")];
    let currentIndex = 0;
  
    function openModal(index) {
      currentIndex = index;
  
      const photo = photos[currentIndex];
      modalImg.src = photo.querySelector("img").src;
      modalTitle.textContent = photo.dataset.title || "Untitled";
      modalSubtitle.textContent = photo.dataset.subtitle || "";
  
      modalImg.classList.remove("modal-image-fade");
      void modalImg.offsetWidth; // trigger reflow
      modalImg.classList.add("modal-image-fade");
  
      modal.style.display = "flex";
    }
  
    function closeModal() {
      modal.style.display = "none";
    }
  
    function showNext() {
      currentIndex = (currentIndex + 1) % photos.length;
      openModal(currentIndex);
    }
  
    function showPrev() {
      currentIndex = (currentIndex - 1 + photos.length) % photos.length;
      openModal(currentIndex);
    }
  
    // Click listeners for each photo
    photos.forEach((photo, i) => {
      photo.addEventListener("click", () => openModal(i));
    });
  
    // Close modal
    closeBtn.addEventListener("click", closeModal);
  
    // Click outside closes modal
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  
    // Arrow buttons
    leftArrow.addEventListener("click", showPrev);
    rightArrow.addEventListener("click", showNext);
  
    // Keyboard arrow input
    document.addEventListener("keydown", (e) => {
      if (modal.style.display === "flex") {
        if (e.key === "ArrowRight") showNext();
        if (e.key === "ArrowLeft") showPrev();
        if (e.key === "Escape") closeModal();
      }
    });
  });
  