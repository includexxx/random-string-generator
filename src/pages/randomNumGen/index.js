import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router'
import { Row, Col, Container } from 'react-bootstrap';

import '../../styles/pages/index.css';

import { SmallInput, Input } from '../../components/TextInput';
import { RoundButton, GenerateButton } from '../../components/Button';
import { randomInt, randomFloat, randomAlphaNum, getFileSize } from '../../utils/randomGen';
import { notify } from "../../utils/common";
import { ToastContainer } from 'react-toastify';
import { getdata, postdata } from '../../services/api';

let timer = null;

function RandomNumGen(props) {
    const [loading, setLoading] = useState(false);
    const [start, setStart] = useState(false);
    const [stop, setStop] = useState(false);
    const [filesize, setFilesize] = useState("");
    const [num, setNum] = useState([]);
    const [percentObject, setPercentObject] = useState({
        numeric: "",
        alphaNumeric: "",
        float: ""
    });
    const [showCounter, setShowCounter] = useState({
        numeric: "",
        alphaNumeric: "",
        float: ""
    })
    let history = useHistory();

    let arr = [randomInt, randomFloat, randomAlphaNum];

    const handlePercentObject = (e) => {
        const { name, value } = e.target;
        setPercentObject({ ...percentObject, [name]: value });
    }

    const handleShowCounter = (e) => {
        const { name, value } = e.target;
        //setShowCounter({ ...showCounter, [name]: value });
    }

    const handleFilesize = (e) => {
        setFilesize(e.target.value);
    }

    const startCounter = async () => {
        setStart(true);
    }

    const gnReport = async (e) => {
        if (num.length === 0) {
            notify("error", "Random num has not been generated.");
            return;
        }

        history.push({
            pathname: '/pdf-gen',
            state: { randomNum: num },
        });

    }

    useEffect(() => {
        // Get file's size from num array without saving to a file
        // It will save from repetitive api call to know the file size
        if (num.length <= 0) return;
        let arrlen = getFileSize(num);
       // console.log("arr len = ", arrlen, parseFloat(filesize))
        if (arrlen > parseFloat(filesize)) {  // check filesize access the size specified by the user
            notify("warning", "Size of the output file reaches to the size specified by the user");
            setStart(false);
        }
    }, [num])

    useEffect(() => {
        setShowCounter({ alphaNumeric: "", float: "", numeric: "" });
        //console.log(start)
        if (start) {

            if (!filesize || isNaN(filesize)) {
                notify("error", "Invalid size of the output file");
                setStart(false);
                return;
            }
            setNum([]);
            setLoading(true);
            timer = setInterval(() => {
                let index = randomInt(0, 2);
                let value = "";
                if (index === 0) {
                    value = String(arr[index](0, 100000000));
                    setShowCounter({ alphaNumeric: "", float: "", numeric: value });
                }
                if (index === 1) {
                    value = String(arr[index](0, 100000000));
                    setShowCounter({ alphaNumeric: "", numeric: "", float: value });
                }
                if (index === 2) {
                    value = String(arr[index](200));
                    let space = randomInt(0, 10);
                    setShowCounter({ float: "", numeric: "", alphaNumeric: value });
                    value = ' '.repeat(space) + value;  // add space
                    value = value + ' '.repeat(space); //add space
                }
                // save random number to an array to calculate file size
                setNum(oldArray => [...oldArray, value]);
            }, 1000);
        } else {
            setLoading(false);
            clearInterval(timer);
        }
        return () => {
            clearInterval(timer);
        }
        setLoading(false);

    }, [start])

    return (

        <Container fluid className="main-container">
            <Row><ToastContainer style={{ zIndex: 99999 }} autoClose={2000} /></Row>
            <Row className="first-part">
                <Col>
                    <Row>
                        <SmallInput
                            label="Numeric"
                            type="text"
                            name="numeric"
                            value={percentObject.numeric}
                            onChange={handlePercentObject}
                        />
                    </Row>
                    <Row>
                        <SmallInput
                            label="Alphanumeric"
                            type="text"
                            name="alphaNumeric"
                            value={percentObject.alphaNumeric}
                            onChange={handlePercentObject}
                        />
                    </Row>
                    <Row>
                        <SmallInput
                            label="Float"
                            type="text"
                            name="float"
                            value={percentObject.float}
                            onChange={handlePercentObject}
                        />
                    </Row>
                </Col>
                <Col>
                    <p>Size of the output file (kb)</p>
                    <Input
                        type="text"
                        name="filesize"
                        value={filesize}
                        onChange={handleFilesize}
                    />
                </Col>
            </Row>
            <Row className="second-part">
                <Col>
                    <RoundButton title="Start" submit={startCounter} loading={loading} />
                    <RoundButton title="Stop" submit={(e) => setStart(false)} />
                </Col>
            </Row>

            <Row className="third-part">
                <Col sm={12}>
                    <div className="counter">
                        <div className="counter-input">
                            <label>Counter1(Numeric)</label>
                        </div>
                        <div>
                            <Input
                                type="text"
                                name="numeric"
                                value={showCounter.numeric}
                                onChange={handleShowCounter}
                            />
                        </div>

                    </div>
                </Col>
                <Col sm={12}>
                    <div className="counter">
                        <div className="counter-input">
                            <label>Counter2(Alphanumeric)</label>
                        </div>
                        <div>
                            <Input
                                type="text"
                                name="alphaNumeric"
                                value={showCounter.alphaNumeric}
                                onChange={handleShowCounter}
                            />
                        </div>

                    </div>
                </Col>
                <Col sm={12}>
                    <div className="counter">
                        <div className="counter-input">
                            <label>Counter3(Float)</label>
                        </div>
                        <div>
                            <Input
                                type="text"
                                name="float"
                                value={showCounter.float}
                                onChange={handleShowCounter}
                            />
                        </div>

                    </div>
                </Col>
            </Row>
            <Row className="forth-part">
                <Col>
                    <div className="gr">
                        <GenerateButton title="Generate Report" loading={loading} submit={gnReport} />
                    </div>
                </Col>
            </Row>

        </Container >
    )
}

export default RandomNumGen;
