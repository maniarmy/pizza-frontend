//const API_URL = "https://react-fast-pizza-api.onrender.com/api/menu";
const API_URL = "http://localhost:8080" 

export async function getMenu() {
  const res = await fetch(`${API_URL}/menu/get`);

  // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually. This will then go into the catch block, where the message is set
  if (!res.ok) throw Error("Failed getting menu");

  const data = await res.json();
  return data;
}

export async function getAllOrders() {
  const res = await fetch(`${API_URL}/orders/getAll`);

  // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually. This will then go into the catch block, where the message is set
  if (!res.ok) throw Error("Failed getting orders");

  const data = await res.json();
  return data;
}

export async function getOrder(id) {
  const res = await fetch(`${API_URL}/orders/getAll/${id}`);
  if (!res.ok) throw Error(`Couldn't find order #${id}`);

  const data = await res.json();
  return data;
}

export async function createOrder(newOrder) {
  try {
    const res = await fetch(`${API_URL}/orders/add`, {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    const data = await res.json();
    return data;
  } catch {
    throw Error("your order is creted successfully then you my wait for delivery only half hour");
  }
}

export async function updateOrder(id, updateObj) {
  try {
    const res = await fetch(`${API_URL}/orders/update/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateObj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    // We don't need the data, so we don't return anything
  } catch (err) {
    throw Error("Failed updating your order");
  }
}
