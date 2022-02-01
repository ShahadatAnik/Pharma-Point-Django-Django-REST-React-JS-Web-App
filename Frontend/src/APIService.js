export default class APIService {
  // get user data
  static GetUser(userId, token) {
    fetch(`http://127.0.0.1:8000/pp/users/${userId}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.parse(),
    });
  }

  static GetUserS(token) {
    fetch("http://127.0.0.1:8000/pp/users/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    }).then((resp) => resp.json());
  }

  static UpdateUser(user_id, body, token) {
    return fetch(`http://127.0.0.1:8000/pp/users/${user_id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  //Drugs

  static InsertDrugs(body, token) {
    return fetch(`http://127.0.0.1:8000/pp/drugs/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static UpdateDrugs(drugs_name, body, token) {
    return fetch(`http://127.0.0.1:8000/pp/drugs/${drugs_name}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static DeleteDrugs(drugs_name, token) {
    return fetch(`http://127.0.0.1:8000/pp/drugs/${drugs_name}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
  }

  // Drug Review
  static InsertDrugComment(body, token) {
    return fetch(`http://127.0.0.1:8000/pp/dr/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static UpdateDrugComment(comment_id, body, token) {
    return fetch(`http://127.0.0.1:8000/pp/dr/${comment_id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static DeleteDrugComment(comment_id, token) {
    return fetch(`http://127.0.0.1:8000/pp/dr/${comment_id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
  }

  //shop
  static GetShops(token) {
    fetch("http://127.0.0.1:8000/pp/shops/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
  }

  static InsertShops(body, token) {
    return fetch(`http://127.0.0.1:8000/pp/shops/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static UpdateShops(shop_name, body, token) {
    return fetch(`http://127.0.0.1:8000/pp/shops/${shop_name}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static DeleteShops(shop_name, token) {
    return fetch(`http://127.0.0.1:8000/pp/shops/${shop_name}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
  }

  // shop offer

  static InsertShopOffer(body, token) {
    return fetch(`http://127.0.0.1:8000/pp/so/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static UpdateShopOffer(shop_id, body, token) {
    return fetch(`http://127.0.0.1:8000/pp/so/${shop_id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static DeleteShopOffer(shop_id, token) {
    return fetch(`http://127.0.0.1:8000/pp/so/${shop_id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
  }

  //shop review
  static InsertComment(body, token) {
    return fetch(`http://127.0.0.1:8000/pp/sr/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static UpdateComment(comment_id, body, token) {
    return fetch(`http://127.0.0.1:8000/pp/sr/${comment_id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static DeleteComment(comment_id, token) {
    return fetch(`http://127.0.0.1:8000/pp/sr/${comment_id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
  }

  // cart

  static InsertCart(body, token) {
    return fetch(`http://127.0.0.1:8000/pp/cart/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static DeleteCart(id, token) {
    return fetch(`http://127.0.0.1:8000/pp/cart/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
  }

  // contuct us

  static InsertContuctUs(body, token) {
    return fetch(`http://127.0.0.1:8000/pp/cu/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  //login and signup
  static LoginUser(body) {
    return fetch("http://127.0.0.1:8000/api/token/auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static RegisterUser(body) {
    return fetch("http://127.0.0.1:8000/pp/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }
}
