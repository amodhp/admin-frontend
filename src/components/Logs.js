import React from 'react'
import Navbar from "./Navbar";
import Footer from "./Footer";
import LogItem from './common/LogItem';

const Logs = () => {
  return (
    <>
        <Navbar />
          <LogItem userName={"Shriyans Naik"} action={"Deleted user Shubham Shah"} dateAndTime={"3 days ago"}/>
          <LogItem userName={"Shriyans Naik"} action={"Deleted user Shubham Shah"} dateAndTime={"3 days ago"}/>
          <LogItem userName={"Shriyans Naik"} action={"Deleted user Shubham Shah"} dateAndTime={"3 days ago"}/>
          <LogItem userName={"Shriyans Naik"} action={"Deleted user Shubham Shah"} dateAndTime={"3 days ago"}/>
          <LogItem userName={"Shriyans Naik"} action={"Deleted user Shubham Shah"} dateAndTime={"3 days ago"}/>
          <LogItem userName={"Shriyans Naik"} action={"Deleted user Shubham Shah"} dateAndTime={"3 days ago"}/>
          <LogItem userName={"Shriyans Naik"} action={"Deleted user Shubham Shah"} dateAndTime={"3 days ago"}/>
        <Footer />
    </>
  )
}

export default Logs