document.addEventListener('click', ({ pageX, pageY }) => {
  const circle = document.createElement('article');
  circle.classList.add('circle');
  circle.style.left = `${pageX}px`;
  circle.style.top = `${pageY}px`;
  document.body.appendChild(circle);

  setTimeout(() => {
    document.removeChild(circle);
  }, 1000);
});
