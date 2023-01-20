import Header from "../../components/header";
import UserTable from "../../components/tableUser";
import "./styles.css";

function Home() {
  return (
    <div>
      <Header />
      <section className="baseContainer homeContainer">
        <h2>Tabela de Usuários</h2>
        <span>
          Nós desejamos uma boa utilização da plataforma, nesa página é possivel
          ver nossos usuários e buscar algum específico. Se tiver algum problema
          na utilização pode ser pela quantidade de usuários que buscou, espere
          alguns minutos e tente novamente.
        </span>
        <UserTable />
      </section>
    </div>
  );
}

export default Home;
