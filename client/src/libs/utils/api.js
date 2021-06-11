export const fetchGetJson = async (url) => {
  try {
    const data = await fetch(url, {
      method: "GET",
    }).then((res) => res.json);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchPostJson = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};
