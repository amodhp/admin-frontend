import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

function createUserCategory(asset_list, user_role) {
    return { asset_list, user_role };
  }
  
  function createUser(user_name, user_id) {
    return { user_name, user_id };
  }
const rows = [
    createUserCategory([createUser("Shubham", "sj2181")], "Admin"),
    createUserCategory([createUser("Shubh", "dsh932")], "Internal"),
  ];
function Home(props) {
  return (
    <TableContainer
      style={{ maxWidth: 2500, minWidth: 600 }}
      component={Paper}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">userId</TableCell>
            <TableCell align="right">Role</TableCell>
            <TableCell align="right">Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right">
                {row.asset_list.map((item) => (
                  <TableCell align="right">{item.user_id}</TableCell>
                ))}
              </TableCell>

              <TableCell align="right">{row.user_role}</TableCell>
              
              <TableCell align="right">
                {row.asset_list.map((item) => (
                  <TableCell align="right">{item.user_name}</TableCell>
                ))}
              </TableCell>

              <TableCell align="right">
                <Button size="small" variant="outlined" color="info">
                  Edit
                </Button>
                <Button size="small" variant="outlined" color="error">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Home;