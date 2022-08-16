import { chainPropTypes } from "@mui/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import LogItem from "../components/common/LogItem";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { api } from "../extras/APIS";

const req = [
    {
        id: 1,
        subject: "Request 1",
        description: "Request 1 Description",
        status: "Open",
        escalated: "false",
        location: "Mumbai",
        createdAt: "2020-01-01"
    },
    {
        id: 2,
        subject: "Request 2",
        description: "Request 2 Description",
        status: "Cloased",
        escalated: "false",
        location: "Mumbai",
        createdAt: "2020-01-01"
    },
    {
        id: 3,
        subject: "Request 3",
        description: "Request 3 Description",
        status: "In Progress",
        escalated: "false",
        location: "Mumbai",
        createdAt: "2020-01-01"
    },
    {   id: 4,

        subject: "Request 4",
        description: "Request 4 Description",
        status: "Open",
        escalated: "false",
        location: "Mumbai",
        createdAt: "2020-01-01"
    },
    {
        id: 5,
        subject: "Request 5",
        description: "Request 5 Description",
        status: "Open",
        escalated: "false",
        location: "Mumbai",
        createdAt: "2020-01-01"
    }



]




const Requests = () => {
    const [color, setColor] = useState('')

    const statusColor = (status) => {

        if (status == 'open') {
            setColor('#ffc107')

        } else if (status == 'In Progress') {
            setColor('#28a745')
        } else if (status == 'Closed') {
            setColor('#dc3545')
        }
        return color
    }

    const [requests, setRequests] = React.useState([]);
    const accessToken = sessionStorage.getItem('token');
    const getReqData=(accessToken,admin)=>{
        axios
        .get(`http://${api}/admin/ticket`, {
    
          headers: {
            "access-token": `${accessToken}`,
          },
        })
        .then(function (response) {
          console.log(response.data.tickets);
          setRequests(response.data.tickets);
        
         
        })}
        useEffect(() => {
            getReqData(accessToken, "admin");
    
        }, []);
    
    
    return (
        <div>
            <Navbar />
            <div style={{ padding: "10px" }}>
                {/* {req.map(req =>

                    // <div className="card m-4" style={{ width: "40%" }}>
                    //     <div className="card-header">{req.subject}</div>
                    //     <div className="card-body" style={{  }}>
                    //         <blockquote className="blockquote mb-0">
                    //             <p>
                    //                 {req.description}
                    //             </p>
                    //             <footer className="blockquote-footer">
                    //                 {req.createdAt}
                    //             </footer>
                    //         </blockquote>
                    //     </div>
                    // </div>
                    //show card color according to status
                    {
                        if(req.status=='Open'){
                            return(
                                <div className="card m-4" style={{ width: "40%", }}>
                                    <div className="card-header">{req.subject}</div>
                                    <div className="card-body" style={{ backgroundColor: "#a8cafc" }}>
                                        <blockquote className="blockquote mb-0">
                                            <p>
                                                {req.description}
                                            </p>
                                            <footer className="blockquote-footer">
                                                {req.createdAt}
                                            </footer>
                                        </blockquote>
                                    </div>
                                </div>
                            )
                        }else if (req.status=='In Progress'){
                            return(    
                                <div className="card m-4" style={{ width: "40%",  }}>
                                <div className="card-header">{req.subject}</div>
                                <div className="card-body" style={{ backgroundColor: "orange", color:"#fff"}}>
                                    <blockquote className="blockquote mb-0">
                                        <p>
                                            {req.description}
                                        </p>
                                        <footer className="blockquote-footer">
                                            {req.createdAt}
                                        </footer>
                                    </blockquote>
                                </div>
                            </div> 

                            )}
                        else{
                            return(
                                <div className="card m-4" style={{ width: "40%",  }}>
                                    <div className="card-header">{req.subject}</div>
                                    <div className="card-body" style={{ backgroundColor: "#baedb3", }}>
                                        <blockquote className="blockquote mb-0">
                                            <p>
                                                {req.description}
                                            </p>
                                            <footer className="blockquote-footer">
                                                {req.createdAt}
                                            </footer>
                                        </blockquote>
                                    </div>
                                </div>
                            )
                        }
                    }





                )} */}
                {
                    requests.map(req =>
                        <div className="card m-4" style={{ width: "40%", borderRadius: "20px", border: "2px solid black"}} key={req._id} >
                            <div className="card-header" style={{borderRadius: "20px 20px 0 0", backgroundColor:req.status=="open"? "#64ff64":"red", color:"black", borderBottom: "black 2px solid"}}>{req.subject}</div>
                            
                            <div className="card-body" style={{ color: "black" }}>
                                <blockquote className="blockquote mb-0">
                                    <p>
                                        {req.description}
                                    </p>
                                    <footer className="blockquote-footer" >
                                        {Date(req.open_at)}
                                    </footer>
                                </blockquote>
                            </div>
                        </div>
                    )

                }
            </div>
            <Footer />
        </div>
    )
}

export default Requests;