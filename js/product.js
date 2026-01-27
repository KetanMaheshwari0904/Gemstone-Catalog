const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1eNg36--ElOLLJAw3-3Kz3AsbJwupEIR_oaisQ_t3Khc/gviz/tq?tqx=out:json&gid=1331374379";

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

fetch(SHEET_URL)
  .then(res => res.text())
  .then(text => {
    const json = JSON.parse(text.substring(47).slice(0, -2));
    const rows = json.table.rows;

    const match = rows.find(row => row.c[0].v === productId);
    if (!match) return;

    const [
      id,
      name,
      shape,
      carat,
      color,
      image,
      astro_benefit
    ] = match.c.map(cell => cell ? cell.v : "");

    document.getElementById("product-image").src = image;
    document.getElementById("product-name").textContent = name;
    document.getElementById("product-shape").textContent = shape;
    document.getElementById("product-carat").textContent = carat;
    document.getElementById("product-color").textContent = color;
    document.getElementById("product-astro").textContent = astro_benefit;

    const message = `Hello, I’m interested in the following gemstone:%0A%0A` +
      `Stock ID: ${id}%0A` +
      `Type: ${name}%0A` +
      `Shape: ${shape}%0A` +
      `Carat: ${carat} ct%0A` +
      `Color: ${color}%0A%0A` +
      `Please let me know availability and details.`;

    document.getElementById("whatsapp-btn").href =
      `https://wa.me/917977196941?text=${message}`;
  });
