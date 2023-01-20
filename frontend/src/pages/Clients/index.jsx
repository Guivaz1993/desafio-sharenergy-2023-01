import Header from "../../components/header";
import "./styles.css";

function Clients() {
  return (
    <div>
      <Header />
      <section className="baseContainer clientsContainer">
        <h2>Clientes</h2>
        <span>
          Nós desejamos uma boa utilização da plataforma, nesa página é possivel
          ver nossos usuários e buscar algum específico.
        </span>
        {/* <UserTable /> */}
      </section>
    </div>
  );
}

export default Clients;
