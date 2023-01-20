import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import { patchRoute, postRoute } from "../service/myApi";
import { getItem } from "../utils/Storage";

const CustomizedInput = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    fontSize: "1.6rem",
  },
  "& label": {
    fontSize: "1.4rem",
    backgroundColor: "#fff",
    padding: "0 0.5rem",
  },
}));

export default function ClientsModal({
  open,
  handleModalOpen,
  isEditModal,
  currentClient,
}) {
  const [form, setForm] = useState({
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
  const token = getItem("token");

  function handleFormValue(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    try {
      if(!form.name || !form.email || !form.phone|| !form.cpf|| !form.zip|| !form.city|| !form.state|| !form.street){
        console.log(form)
        return toast.error("Apenas número e complemento não são obrigatórios.")
      }
      if (currentClient.name) {
        const { data, ok } = await patchRoute(
          `/client/update/${currentClient.id}`,
          form,
          token
        );
        if (!ok) {
          console.log(data);
          return toast.error("Não foi possível atualizar esse cliente");
        }
        toast.success("Cliente atualizado com sucesso")
      } else {
        const { data, ok } = await postRoute(`/client/create`, form, token);
        if (!ok) {
          console.log(data);
          return toast.error(data);
        }
        toast.success("Cliente criado com sucesso")
      }
      return handleModalOpen("", false);
    } catch (error) {
      return toast.error(error.message);
    }
  }

  useEffect(() => {
    async function LoadClient() {
      setForm({
        name: currentClient.name,
        email: currentClient.email,
        cpf: currentClient.cpf,
        phone: currentClient.phone,
        zip: currentClient.zip,
        state: currentClient.state,
        city: currentClient.city,
        street: currentClient.street,
        number: currentClient.number,
        complement: currentClient.complement,
      });
    }
    LoadClient();
  }, [currentClient]);

  return (
    <div>
      <Dialog open={open} onClose={handleModalOpen}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <CustomizedInput
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Nome"
            type="text"
            fullWidth
            variant="standard"
            disabled={!isEditModal}
            onChange={handleFormValue}
            value={form.name}
          />
          <CustomizedInput
            autoFocus
            margin="dense"
            id="email"
            name="email"
            label="E-mail"
            type="email"
            fullWidth
            variant="standard"
            disabled={!isEditModal}
            onChange={handleFormValue}
            value={form.email}
          />
          <CustomizedInput
            autoFocus
            margin="dense"
            id="phone"
            name="phone"
            label="Telefone"
            type="text"
            fullWidth
            variant="standard"
            disabled={!isEditModal}
            onChange={handleFormValue}
            value={form.phone}
          />
          <CustomizedInput
            autoFocus
            margin="dense"
            id="cpf"
            name="cpf"
            label="CPF"
            type="text"
            fullWidth
            variant="standard"
            disabled={!isEditModal}
            onChange={handleFormValue}
            value={form.cpf}
          />
          <CustomizedInput
            autoFocus
            margin="dense"
            id="zip"
            name="zip"
            label="CEP"
            type="text"
            fullWidth
            variant="standard"
            disabled={!isEditModal}
            onChange={handleFormValue}
            value={form.zip}
          />
          <CustomizedInput
            autoFocus
            margin="dense"
            id="state"
            name="state"
            label="Estado"
            type="text"
            fullWidth
            variant="standard"
            disabled={!isEditModal}
            onChange={handleFormValue}
            value={form.state}
          />
          <CustomizedInput
            autoFocus
            margin="dense"
            id="city"
            name="city"
            label="Cidade"
            type="text"
            fullWidth
            variant="standard"
            disabled={!isEditModal}
            onChange={handleFormValue}
            value={form.city}
          />
          <CustomizedInput
            autoFocus
            margin="dense"
            id="street"
            name="street"
            label="Rua"
            type="text"
            fullWidth
            variant="standard"
            disabled={!isEditModal}
            onChange={handleFormValue}
            value={form.street}
          />
          <CustomizedInput
            autoFocus
            margin="dense"
            id="number"
            name="number"
            label="Numero"
            type="text"
            fullWidth
            variant="standard"
            disabled={!isEditModal}
            onChange={handleFormValue}
            value={form.number}
          />
          <CustomizedInput
            autoFocus
            margin="dense"
            id="complement"
            name="complement"
            label="Complemento"
            type="text"
            fullWidth
            variant="standard"
            disabled={!isEditModal}
            onChange={handleFormValue}
            value={form.complement}
          />
        </DialogContent>
        <DialogActions>
          {isEditModal && (
            <Button onClick={() => handleModalOpen("", false)} color="error">
              Cancelar
            </Button>
          )}
          {!isEditModal && (
            <Button onClick={() => handleModalOpen("", false)}>Voltar</Button>
          )}
          {isEditModal && <Button onClick={handleSubmit}>{currentClient.name?"Alterar":"Cadastrar"}</Button>}
        </DialogActions>
      </Dialog>
    </div>
  );
}
