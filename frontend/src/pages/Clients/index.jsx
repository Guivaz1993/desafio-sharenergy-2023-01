import Header from "../../components/header";
import ClientsModal from "../../components/modalClients";
import ClientsTable from "../../components/TableClients";
import "./styles.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { getRoute } from "../../service/myApi";
import { getItem } from "../../utils/Storage";
import DeleteModal from "../../components/modalDelete";

function Clients() {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const token = getItem("token");
  const [isEditModal, setIsEditModal] = useState(false);
  const [currentClient, setCurrentClient] = useState({
    name: "",
    email: "",
    cpf: "",
    phone: "",
    zip: "",
    state: "",
    city: "",
    street: "",
    number: "",
    complement: "",
  });

  async function loadClient(id) {
    try {
      const { data, ok } = await getRoute(`/client/list/${id}`, token);
      if (!ok) {
        return toast.error(data);
      }
      return setCurrentClient({
        id: data._id,
        name: data.props.name,
        email: data.props.email,
        cpf: data.props.cpf,
        phone: data.props.phone,
        zip: data.props.address.props.zip,
        state: data.props.address.props.state,
        city: data.props.address.props.city,
        street: data.props.address.props.street,
        number: data.props.address.props.number||"",
        complement: data.props.address.props.complement||"",
      });
    } catch (error) {
      console.log(error.message);
      return toast.error(error.message);
    }
  }

  const handleModalOpen = async (row = "", isEdit = false) => {
    setIsEditModal(isEdit);
    if (open) {
      setCurrentClient({
        name: "",
        email: "",
        cpf: "",
        phone: "",
        zip: "",
        state: "",
        city: "",
        street: "",
        number: "",
        complement: "",
      });
    }
    if (row) {
      await loadClient(row.id);
    }
    return setOpen(!open);
  };
  const handleModalDelete = async (row = "") => {
    if (row) {
      await loadClient(row.id);
    }
    return setOpenDelete(!openDelete);
  };

  return (
    <div>
      <Header />
      <section className="baseContainer clientsContainer">
        <h2>Clientes</h2>
        <span>
          Nós desejamos uma boa utilização da plataforma, nesa página é possivel
          ver nossos usuários e buscar algum específico.
        </span>
        <button
          onClick={() => handleModalOpen("", true)}
          className="BtnNewClient"
        >
          Adicionar cliente
        </button>
        <ClientsTable
          open={open}
          openDelete={openDelete}
          handleModalOpenDelete={handleModalDelete}
          handleModalOpen={handleModalOpen}
        />
        <ClientsModal
          open={open}
          handleModalOpen={handleModalOpen}
          isEditModal={isEditModal}
          currentClient={currentClient}
        />
        <DeleteModal open={openDelete} setOpen={handleModalDelete}           currentClient={currentClient}
 />
        {/* <UserTable /> */}
      </section>
    </div>
  );
}

export default Clients;
