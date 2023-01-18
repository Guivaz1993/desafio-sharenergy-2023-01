async function getDog( ) {
  const response = await fetch(  "https://random.dog/woof.json?filter=svg" , {
      method: "GET",
  });
  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
};

export{
  getDog
}
