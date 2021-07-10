import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

import { notify } from "../../utils/common";
import { ToastContainer } from 'react-toastify';
import { isAlphaNumeric } from '../../utils/randomGen';
import Table from 'react-bootstrap/Table'
import { Row, Col, Container } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup'

import '../../styles/pages/index.css';

function PdfGen(props) {
    const [data, setData] = useState([]);
    const location = useLocation();
    const [percent, serPercent] = useState({
        numeric: 0,
        alpahNumeric: 0,
        float: 0
    })
    const [dataType, setDataType] = useState({})


    const processData = (data) => {
        let numeric = 0;
        let alpahNumeric = 0;
        let float = 0;
        let obj = {};
        //console.log(data)
        for (let i = 0; i < data.length; i++) {
            let value = data[i].trim();
            //console.log("value = ", value)
            if (isAlphaNumeric(value)) {
                if (i < 20) {
                    obj[value] = "alphanumeric";
                }

                alpahNumeric++;
            } else if (value.toString().indexOf('.') != -1) {
                if (i < 20) {
                    obj[value] = "float";
                }

                float++;
            } else {
                if (i < 20) {
                    obj[value] = "numeric";
                }
                numeric++;
            }
        }
        let sum = numeric + alpahNumeric + float;
        if (sum > 0) {
            serPercent({
                numeric: parseFloat((numeric / sum) * 100).toFixed(2),
                alpahNumeric: parseFloat((alpahNumeric / sum) * 100).toFixed(2),
                float: parseFloat((float / sum) * 100).toFixed(2)
            });

        }
        // console.log(obj, sum)
        setDataType(obj);
    }

    useEffect(() => {
        //console.log("state = ", location.state)
        if (location.state?.randomNum && location.state?.randomNum?.length) {
            setData(location.state?.randomNum);
            processData(location.state?.randomNum);
        } else {
            notify("warning", "No random data found");

        }
    }, [])

    

    return (
        <div>
            <Container style={{ marginTop: 20 }}>
                <ToastContainer style={{ zIndex: 99999 }} autoClose={2000} />
                <Row>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>% Numeric</th>
                                <th>% Alphanumeric</th>
                                <th>% Float</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{percent.numeric}</td>
                                <td>{percent.alpahNumeric}</td>
                                <td>{percent.float}</td>
                            </tr>

                        </tbody>
                    </Table>
                </Row>

                <Row>
                    <ListGroup>
                        {
                            Object.keys(dataType).length !== 0 && Object.keys(dataType).map((key, index) => {

                                return (

                                    <ListGroup.Item key={index}><span className="table-text-truncat">{key}</span> - {dataType[key]}</ListGroup.Item>

                                )
                            })
                        }
                    </ListGroup>
                </Row>
            </Container>
        </div>
    )
}

export default PdfGen;
