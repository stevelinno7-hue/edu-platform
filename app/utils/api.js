const BASE = process.env.REACT_APP_API_URL;

export async function api(path, options = {}) {
  const token = localStorage.getItem("token");

  return fetch(BASE + path, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : ""
    },
    ...options
  }).then(res => res.json());
}
