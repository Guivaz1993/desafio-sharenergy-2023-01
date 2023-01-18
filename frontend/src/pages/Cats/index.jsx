import { useEffect,useState } from "react";

import DogImage from "../../assets/dogMeme.jpeg";

function Cats() {
  const [code, setCode] = useState(false);
  const [form, setForm] = useState("");
  const [text, setText] = useState("");

  function handleFormValue(e) {
    setForm(e.target.value);
  }
  function onClick() {
    if (form === "") {
      return setCode("");
    }
    if (form.length > 3) {
      setCode(DogImage);
      setText("Ops! Não temos um meme de gatinho para esse código");
    } else {
      setText("");
      setCode(`https://http.cat/${form}`);
    }
    setForm("");
  }

  useEffect(() => {
  }, [code]);

  return (
    <div>
      <h1>Cats</h1>
      <input value={form} onChange={handleFormValue}></input>
      <button onClick={onClick}>Buscar</button>
      {text && <h2>{text}</h2>}
      {code && <img src={code} alt={`Meme`} className="memeImg"/>}
    </div>
  );
}

export default Cats;
