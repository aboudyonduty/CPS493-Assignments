const API_ROOT = import.meta.env.VITE_API_ROOT as string;

export function rest(url: string, data?: any, method?: string, headers?: any) {
    return fetch(url, {
      method: method ?? (data ? "POST" : "GET"),
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    }).then((res) =>
      res.ok
        ? res.json()
        : res.json().then((x) => {
            throw { ...x, message: x.error };
          })
    );
  }
  
  
  export function api(url: string, data?: any, method?: string, headers?: any) {
    return rest(   API_ROOT + url, data, method, headers);
  }

export function loadScript(url: string, id: string){
    return new Promise((resolve, reject) => {
        if(document.getElementById(id)) return resolve(true);
        const script = document.createElement("script");
        script.src = url;
        script.id = id;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    })
}


/*  Asynchronous patterns in JavaScript
    1. Callbacks
    2. Pipelining
    3. Promises
    4. Async/Await
*/