const fetchApi = (url, callback) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => callback(data.data))
  }
  