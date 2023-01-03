import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button } from "@mui/material";
import { removeUserData } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [todo, setTodo] = useState([]);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.fullName) navigate("/");
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => setTodo(json));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const removeData = () => {
    console.log("data gone");
    dispatch(removeUserData());
    navigate("/");
  };

  return (
    <>
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 1,
            m: 1,
            bgcolor: "background.paper",
            borderRadius: 1,
          }}
        >
          <div>
            <h1>hello {user?.fullName}</h1>
          </div>
          <Button variant="contained" onClick={removeData}>
            removeData
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Completed</TableCell>
                <TableCell>UserId</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todo.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.completed && <div>done</div>}</TableCell>
                  <TableCell>{row.userId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
