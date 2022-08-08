// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';

// export default function Dashboard() {
//   return (
//     <Box sx={{ '& button': { m: 1 }, textAlign: "center", marginTop: "30px",alignItems:"center",}}>

//       <div>
//         <Button variant="contained" color="success" size="medium" style={{width:"110px"}} >
//           solved Request
//         </Button>

//         <Button variant="contained" color="secondary" size="medium">
//           Total Request
//         </Button>
//             <br/>
//         <Button variant="contained" color="success" size="medium" style={{marginLeft:"3%",width:"110px"}}>
//           In Progress
//         </Button>

//         <Button variant="contained" color="secondary" size="medium" >
//           Not Assigned Request
//         </Button>

//         </div>
     
//     </Box>

//     );
// }

import Button from 'react-bootstrap/Button';
import Box from '@mui/material/Box';
import Navbar from "./Navbar";

function Dashboard() {
  return (
    <>
    <Navbar />

    <Box sx={{ '& button': { m: 1 }, textAlign: "center", marginTop: "30px",alignItem:'center',alignContent:"center",}}>

    <div>
    
      <Button variant="primary" size="lg">Solved Request</Button>{' '}
    
      <Button variant="success"size="lg">  Total Request</Button>{' '}
   {/* <div style={{marginLeft:"2%",}}> */}
   <Button variant="warning" size="lg" style={{}}>  In Progress </Button>{' '}
      <Button variant="danger" size="lg" style={{}}>  Not Assigned Request</Button>{' '}

   {/* </div> */}
    
      

    </div>
    </Box>
    </>
  );
}

export default Dashboard;