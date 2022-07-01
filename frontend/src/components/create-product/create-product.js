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
    Row
} from "react-bootstrap";

import './create-product.scss'


export function NewProduct(props) {
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
            "shopId": 7
        };

    const submitProduct = async (event) => {
        event.preventDefault();
        const res = await fetch('http://127.0.0.1:3002/product/create', {
            method: "POST",
            mode: 'cors',
            body: JSON.stringify(createdItem),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        console.log(res)
    }

    return(
        <Modal show={props.show} size={"lg"} onHide={() => props.setShow(false)}>
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
                            <option>
                                تبلت
                            </option>
                            <option>
                                گوشی
                            </option>
                            <option>
                                لپتاپ
                            </option>
                        </Form.Select>
                    </FormGroup>

                    <FormGroup style={{marginTop: "1rem"}}>
                        <FormLabel>:قیمت محصول به ریال</FormLabel>
                        <FormControl type="number"></FormControl>
                    </FormGroup>

                    <FormGroup style={{marginTop: "1rem"}}>
                        <FormLabel>عکس محصول:</FormLabel>
                        <FormControl type="file"></FormControl>
                    </FormGroup>

                    <Button variant="primary" type="submit">
                        ثبت
                    </Button>
                </Form>
            </ModalBody>
        </Modal>
    )
}