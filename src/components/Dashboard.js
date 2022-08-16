import Button from 'react-bootstrap/Button';
import Box from '@mui/material/Box';
import Navbar from "./Navbar";
import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { api } from '../extras/APIS';


function Dashboard() {

  const [notAssignedRequest,SetNotAssignedRequest]=useState(0)
  const [inProgress,SetInProgress]=useState(0)
  const [totalRequest,SetTotalRequest]=useState(0)
  const [solvedRequest,setSolvedRequest]=useState(0)

  const accessToken = sessionStorage.getItem("token");
  useEffect(() => {
    getDashboardData(accessToken, "admin");
  }, []);

  const getDashboardData=(accessToken,admin)=>{
    axios
    .get(`http://${api}/admin/ticket`, {

      headers: {
        "access-token": `${accessToken}`,
      },
    })
    .then(function (response) {
      // console.log(response.data);
      // const data = response.data.users;
      console.log(response.data.totalcount)
      SetTotalRequest(response.data.totalcount)
    
     
    })

    .catch(function (error) {
      console.log(accessToken);
      console.log(error, "Error Get Ticket");
      // alert("Oops! Wrong Password or Username!");
    });

  }

  

 
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