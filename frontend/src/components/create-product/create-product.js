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

    useEffect(() => {
        
    });

    const createdItem =
        {
            "name": "iPhone13",
            "suggestedPrice": "62000000",
            "details": {
                "ram": "8GB",
                "camera": "12Mp"
            },
            "img": "https://www.apple.com/de/shop/buy-iphone/iphone-13-pro",
            "link": "google.com",
            "productType": "laptop|lenovo",
        };

    const submitProduct = async (event) => {
        event.preventDefault();
        const res = await fetch('http://127.0.0.1:3002/product/create', {
            method: "POST",
            mode: 'cors',
            body: JSON.stringify({
                ...createdItem,
                name: event.target[0].value,
                suggestedPrice: event.target[2].value,
                shopId: props.currentShop.id
            }),
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-type": "application/json; charset=UTF-8"
            }
        })
    }

    const onNewDetailAdded = () => {
        console.log(productDetails);
        let newDetails = productDetails;
        newDetails.push({key: '', value: ''});
        setProductDetails(newDetails);
    }

    const onDetailKeyChange = (val, index) => {
        let tempProductDetail = productDetails;
        tempProductDetail[index].key = val;
        setProductDetails(tempProductDetail);
    }

    const onDetailValueChange = (val, index) => {
        let tempProductDetail = productDetails;
        tempProductDetail[index].value = val;
        setProductDetails(tempProductDetail);
    }

    return(
        <Modal show={props.show} size={"lg"} onHide={() => props.setShow(false)} scrollable>
            <ModalHeader className="justify-content-between" closeButton>
                <ModalTitle>ساخت کالا</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Form onSubmit={(event) => submitProduct(event)}>
                    <FormGroup>
                        <FormLabel>
                            نام کالا
                        </FormLabel>
                        <FormControl placeholder={"نام کالا را وارد کنید"}>
                        </FormControl>
                    </FormGroup>

                    <FormGroup style={{marginTop: "1rem"}}>
                        <Form.Label>دسته بندی محصول را انتخاب کنید:</Form.Label>
                        <Form.Select>
                            <option value="tablet|samsung">
                                تبلت سامسونگ
                            </option>
                            <option value="tablet|xiaomi">
                                تبلت شیائومی
                            </option>
                            <option value="tablet|apple">
                                تبلت اپل
                            </option>
                            <option value="mobile|samsung">
                                گوشی سامسونگ
                            </option>
                            <option value="mobile|xiaomi">
                                گوشی شیائومی
                            </option>
                            <option value="mobile|apple">
                                گوشی اپل
                            </option>
                            <option value="laptop|lenovo">
                                لپتاپ لنوو
                            </option>
                            <option value="laptop|asus">
                                لپتاپ ایسوس
                            </option>
                            <option value="laptop|apple">
                                لپتاپ اپل
                            </option>
                        </Form.Select>
                    </FormGroup>

                    <FormGroup style={{marginTop: "1rem"}}>
                        <FormLabel>قیمت محصول به تومان:</FormLabel>
                        <FormControl type="number"></FormControl>
                    </FormGroup>

                    <FormGroup style={{marginTop: "1rem"}}>
                        <FormLabel>لینک خرید:</FormLabel>
                        <FormControl type="text"></FormControl>
                    </FormGroup>

                    <FormGroup style={{marginTop: "1rem"}}>
                        <FormLabel>لینک عکس محصول:</FormLabel>
                        <FormControl type="text"></FormControl>
                    </FormGroup>

                    <FormGroup style={{marginTop: "1rem"}} >
                        <div className="add-option-create-product">
                            <FormLabel>افزودن ویژگی به محصول</FormLabel>
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

                            // productDetails.forEach((element, index) => {
                            //     return (
                            //         <InputGroup className="mb-3">
                            //             <FormControl onChange={(e) => onDetailKeyChange(e.target.value, index)} 
                            //                 value={element.key} aria-label="key" />
                            //             <FormControl onChange={(e) => onDetailValueChange(e.target.value, index)}
                            //                 value={element.value} aria-label="value"/> 
                            //         </InputGroup>
                            //     )
                            // })
                        }
                        
                    </FormGroup>

                    <Button variant="primary" type="submit">
                        ثبت
                    </Button>
                </Form>
            </ModalBody>
        </Modal>
    )
}