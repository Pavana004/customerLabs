import React, { useState } from 'react'
import SchemaDropdown from './SchemaDropdown'

const Popup = () => {

    const [isOpen, setIsOpen] = useState(false);

    const handlePopup = ()=>{
         
        setIsOpen(!isOpen)
    }


    return (
        <>
            <div className="container-fluid" style={{ backgroundColor: "#39aebc",position:"relative"}}>
                <nav className="navbar navbar-expand-lg ">
                    <div className="container-fluid" style={{ color: "white", fontWeight: "bold" }}>
                        <h6> &#60; View Audience</h6>
                    </div>
                </nav>
            </div>
            <div className='container-fluid d-flex justify-content-between ' style={{ width: "100%", height: "100%" }}>
                <div>
                    <button className='btn btn-outline-secondary m-5 btn-lg' onClick={handlePopup}>Save segment</button>
                </div>
               <SchemaDropdown isOpen={isOpen} onClose={handlePopup}/>
            </div>

        </>

    )
}

export default Popup