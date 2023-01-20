import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { getItem } from "../utils/Storage";
import { deleteRoute } from "../service/myApi";
import { toast } from "react-toastify";

export default function DeleteModal({ open, handleModalDelete, currentClient }) {
  const token = getItem("token")

 async function handleDelete(){
  try {
    const {data,ok}=await deleteRoute( `/client/delete/${currentClient.id}`,token)
  if(!ok){
    return toast.error(data.message)
  }
  toast.success("Cliente excluído com sucesso.")
  return handleModalDelete("")
  } catch (error) {
    console.log(error.message)
    return toast.error("Não foi possível excluir esse cliente")
  }
 } 

  return (
    <div>
      <Dialog
        open={open}
        onClose={()=>handleModalDelete("")}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Você deseja deletar o cliente {currentClient.name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Essa ação não pode ser retornada, após deletar esse cliente não
            poderá ser recuperado
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleModalDelete("")}>Voltar</Button>
          <Button onClick={handleDelete} autoFocus color="error">
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
