import Button from 'react-bootstrap/Button';
import Box from '@mui/material/Box';
import Navbar from "./Navbar";
import React, { useState } from 'react'


function Dashboard() {

  const [notAssignedRequest,SetNotAssignedRequest]=useState(0)
  const [inProgress,SetInProgress]=useState(0)
  const [totalRequest,SetTotalRequest]=useState(0)
  const [solvedRequest,setSolvedRequest]=useState(0)

 
  return (
    <>
      <Navbar />

      <Box sx={{ '& button': { m: 1 }, textAlign: "center", marginTop: "30px", alignItem: 'center', alignContent: "center", }}>

        <div>
          <div style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
          <Button style={{ padding: 10, height: 120, width: '15%', borderRadius: 15 }} variant="success" size="lg">  Total Request : {totalRequest}</Button>{' '}
            <Button style={{ padding: 10, height: 120, width: '15%', borderRadius: 15 }} variant="primary" size="lg">Solved Request : {solvedRequest}</Button>{' '}

           
          </div>
          <div style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <Button style={{ padding: 10, height: 120, width: '15%', borderRadius: 15 }} variant="warning" size="lg">  In Progress : {inProgress} </Button>{' '}
            <Button style={{ padding: 10, height: 120, width: '15%', borderRadius: 15 }} variant="danger" size="lg" > Not Assigned Request : {notAssignedRequest}</Button>{' '}

            {/* <Button onClick={()=>SetNotAssignedRequest(notAssignedRequest+1)} style={{ padding: 10, height: 120, width: '15%', borderRadius: 15 }} variant="success" size="lg">  +</Button>{' '} */}

          </div>
        </div>




      </Box>
    </>
  );
}

export default Dashboard;