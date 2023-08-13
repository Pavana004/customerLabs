import React, { useState } from 'react'
import {AiOutlineMinus } from "react-icons/ai"

const SchemaDropdown = ({ isOpen, onClose }) => {

    const [segmentName, setSegmentName] = useState('');
    const [additionalSchemas, setAdditionalSchemas] = useState([]);





    const schemaOptions = [
        { label: 'First Name', value: 'first_name' },
        { label: 'Last Name', value: 'last_name' },
        { label: 'Gender', value: 'gender' },
        { label: 'Age', value: 'age' },
        { label: 'Account Name', value: 'account_name' },
        { label: 'City', value: 'city' },
        { label: 'State', value: 'state' },

    ];



    const handleAddNewSchema = () => {
        setAdditionalSchemas((prev) => [...prev, '']);
    };

    const handleAdditionalSchemaChange = (index, newValue) => {
        const updatedSchemas = [...additionalSchemas];
        updatedSchemas[index] = newValue;
        setAdditionalSchemas(updatedSchemas);
    };

    const getAvailableOptions = (index) => {
        const selectedValues = [...additionalSchemas];
        return schemaOptions.filter(
            (schemaOption) =>
                !selectedValues.includes(schemaOption.value) ||
                schemaOption.value === additionalSchemas[index]
        );
    };

    const handleRemoveSchema = (index) => {
        const updatedSchemas = additionalSchemas.filter((_, i) => i !== index);
        setAdditionalSchemas(updatedSchemas);
    };

    
    const handleCancel = () =>{
        onClose();
        window.location.reload();
    }


    const handleSegmentSave = () => {

        const res = additionalSchemas.map((finalValue => ({ [finalValue]: finalValue })));
        const segmentData = {
            segment_name: segmentName,
            schema: res

        };
        console.log(segmentData);

    }


    return (
        <div className={`sideModal shadow-sm  mb-5 bg-body-tertiary ${isOpen ? "nav-open" : "nav-close"}`}>
            <div className='' style={{ width: "100%", height: "9%", color: "white", backgroundColor: "#39aebc" }}>
                <h6 className='d-flex p-2'> &#60; Saving Segment</h6>
            </div>

            <div className='centerFrom'>
                <p className='m-3 p-2' style={{ fontWeight: "bold" }}>Enter the Name of the Segment</p>
                <input
                    type='text'
                    className='form-control m-3 p-2'
                    placeholder='Name of the segment'
                    value={segmentName}
                    onChange={(e) => setSegmentName(e.target.value)}
                    style={{ width: "90%" }} />
                <p className='m-3 p-2' style={{ fontWeight: "bold" }}>To save your segment,you need to add the schemas to build the query</p>
                <div className=' d-flex justify-content-end gap-2 p-1'>
                    <div className=' my-auto' style={{ width: "10px", height: "10px", borderRadius: "40px", backgroundColor: "lightgreen" }}></div><span style={{ fontSize: "small" }}>- User Traits</span>
                    <div className=' my-auto' style={{ width: "10px", height: "10px", borderRadius: "40px", backgroundColor: "red" }}></div><span style={{ fontSize: "small" }}>- Group Traits</span>
                </div>
                {
                    additionalSchemas.map((selected, index) => {
                        return (
                            <div key={index} className='d-flex '>
                                <div className=' my-auto' style={{ width: "15px", height: "15px", borderRadius: "40px", backgroundColor: selected === "account_name" ? "red" : "lightgreen" }}></div>
                                <select
                                    value={selected}
                                    onChange={(e) => handleAdditionalSchemaChange(index, e.target.value)}

                                    className="form-select m-3 p-2" aria-label="Default select example"
                                    style={{ width: "75%" }}
                                >
                                    <option value="">Add schema to segment</option>
                                    {getAvailableOptions(index).map((schemaOption) => (
                                        <option key={schemaOption.value} value={schemaOption.value}  >
                                            {schemaOption.label}
                                        </option>
                                    ))}
                                </select>
                                <button className='btn  my-auto'
                                    style={{ width: "10%", height: "40px", backgroundColor: "rgb(183, 238, 220)" }} onClick={() => handleRemoveSchema(index)} ><AiOutlineMinus size={25}/></button>
                            </div>
                        )
                    })
                }
                <button className="btn btn-link" style={{ color: "#41b494" }} onClick={handleAddNewSchema}>+ Add new schema</button>
            </div>
            <div className='p-2 gap-3 d-flex'>
                <button
                    className='btn'
                    style={{ backgroundColor: "#41b494", color: "white" }}
                    onClick={handleSegmentSave}
                >Save the Segment</button>
                <button className='btn' style={{ color: "red", background: "white" }} onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    )
}

export default SchemaDropdown