// orders.js
const orders = [
  {
    id: 1,
    bread: "whiteBread",
    protein: "ham",
    cheese: "cheddar",
    toasted: false,
    toppings: ["lettuce", "green pepper"],
    instructions: "extra cheese",
  },
  {
    id: 2,
    bread: "wheatBread",
    toasted: true,
    protein: "turkey",
    cheese: "cheddar",
    toppings: ["lettuce", "green pepper"],
    instructions: "Yes!",
  },
];

export const getOrders = () => {
  const orderCopy = orders.map((x) => ({ ...x }));
  return orderCopy;
};
console.log();

const getNewOrderId = () => {
  let highestOrderId = orders.sort((a, b) => b.id - a.id)[0].id;
  return highestOrderId + 1;
};

export const addNewOrder = (order) => {
  const newId = getNewOrderId();
  // Add logic to give the order the property id, which is equal to newId
  order.id = newId;
  // Add logic to add the order object to the orders array
  orders.push(order);
  orders.sort((a, b) => a.id - b.id);
  // The below line creates and dispatches a new custom event titled "stateChanged".
  // We will still need to add a listener for this event.
  document.dispatchEvent(new CustomEvent("stateChanged"));
};
