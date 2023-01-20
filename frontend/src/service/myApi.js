const BASE_URL = "http://localhost:8000";

async function getRoute(resource, token) {
  const response = await fetch(BASE_URL + resource, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + token,
    },
  });

  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
}

async function postRoute(resource, data, token) {
  const response = await fetch(BASE_URL + resource, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + token,
    },
  });
  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
}

async function patchRoute(resource, data, token) {
  const response = await fetch(BASE_URL + resource, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + token,
    },
  });
  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
}

async function deleteRoute(resource, token) {
  const response = await fetch(BASE_URL + resource, {
    method: "DELETE",
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  });

  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
}

export { getRoute, postRoute, patchRoute, deleteRoute };
