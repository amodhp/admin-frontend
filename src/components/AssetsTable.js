import React from "react";

function AssetsTable(props) {
  const { products, stockEvents } = props;
  return (
    <div className="AssetsTable">
      {products.map((product) => {
        const { id } = product;
        const relevantStockEvents = stockEvents.filter(
          (se) => se.product.id === id
        );
        const stockTotal = relevantStockEvents.reduce(
          (accumulator, currentElement) => {
            return accumulator + currentElement.qty;
          },
          0
        );
        return (
          <div className="StockEventTable_ProductsContainer">
            <h2>Product :{product.name} | Total:{stockTotal}</h2>
            {relevantStockEvents.map((event) => (
              <div className="AssetEventTable__Card">
                <p>Id:{event.id}</p>
                <p>Type:{event.type}</p>
                <p>Quantity:{event.qty}</p>
                <p>Product name:{event.product.name}</p>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default AssetsTable;
