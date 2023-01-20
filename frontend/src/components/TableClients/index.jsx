/* eslint-disable react-hooks/exhaustive-deps */
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { getRoute } from "../../service/myApi";
import { getItem } from "../../utils/Storage";
import "./styles.css";

const columns = [
  { id: "name", label: "Nome", minWidth: 170, disablePadding: true },
  { id: "email", label: "E-mail", minWidth: 100, disablePadding: false },
  {
    id: "phone",
    label: "Telefone",
    minWidth: 170,
    align: "right",
    disablePadding: false,
  },
  {
    id: "cpf",
    label: "CPF",
    minWidth: 170,
    align: "right",
    disablePadding: false,
  },
];

function createData(id, name, email, phone, cpf) {
  return { id, name, email, phone, cpf };
}

export default function ClientsTable({
  open,
  openDelete,
  handleModalOpenDelete,
  handleModalOpen,
}) {
  const token = getItem("token");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  async function loadClients() {
    try {
      const { data, ok } = await getRoute("/client/list", token);
      if (!ok) {
        return toast.error(data.message);
      }
      const list = [];
      data.forEach((iten) => {
        list.push(
          createData(
            iten._id,
            iten.props.name,
            iten.props.email,
            iten.props.phone,
            iten.props.cpf
          )
        );
      });
      setRows(list);
    } catch (error) {
      console.log(error.message);
      return toast.error(error.message);
    }
  }

  useEffect(() => {
    loadClients();
  }, [open, openDelete]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{ fontSize: "1.6rem" }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell
                align="center"
                style={{ width: "10rem" }}
                sx={{ fontSize: "1.6rem" }}
              >
                Ações
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={{ fontSize: "1.4rem", cursor: "pointer" }}
                          onClick={() => handleModalOpen(row, false)}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <TableCell
                      align="center"
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                      sx={{ fontSize: "1.4rem" }}
                    >
                      <button
                        type="button"
                        onClick={() => handleModalOpen(row, true)}
                      >
                        <EditIcon />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleModalOpenDelete(row)}
                      >
                        <DeleteIcon />
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
