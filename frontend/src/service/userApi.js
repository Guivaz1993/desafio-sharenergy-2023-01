async function getUsers( ) {
  const response = await fetch(  "https://randomuser.me/api/?results=100" , {
      method: "GET",
  });
  const responseData = await response.json();

  return { data: responseData, ok: response.ok };
};

export{
  getUsers
}
