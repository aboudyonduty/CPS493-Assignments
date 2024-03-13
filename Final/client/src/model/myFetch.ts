//بسم الله

const API_ROOT = import.meta.env.VITE_API_ROOT as string;
export function rest(url: string, data?: any, method?: string, headers?: any) {
  let fetchMethod = method;

  if (!fetchMethod) {
    if (data) {
      fetchMethod = "POST";
    } else {
      fetchMethod = "GET";
    }
  }

  if (fetchMethod === "DELETE") {
    return fetch(url, {
      method: fetchMethod,
      headers: {
        ...headers,
      },
    }).then((res) =>
      res.ok
        ? res.json()
        : res.json().then((x) => {
            throw { ...x, message: x.error };
          })
    );
  }

  let body;
  if (data) {
    if (fetchMethod === "PUT" || fetchMethod === "POST") {
      body = JSON.stringify(data);
    }
  }

  return fetch(url, {
    method: fetchMethod,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body,
  }).then((res) =>
    res.ok
      ? res.json()
      : res.json().then((x) => {
          throw { ...x, message: x.error };
        })
  );
}

export function api(url: string, data?: any, method?: string, headers?: any) {
  return rest(API_ROOT + url, data, method, headers);
}

export function loadScript(url: string, id: string) {
  return new Promise((resolve, reject) => {
    if (document.getElementById(id)) return resolve(true);
    const script = document.createElement("script");
    script.src = url;
    script.id = id;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
