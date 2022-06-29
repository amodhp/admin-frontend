import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

function createAssetCategory(asset_list, asset_category, asset_category_id) {
  return { asset_list, asset_category, asset_category_id };
}

function createAsset(asset_name, asset_id) {
  return { asset_name, asset_id };
}

const rows = [
  createAssetCategory([createAsset("Laptop", "01")], "IT", "001"),
  createAssetCategory(
    [createAsset("Air Conditioner", "02")],
    "Floor Infra",
    "002"
  ),
  createAssetCategory([createAsset("Machine Gun", "03")], "Weapons", "003"),
];
function AssetsTable(props) {
  const { products, stockEvents } = props;

  return (
    <TableContainer
      style={{ maxWidth: 2500, minWidth: 600 }}
      component={Paper}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Srno</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Asset</TableCell>
            <TableCell align="right">Asset Id</TableCell>
            <TableCell align="right">Category Id</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={row.asset_category_id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="right">{row.asset_category}</TableCell>
              <TableCell align="right">
                {row.asset_list.map((item) => (
                  <TableCell align="right">{item.asset_name}</TableCell>
                ))}
              </TableCell>
              <TableCell align="right">
                {row.asset_list.map((item) => (
                  <TableCell align="right">{item.asset_id}</TableCell>
                ))}
              </TableCell>
              <TableCell align="right">{row.asset_category_id}</TableCell>
              <TableCell align="right">
                <Button size="small" variant="outlined" color="error">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    // <div className="AssetsTable">
    //   {products.map((product) => {
    //     const { id } = product;
    //     const relevantStockEvents = stockEvents.filter(
    //       (se) => se.product.id === id
    //     );
    //     const stockTotal = relevantStockEvents.reduce(
    //       (accumulator, currentElement) => {
    //         return accumulator + currentElement.qty;
    //       },
    //       0
    //     );
    //     return {
    //       /* <div className="StockEventTable_ProductsContainer">
    //         <h2>Product :{product.name} | Total:{stockTotal}</h2>
    //         {relevantStockEvents.map((event) => (
    //           <div className="AssetEventTable__Card">
    //             <p>Id:{event.id}</p>
    //             <p>Type:{event.type}</p>
    //             <p>Quantity:{event.qty}</p>
    //             <p>Product name:{event.product.name}</p>
    //           </div>
    //         ))}
    //       </div> */
    //     }
    //   })}
    // </div>
  );
}

export default AssetsTable;
