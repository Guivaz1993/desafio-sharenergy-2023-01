import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Header from "../../components/header";
import { getDog } from "../../service/dogApi";
import "./styles.css";

function Dogs() {
  const [dog, setDog] = useState("");

  function onClick() {
    loadDog()
  }

  async function loadDog() {
    try {
      const { data, ok } = await getDog();
      if(!ok){
        return toast.error(data.message);
      }
      setDog(data.url);
    } catch (error) {
      return toast.error(error.message);
    }
  }

  useEffect(() => {
  }, [dog]);

  return (
    <div>
    <Header/>
    <section className="baseContainer dogContainer">
      <h2>Clique no botão e veja uma imagem de doguinho para alegrar seu dia!</h2>
      <button onClick={onClick}>Buscar</button>
      {dog && <img src={dog} alt="Cachorro" className="memeImg"/>}
    </section>
    </div>
  );
}

export default Dogs;
