document.addEventListener("DOMContentLoaded", () => {
  const checkoutList = document.getElementById("checkout-list");
  const totalPriceEl = document.getElementById("total-price");
  const paymentSelect = document.getElementById("payment-method");
  const qrisContainer = document.getElementById("qris-container");
  const qrisImg = document.getElementById("qris-img");

  const cart = JSON.parse(localStorage.getItem("checkout")) || [];

  if (cart.length === 0) {
    checkoutList.innerHTML = `<p class="text-center text-muted">Keranjang kamu kosong.</p>`;
    return;
  }

  let total = 0;
  checkoutList.innerHTML = cart.map(item => {
    total += item.price * item.qty;
    return `
      <div class="d-flex align-items-center justify-content-between bg-white p-3 mb-2 rounded shadow-sm">
        <div class="d-flex align-items-center gap-3">
          <img src="${item.image}" alt="${item.name}" width="60" height="60" class="rounded">
          <div>
            <strong>${item.name}</strong><br>
            <small>Ukuran: ${item.size}</small><br>
            <span class="text-success">Rp${(item.price * item.qty).toLocaleString("id-ID")}</span>
          </div>
        </div>
        <span>x${item.qty}</span>
      </div>
    `;
  }).join("");

  totalPriceEl.textContent = "Rp" + total.toLocaleString("id-ID");

  // Ganti QRIS dinamis
  paymentSelect.addEventListener("change", () => {
    const method = paymentSelect.value;
    if (!method) {
      qrisContainer.style.display = "none";
      return;
    }

    const qrMap = {
      dana: "images/dana.jpeg",
      gopay: "images/gopay.jpeg",
      bri: "images/bri.jpeg",
      bni: "images/bni.jpeg"
    };

    qrisImg.src = qrMap[method];
    qrisContainer.style.display = "block";
  });
});
