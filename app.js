// this is our first function which is called after app starting
const GetProducts = () => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => showDetails(data));
};
GetProducts();
// this function defines the visual result of product card according to fetching data from api
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
            <button class="btn btn-secondary button-2" onclick="RemoveToCart(${element.price})" >Remove to Cart</button> 
            </div>
          </div>
        `;
    details.appendChild(div);
  });
};
let count = 0;
// this function is for add products to cart. this is linked to add to cart button which is in products card
const addToCard = (id, price, newPrice) => {
  count = count + 1;
  document.getElementById("total-products").innerHTML = count;
  updatePrice(price);
  ShippingCost(count);
  total();
  GrandTotal();
  Discount();
  FinalTotal();
};
// this is for updating price after clicking add to cart button
const updatePrice = (price) => {
  const oldPrice = document.getElementById("price").innerText;
  const oldPriceFloat = parseFloat(oldPrice);
  const newPrice = price + oldPriceFloat;
  document.getElementById("price").innerText = newPrice.toFixed(2);
  DeliveryCharge(newPrice);
};
// this function is for calculate total price
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
// this is for calculate delivery charge accoding to total price
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

// this is for calculate shipping cost according to products count
const ShippingCost = (count) => {
  if (count >= 5 && count < 10) {
    return (document.getElementById("Shipping-Cost").innerText = 100);
  }
  if (count >= 10 && count < 15) {
    document.getElementById("Shipping-Cost").innerText = 200;
  } else if (count >= 15) {
    document.getElementById("Shipping-Cost").innerText = 500;
  } else {
    document.getElementById("Shipping-Cost").innerText = 0;
  }
};
// this is for calculate the tax to 15%
const Tax = (Price) => {
  const val = (Price / 100) * 15;
  const tax = val.toFixed(2);
  document.getElementById("Tax").innerText = tax;
};
// this is for calculating grand total price with tax, shipping const, and delivary charge
const GrandTotal = () => {
  const total = Number(document.getElementById("total").innerText);
  const tax = Number(document.getElementById("Tax").innerText);
  const val = total + tax;
  document.getElementById("Grand-Total").innerText = val.toFixed(2);
};
// this is for calculating discount
const Discount = () => {
  const val = Number(document.getElementById("Grand-Total").innerText);
  const discount = (val / 100) * 5;
  document.getElementById("Discount").innerText = discount.toFixed(2);
};
// this is final total with GrandTotal - discount
const FinalTotal = () => {
  const total = Number(document.getElementById("Grand-Total").innerText);
  const discount = Number(document.getElementById("Discount").innerText);
  const val = total - discount;
  document.getElementById("Final-Total").innerText = val.toFixed(2);
};
// this is for show rating start according to ratings which is cames from api
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
// this is for remove specific item and its details from Product Cart
const RemoveToCart = (price) => {
  let total = Number(document.getElementById("total-products").innerText);
  if (total > 0) {
    total = total - 1;
    count = total;
    document.getElementById("total-products").innerText = total;
  }
  let oldPrice = Number(document.getElementById("price").innerText);
  if (oldPrice > 0) {
    oldPrice = oldPrice - price;
    document.getElementById("price").innerText = oldPrice.toFixed(2);
  }
  DeliveryCharge(oldPrice);
  ShippingCost(total);
  let val1 = Number(document.getElementById("price").innerText);
  let val2 = Number(document.getElementById("delivery-charge").innerText);
  let val3 = Number(document.getElementById("Shipping-Cost").innerText);
  let val4 = val1 + val2 + val3;
  document.getElementById("total").innerText = val4.toFixed(2);
  Tax(val4);
  let val5 = Number(document.getElementById("total").innerText);
  let val6 = Number(document.getElementById("Tax").innerText);
  let val7 = val5 + val6;
  document.getElementById("Grand-Total").innerText = val7.toFixed(2);
  let val8 = Number(document.getElementById("Grand-Total").innerText);
  let val9 = (val8 / 100) * 5;
  document.getElementById("Discount").innerText = val9.toFixed(2);
  let val10 = Number(document.getElementById("Grand-Total").innerText);
  let val11 = Number(document.getElementById("Discount").innerText);
  let val12 = val10 - val11;
  document.getElementById("Final-Total").innerText = val12.toFixed(2);
};
// this is for empty whole cart after clicking Empty Cart Button
const EmptyCart = () => {
  count = 0;
  document.getElementById("total-products").innerText = 0;
  document.getElementById("price").innerText = 0;
  document.getElementById("delivery-charge").innerText = 0;
  document.getElementById("Shipping-Cost").innerText = 0;
  document.getElementById("total").innerText = 0;
  document.getElementById("Tax").innerText = 0;
  document.getElementById("Grand-Total").innerText = 0;
  document.getElementById("Discount").innerText = 0;
  document.getElementById("Final-Total").innerText = 0;
};
