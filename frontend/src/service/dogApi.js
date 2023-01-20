async function getDog( ) {
  const response = await fetch(  "https://random.dog/woof.json?include=jpg,svg,png,gif" , {
      method: "GET",
  });
  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
};

export{
  getDog
}
