import {
    Button,
    Card,
    Col,
    Container,
    Form, FormControl,
    FormGroup,
    FormLabel, FormSelect, Modal,
    ModalBody,
    ModalHeader,
    ModalTitle,
    InputGroup,
    Row
} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAdd} from '@fortawesome/free-solid-svg-icons';
import React, {useEffect, useState} from "react";
import './create-product.scss'


export function NewProduct(props) {
    const [productDetails, setProductDetails] = useState([]);

    const submitProduct = async (event) => {
        event.preventDefault();
        const targets = event.target;
        let details = {};
        for (const detail of productDetails) {
            details[detail.key] = detail.value;
        }
        console.log(details);
        const res = await fetch('http://127.0.0.1:3002/product/create', {
            method: "POST",
            mode: 'cors',
            body: JSON.stringify({
                name: targets[0].value,
                suggestedPrice: +targets[2].value,
                img: targets[4].value,
                link: targets[3].value,
                productType: targets[1].value,
                details,
                shopId: props.currentShop.id,
            }),
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        props.setShow(false);
        props.afterCreate();
        setProductDetails([]);
    }

    const onNewDetailAdded = () => {
        setProductDetails([...productDetails, {key:'', value:''}])
    }

    const onDetailKeyChange = (val, index) => {
        let tempProductDetail = productDetails;
        tempProductDetail[index].key = val;
        
        setProductDetails([...tempProductDetail]);
    }

    const onDetailValueChange = (val, index) => {
        let tempProductDetail = productDetails;
        tempProductDetail[index].value = val;
        setProductDetails([...tempProductDetail]);
    }

    return(
        <Modal show={props.show} size={"lg"} onHide={() => props.setShow(false)} scrollable>
            <ModalHeader className="justify-content-between" closeButton>
                <ModalTitle>???????? ????????</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Form onSubmit={(event) => submitProduct(event)}>
                    <FormGroup>
                        <FormLabel>
                            ?????? ????????
                        </FormLabel>
                        <FormControl placeholder={"?????? ???????? ???? ???????? ????????"}>
                        </FormControl>
                    </FormGroup>

                    <FormGroup style={{marginTop: "1rem"}}>
                        <Form.Label>???????? ???????? ?????????? ???? ???????????? ????????:</Form.Label>
                        <Form.Select>
                            <option value="tablet|samsung">
                                ???????? ??????????????
                            </option>
                            <option value="tablet|xiaomi">
                                ???????? ??????????????
                            </option>
                            <option value="tablet|apple">
                                ???????? ??????
                            </option>
                            <option value="mobile|samsung">
                                ???????? ??????????????
                            </option>
                            <option value="mobile|xiaomi">
                                ???????? ??????????????
                            </option>
                            <option value="mobile|apple">
                                ???????? ??????
                            </option>
                            <option value="laptop|lenovo">
                                ?????????? ????????
                            </option>
                            <option value="laptop|asus">
                                ?????????? ??????????
                            </option>
                            <option value="laptop|apple">
                                ?????????? ??????
                            </option>
                        </Form.Select>
                    </FormGroup>

                    <FormGroup style={{marginTop: "1rem"}}>
                        <FormLabel>???????? ?????????? ???? ??????????:</FormLabel>
                        <FormControl type="number"></FormControl>
                    </FormGroup>

                    <FormGroup style={{marginTop: "1rem"}}>
                        <FormLabel>???????? ????????:</FormLabel>
                        <FormControl type="text"></FormControl>
                    </FormGroup>

                    <FormGroup style={{marginTop: "1rem"}}>
                        <FormLabel>???????? ?????? ??????????:</FormLabel>
                        <FormControl type="text"></FormControl>
                    </FormGroup>

                    <FormGroup style={{marginTop: "1rem"}} >
                        <div className="add-option-create-product">
                            <FormLabel>???????????? ?????????? ???? ??????????</FormLabel>
                            <Button onClick={() => onNewDetailAdded()}>
                                <FontAwesomeIcon icon={faAdd}/>
                            </Button>
                        </div>
                        {
                            productDetails.map((detail, index) => (
                            <InputGroup className="mb-3">
                                <FormControl onChange={(e) => onDetailKeyChange(e.target.value, index)} 
                                    value={detail.key} aria-label="key" />
                                <FormControl onChange={(e) => onDetailValueChange(e.target.value, index)}
                                     value={detail.value} aria-label="value"/>
                            </InputGroup>
                            ))
                        }
                        
                    </FormGroup>

                    <Button variant="primary" type="submit">
                        ??????
                    </Button>
                </Form>
            </ModalBody>
        </Modal>
    )
}