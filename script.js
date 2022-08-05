const container = document.querySelector(".drawing-area");
const colorInput = document.querySelector("#color");
const eraser = document.querySelector(".eraser");
const clear = document.querySelector(".clear");
const resolution = document.querySelector("#resolution");
const resText = document.querySelector(".res-text");
let currentResolution = 64;
let color = "#DC3D3D";
let mouseDown = false;

colorInput.addEventListener("input", () => {
  console.log(colorInput.value);
  color = colorInput.value;
});

container.addEventListener("mouseleave", () => {
  mouseDown = false;
});

eraser.addEventListener("click", () => {
  color = "#FFFFFF";
});

createGrid(currentResolution);

resolution.addEventListener("input", () => {
  currentResolution = resolution.value;
  resText.textContent = `${resolution.value}x${resolution.value}`;
  clearGrid();
  createGrid(currentResolution);
});

clear.addEventListener("click", () => {
  let pixels = document.querySelectorAll(".pixel");

  pixels.forEach((elem) => {
    if (elem.style.backgroundColor) {
      elem.removeAttribute("style");
    }
  });
});

function clearGrid() {
  container.innerHTML = "";
}

function createGrid(currentResolution) {
  for (let i = 0; i < currentResolution; i++) {
    const row = document.createElement("div");
    container.appendChild(row);
    row.classList.add("row");

    for (let i = 0; i < currentResolution; i++) {
      const pixel = document.createElement("div");
      pixel.classList.add("pixel");
      pixel.setAttribute("draggable", "false");
      row.appendChild(pixel);
      pixelEventListeners(pixel);
    }
  }
}

function pixelEventListeners(pixel) {
  pixel.addEventListener("mousedown", () => {
    mouseDown = true;
    console.log(mouseDown);
  });

  pixel.addEventListener("mouseup", () => {
    mouseDown = false;
    console.log(mouseDown);
  });

  pixel.addEventListener("mousemove", () => {
    if (mouseDown) {
      pixel.style.backgroundColor = color;
    }
  });

  pixel.addEventListener("click", () => {
    pixel.style.backgroundColor = color;
  });

  pixel.addEventListener("dragstart", (e) => {
    e.preventDefault();
  });

  pixel.addEventListener("drop", (e) => {
    e.preventDefault();
  });
}
