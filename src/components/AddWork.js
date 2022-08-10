import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';


function OffCanvas({ show,setShow, ...props }) {
  const [assetName, setAssetName] = useState('');
  const [assetDescription, setAssetDescription] = useState('');
  //location of assset
  const [assetLocation, setAssetLocation] = useState('');
  //category of asset
  const [assetCategory, setAssetCategory] = useState('');
  //image of asset
  const [assetImage, setAssetImage] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(assetName, assetDescription, assetLocation, assetCategory, assetImage);
        handleClose();
    }



  return (
    <>

      <Offcanvas show={show}  onHide={handleClose} {...props}>
        <Offcanvas.Header style={{fontSize: "2rem"}} closeButton>
          <Offcanvas.Title>
            <div 
            style={{
              fontSize:"3rem",
              padding:"0.5rem",
              width:"100%"
            }}
            >Add Work
            
            </div>
            </Offcanvas.Title>
            

        </Offcanvas.Header>
        <Offcanvas.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Asset Name</Form.Label>
                <Form.Control type="text" placeholder="Asset Name" style={{width:"250px"}} 
                onChange={(e)=>setAssetName(e.target.value)}
                />
                <hr></hr>
                <Form.Label>Asset Description</Form.Label>
                <Form.Control type="text" placeholder="Asset Name" style={{width:"250px", height:"200px"}}
                onChange={(e)=>setAssetDescription(e.target.value)}
                />
                <hr></hr>
                <Form.Label>Asset Loaction</Form.Label>
                <Form.Control type="text" placeholder="Asset Loaction" style={{width:"250px"}}
                onChange={(e)=>setAssetLocation(e.target.value)}
                />
                <hr></hr>
                <Form.Label>Asset category</Form.Label>
                <Form.Control type="text" placeholder="Asset category" style={{width:"250px"}}
                onChange={(e)=>setAssetCategory(e.target.value)}
                />
                <hr></hr>
                <Form.Label>Asset image</Form.Label>
                <Form.Control type="file" placeholder="Upload Image" style={{width:"250px"}}/>
                <hr></hr>
                <Button variant="primary" type="submit">Submit</Button>
              </Form.Group>
            </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

function AddWork({ show, setShow, ...props }) {
  return (
    <>
        <OffCanvas  placement="end"  show={show} setShow={setShow}/>
    </>
  );
}

export default AddWork;