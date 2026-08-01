document.querySelectorAll(".slider-container").forEach((container) => {
  const slider = container.querySelector(".stat-slider");
  const value = container.querySelector(".slider-value");

  function updateValue() {
    const percentage =
      ((slider.value - slider.min) / (slider.max - slider.min)) * 100;

    value.textContent = slider.value;
    value.computedStyleMap.left = `${percentage}%`;
  }

  slider.addEventListener("input", updateValue);

  updateValue();
});
