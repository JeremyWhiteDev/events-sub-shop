// main.js
import { getOrders, addNewOrder } from "./orders.js";

document.getElementById("app").innerHTML = `
  <h1>Jeremy's Sub Shop</h1>
  <div>
    <h3>Please make your sub</h3>
    <div class="subForm">
      <div class="bread">
        <p>Pick your bread</p>
        <label for="wheatBread">Wheat</label>
        <input id="wheatBread" name="bread" type="radio" value="wheatBread" />
        <label for="whiteBread">White Bread</label>
        <input id="whiteBread" name="bread" type="radio" value="whiteBread" />
        <label for="italianHerb">Italian Herb & Cheese</label>
        <input id="italianHerb" name="bread" type="radio" value="italianHerb" />
        </div>
        <div class="toasted">
          <p>Select Whether the bread should be toasted</p>
          <ul>
            <li>
              <input id="Toasted" name="toasted" type="checkbox" value="true" />
              <label for="Toasted">Toasted</label>
            </li>
            
          </ul>
      </div>
      <div class="protein">
        <p>Pick your protein</p>
        <label for="turkey">Turkey</label>
        <input id="turkey" name="protein" type="radio" value="turkey" />
        <label for="Ham">Ham</label>
        <input id="ham" name="protein" type="radio" value="ham" />
        <label for="chicken">Chicken</label>
        <input id="chicken" name="protein" type="radio" value="chicken" />
        </div>
      <div class="cheese">
        <p>Pick your Cheese</p>
        <label for="Cheddar">Cheddar</label>
        <input id="Cheddar" name="cheese" type="radio" value="Cheddar" />
        <label for="Swiss">Swiss</label>
        <input id="Swiss" name="cheese" type="radio" value="Swiss" />
        <label for="Provolone">Provolone</label>
        <input id="Provolone" name="cheese" type="radio" value="Provolone" />
        </div>
        <div class="toppings">
          <p>Pick your Toppings (Select all that apply), maximum 4 per sandwich</p>
          <ul>
            <li>
              <input id="Black Olives" name="toppings" type="checkbox" value="Black Olives" />
              <label for="Black Olives">Black Olives</label>
            </li>
            <li>
              <input id="Green Peppers" name="toppings" type="checkbox" value="Green Peppers" />
              <label for="Green Peppers">Green Peppers</label>
            </li>
            <li>
              <input id="Onions" name="toppings" type="checkbox" value="Onions" />
              <label for="Onions">Onions</label>
            </li>
            <li>
              <input id="Tomatoes" name="toppings" type="checkbox" value="Tomatoes" />
              <label for="Tomatoes">Tomatoes</label>
            </li>
            <li>
              <input id="Pickles" name="toppings" type="checkbox" value="Pickles" />
              <label for="Pickles">Pickles</label>
            </li>
            <li>
              <input id="Lettuce" name="toppings" type="checkbox" value="Lettuce" />
              <label for="Lettuce">Lettuce</label>
            </li>
          </ul>
      </div>
      <div class="extras">
        <label for="specialInstructions">Notes/Special Instructions</label>
        <div>
          <textarea id="specialInstructions"></textArea>
        </div>
      </div>
      <div>
        <button id="submitOrder">Order Pizza</button>
      </div>
    </div>
    <h3>Orders</h3>
    <div id="orders"></div>
  </div>
  `;
const displayOrders = () => {
  const orders = getOrders();
  let htmlSection = "";
  for (const order of orders) {
    htmlSection += `<p>Order: ${order.id} | Bread: ${order.bread} | Toasted: ${
      order.toasted
    } | Protein: ${order.protein} | Toppings: ${order.toppings.join(
      ", "
    )} | Special Instructions:${order.instructions}<p>`;
  }
  document.getElementById("orders").innerHTML = htmlSection;
};

document.addEventListener("click", (e) => {
  if (e.target.id === "submitOrder") {
    const bread = document.querySelector("input[name=bread]:checked")?.value;
    const protein = document.querySelector(
      "input[name=protein]:checked"
    )?.value;
    const checkToast = (element) => {
      if (element) {
        return true;
      } else {
        return false;
      }
    };

    const isToasted = checkToast(
      document.querySelector("input[name=toasted]:checked")?.value
    );
    const cheese = document.querySelector("input[name=cheese]:checked")?.value;
    const toppingsElements = document.querySelectorAll(
      "input[name=toppings]:checked"
    );
    const toppingsArray = [];
    const toppings = toppingsElements.forEach((toppingElement) => {
      toppingsArray.push(toppingElement.value);
    });

    if (bread && cheese && protein && toppingsArray.length < 5) {
      // format them into an object and add that object to the `orders` array in `orders.js`
      const specialInstructions = document.getElementById(
        "specialInstructions"
      )?.value;
      const newObj = {
        id: 0,
        bread: bread,
        toasted: isToasted,
        protein: protein,
        cheese: cheese,
        toppings: toppingsArray,
        instructions: specialInstructions,
      };
      addNewOrder(newObj);
    } else {
      let itemUndefined = [];
      if (!bread) [itemUndefined.push("No Bread Selected")];
      if (!protein) [itemUndefined.push("No Protein Selected")];
      if (!cheese) [itemUndefined.push("No Cheese Selected")];
      if (toppingsArray.length >= 5)
        [itemUndefined.push("No more than three toppings")];
      alert(
        `Oops!! Looks like you've got an issue with your order: ${itemUndefined.join(
          ", "
        )}`
      );
    }
  }
});

displayOrders();

document.addEventListener("stateChanged", (event) => {
  displayOrders();
});
