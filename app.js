const searchProducts = () => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => showDetails(data));
};
const showDetails = (products) => {
  const details = document.getElementById("display-card");
  products.forEach((element) => {
    const ratingStar = ratings(element.rating.rate);
    const div = document.createElement("div");
    //  div.classList.add("col");
    div.innerHTML = `
          <div class="card ms-4 border-0 shadow  h-100 product">
            <div class="p-3">
            <img src="${element.image}" class="card-img-top" alt="Loading"  height=170>
            </div>
            <div class="card-body">
              <h6 class="card-title text-center">${element.title}</h6>
              <p class="card-text">
              </p>
              <h6 class="card-text text-center fw-bold">$<span class="sp fw-bold">${element.price}</span></h6>
              <h6 class="card-text text-center"><span class="rating-Bar fw-bold">${ratingStar}</span></h6>
            </div>
            <div class="footer mx-auto">
            <button class="btn btn-secondary button-1" onclick="addToCard(${element.id},${element.price})" >Add to Cart</button>
            </div>
          </div>
        `;
    details.appendChild(div);
  });
  console.log(products);
};
let count = 0;
const addToCard = (id, price, newPrice) => {
  count = count + 1;
  document.getElementById("total-products").innerHTML = count;
  updatePrice(price);
  ShippingCost(count);
  total();
  GrandTotal();
  Discount();
};
const updatePrice = (price) => {
  const oldPrice = document.getElementById("price").innerText;
  const oldPriceFloat = parseFloat(oldPrice);
  const newPrice = price + oldPriceFloat;
  document.getElementById("price").innerText = newPrice.toFixed(2);
  DeliveryCharge(newPrice);
};
const total = () => {
  const price = parseFloat(document.getElementById("price").innerText);
  const deliver = parseFloat(
    document.getElementById("delivery-charge").innerText
  );
  const shipping = parseFloat(
    document.getElementById("Shipping-Cost").innerText
  );
  const total = price + deliver + shipping;
  document.getElementById("total").innerText = total;
  Tax(total);
};
const DeliveryCharge = (newPrice) => {
  if (newPrice <= 500) {
    return (document.getElementById("delivery-charge").innerText = 0);
  }
  if (newPrice >= 500 && newPrice <= 800) {
    document.getElementById("delivery-charge").innerText = 50;
  } else if (newPrice >= 800 && newPrice <= 1000) {
    document.getElementById("delivery-charge").innerText = 100;
  } else if (newPrice >= 1000 && newPrice <= 1500) {
    document.getElementById("delivery-charge").innerText = 200;
  } else if (newPrice >= 1500) {
    document.getElementById("delivery-charge").innerText = 250;
  }
};
const ShippingCost = (count) => {
  if (count >= 5 && count < 10) {
    return (document.getElementById("Shipping-Cost").innerText = 100);
  }
  if (count >= 10 && count < 15) {
    document.getElementById("Shipping-Cost").innerText = 200;
  } else if (count >= 15) {
    document.getElementById("Shipping-Cost").innerText = 500;
  }
};
const Tax = (Price) => {
  const val = (Price / 100) * 15;
  const tax = val.toFixed(2);
  document.getElementById("Tax").innerText = tax;
};
const GrandTotal = () => {
  const total = Number(document.getElementById("total").innerText);
  const tax = Number(document.getElementById("Tax").innerText);
  const val = total + tax;
  document.getElementById("Grand-Total").innerText = val.toFixed(2);
};
const Discount = () => {
  const val = Number(document.getElementById("Grand-Total").innerText);
  const discount = (val / 100) * 5;
  document.getElementById("Discount").innerText = discount.toFixed(2);
};
const FinalTotal = () => {
  const total = Number(document.getElementById("total").innerText);
  const tax = Number(document.getElementById("Tax").innerText);
  const val = total + tax;
  document.getElementById("Grand-Total").innerText = val.toFixed(2);
};
const ratings = (rate) => {
  if (rate >= 4) {
    return (star = ` <h5><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i> ${rate}</h5>`);
  } else if (rate >= 3 && rate < 4) {
    return (star = ` <h5><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i> ${rate}</h5>`);
  } else if (rate >= 2 && rate < 3) {
    return (star = ` <h5><i class="fas fa-star"></i><i class="fas fa-star"></i> ${rate}</h5>`);
  } else {
    return (star = ` <h5><i class="fas fa-star"></i> ${rate}</h5>`);
  }
};

const orderProducts = () => {
  const details = document.getElementById("details");
  details.textContent = "";
  const totalPrice = document.getElementById("total").innerText;
};

searchProducts();
