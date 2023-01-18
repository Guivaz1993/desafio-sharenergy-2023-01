import { useEffect ,useState} from "react";
import { toast } from "react-toastify";

import { getDog } from "../../service/dogApi";

function Dogs() {
  const [dog, setDog] = useState("");

  function onClick() {
    loadDog()
  }

  async function loadDog() {
    try {
      const { data, ok } = await getDog();
      setDog(data.url);
    } catch (error) {
      return toast.error(error.message);
    }
  }

  useEffect(() => {
  }, [dog]);

  return (
    <div>
      <h1>Clique no botão e veja uma imagem de doguinho para alegrar seu dia!</h1>
      <button onClick={onClick}>Buscar</button>
      {dog && <img src={dog} alt="Cachorro" className="memeImg"/>}
    </div>
  );
}

export default Dogs;
