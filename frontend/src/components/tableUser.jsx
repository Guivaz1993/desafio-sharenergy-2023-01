/* eslint-disable react-hooks/exhaustive-deps */
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import { visuallyHidden } from "@mui/utils";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getUsers } from "../service/userApi";

function createData(avatar, name, email, username, age) {
  return {
    avatar,
    name,
    email,
    username,
    age,
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Nome Completo",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "E-mail",
  },
  {
    id: "username",
    numeric: false,
    disablePadding: false,
    label: "Username",
  },
  {
    id: "age",
    numeric: true,
    disablePadding: false,
    label: "Idade",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <AccountCircleIcon fontSize="large" />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ fontSize: "1.6rem" }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

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

function EnhancedTableToolbar({ filter, handleFilter }) {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <CustomizedInput
        id="outlined-basic"
        label="Filtro"
        variant="outlined"
        value={filter}
        onChange={handleFilter}
        placeholder="Filtre digitando aqui..."
      />
    </Toolbar>
  );
}

export default function UserTable() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [filter, setFilter] = useState("");
  const [rows, setRows] = useState([]);
  const [rowsBase, setRowsBase] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  let list = [];

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function handleFilter(e) {
    const currentRows = [];
    rowsBase.forEach((iten) => {
      if (
        iten.name.toUpperCase().includes(e.target.value.toUpperCase()) ||
        iten.email.toUpperCase().includes(e.target.value.toUpperCase()) ||
        iten.username.toUpperCase().includes(e.target.value.toUpperCase())
      ) {
        currentRows.push(iten);
      }
    });
    setFilter(e.target.value);
    setRows(currentRows);
  }

  async function loadUser() {
    try {
      const { data, ok } = await getUsers();
      if (!ok) {
        return toast.error(data.message);
      }
      data.results.forEach((user) => {
        list.push(
          createData(
            user.picture.thumbnail,
            `${user.name.first} ${user.name.last}`,
            user.email,
            user.login.username,
            user.dob.age
          )
        );
      });
      setRows(list);
      setRowsBase(list);
    } catch (error) {}
  }

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {}, [filter]);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ border: "1px solid black", margin: "2rem 5rem 1rem" }}>
          <EnhancedTableToolbar filter={filter} handleFilter={handleFilter} />
          {rows.length !== 0 && (
            <TableContainer sx={{}}>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size="medium"
              >
                <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          tabIndex={-1}
                          key={`${row.name}+${row.username}`}
                        >
                          <TableCell padding="checkbox">
                            <Avatar alt={row.name} src={row.avatar} />
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                            sx={{ fontSize: "1.4rem" }}
                          >
                            {row.name}
                          </TableCell>
                          <TableCell align="left" sx={{ fontSize: "1.4rem" }}>
                            {row.email}
                          </TableCell>
                          <TableCell align="left" sx={{ fontSize: "1.4rem" }}>
                            {row.username}
                          </TableCell>
                          <TableCell align="right" sx={{ fontSize: "1.4rem" }}>
                            {row.age}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: 53 * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </>
  );
}
