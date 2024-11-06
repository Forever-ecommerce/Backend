//Placing orders using cod method

const placeOrder = async (req, res) => {};

//Placing orders using stripe method

const placeOrderStripe = async (req, res) => {};
//Placing orders using razorpay method

const placeOrderRazorpay = async (req, res) => {};

//All Orders data for admin panel
const allOrders = async (req, res) => {};
//User Orders data for Frontend
const userOrders = async (req, res) => {};

//update order status from admin panel
const updateStatus = async (req, res) => {};

export {
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
};
