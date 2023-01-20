import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import DogImage from "../../assets/dogMeme.jpeg";
import Header from "../../components/header";
import "./styles.css";

const codes = [
  100, 101, 102, 103, 200, 201, 202, 203, 204, 206, 207, 301, 302, 300, 303,
  304, 305, 307, 308, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410,
  411, 412, 413, 414, 415, 416, 417, 418, 420, 421, 422, 423, 424, 425, 426,
  429, 431, 444, 450, 451, 497, 498, 499, 500, 501, 502, 503, 504, 505, 506,
  507, 508, 509, 510, 511, 522, 521, 523, 525, 599,
];

const CustomizedInput = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    fontSize: "1.4rem",
  },
  "& label": {
    fontSize: "1.4rem",
    backgroundColor: "#fff",
    padding: "0 0.5rem",
  },
}));

function Cats() {
  const [code, setCode] = useState(false);
  const [form, setForm] = useState("");
  const [text, setText] = useState("");

  function handleFormValue(e) {
    if (e.target.value.length > 3) {
      return;
    }
    setForm(e.target.value);
  }

  function onClick() {
    if (form === "") {
      return setCode("");
    }
    if (!codes.includes(Number(form))) {
      setCode(DogImage);
      setText("Ops! Não temos um meme de gatinho para esse código");
    } else {
      setText("");
      setCode(`https://http.cat/${form}`);
    }
    setForm("");
  }

  useEffect(() => {}, [code]);

  return (
    <div>
      <Header />
      <section className="catContainer baseContainer">
        <h2>Cats</h2>
        <span>
          Procure um código Http e veja um Meme de gato exemplificando ele.
        </span>
        <article>
          <CustomizedInput
            value={form}
            onChange={handleFormValue}
            type="number"
          />
          <button onClick={onClick}>Buscar</button>
        </article>
        {text && <h2>{text}</h2>}
        {code && <img src={code} alt={`Meme`} className="memeImg" />}
      </section>
    </div>
  );
}

export default Cats;
