const shop = document.getElementById("shop");
console.log(shop);
let shopItemData = [
  {
    id: "item1",
    name: "cotton shirt",
    price: "45",
    des: "Nice and fit",
    img: "images/f8.jpg",
  },
  {
    id: "item2",
    name: "denim jeans",
    price: "60",
    des: "Comfortable and stylish",
    img: "images/f6.jpg",
  },
  {
    id: "item3",
    name: "leather jacket",
    price: "120",
    des: "Warm and durable",
    img: "images/f7.jpg",
  },
  {
    id: "item4",
    name: "sneakers",
    price: "75",
    des: "Perfect for everyday wear",
    img: "images/f5.jpg",
  },
];
let basket = JSON.parse(localStorage.getItem("data")) || [];
let generateShopItem = () => {
  return (shop.innerHTML = shopItemData
    .map((x) => {
      let { id, name, price, des, img } = x;
      let search = basket.find((x) => x.id === id) || [];
      return `  <div id="product-item-${id}" class="item">
        <img width="200" src="${img}"/>
        <div class="details">
          <h3>${name}</h3>
          <p>${des}</p>
          <div class="price-quantity">
            <h2>£${price}</h2>
            <div class="price-buttons">
             <i class="fa fa-plus" onclick="increment(${id})" aria-hidden="true"></i>
             <div id="${id}" class="quantity">${
        search.item === undefined ? 0 : search.item
      }</div>
             <i class="fa fa-minus" onclick="decrement(${id})" aria-hidden="true"></i>

            </div>
          </div>
        </div>
      </div>`;
    })
    .join(""));
};
generateShopItem();
//1st make increment and decrement and give a argument with Xid
//than make veriable and then cnsol log (slect.id) make sure unique id getting
const increment = (xId) => {
  let selectItem = xId;
  console.log("unique id", selectItem.id);

  //3rd
  let search = basket.find((x) => x.id === selectItem.id);
  if (search === undefined) {
    basket.push({
      id: selectItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  localStorage.setItem("data", JSON.stringify(basket));
  //2ndly then make a empty basket arrray to store id and item
  ///then push it to basket
  // basket.push({
  //   id: selectItem.id,
  //   item: 1,
  // });
  //chek it r u getting full basket item and id
  console.log("basket test", basket);
  update(selectItem.id);
  cal();
};

const decrement = (xId) => {
  let selectItem = xId;
  console.log("unique id", selectItem.id);
  //3rd
  let search = basket.find((x) => x.id === selectItem.id);
  if (search === undefined || search.item === 0)
    return; ///search === undefined should be added extra
  else {
    search.item -= 1;
  }
  localStorage.setItem("data", JSON.stringify(basket));
  console.log("basket test", basket);
  update(selectItem.id);
  cal();
};
const update = (id) => {
  let search = basket.find((x) => x.id === id);
  console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
};

const cal = () => {
  let cartAmount = document.getElementById("cartAmount");
  console.log(cartAmount); // Log to check if cartAmount is selected
  cartAmount.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
cal();
