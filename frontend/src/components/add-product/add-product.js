import React, {useEffect, useState} from "react";
import {
    Card, CardImg,
    Form,
    FormGroup,
    FormLabel,
    Modal,
    ModalBody,
    ModalHeader,
    ModalTitle,
    ThemeProvider,
    Button, Container, Row, Col, ToggleButton, ButtonGroup
} from "react-bootstrap";
import './add-product.scss'

export function AddProduct(props) {

    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(()=> {
        setSelectedItems(props.currentShop.products ?? [])
    }, [props.currentShop])

    const handleAddRemove = (item) => {
        if (selectedItems.includes(item.id))
            setSelectedItems(selectedItems.filter(el => el !== item.id));
        else
            setSelectedItems([...selectedItems, item.id])
    }

    const onConfirm = () => {
        props.addItems(selectedItems);
        props.setShow(false)
    }

        return (
            <ThemeProvider dir={"rtl"}>
                <Modal show={props.show} onHide={() => {
                    props.setShow(false);
                    setSelectedItems(props.currentShop.products ?? []);
                }} size={"lg"}>
                    <ModalHeader className="justify-content-between" closeButton>
                        <ModalTitle>افزودن کالا</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
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
                            <Container>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <FormLabel>
                                                نوع کالا را انتخاب کنید:
                                            </FormLabel>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <div className="items-container">
                                    {props.allProducts.map(item => (
                                            <Card style={{ width: '16rem'}} id={item.id} onClick={() => handleAddRemove(item)}>
                                                <Card.Img variant="top" src={item.img} />
                                                <Card.ImgOverlay>
                                                    <input type={"checkbox"}
                                                            checked={selectedItems.includes(item.id)}/>
                                                </Card.ImgOverlay>
                                                <Card.Body>
                                                    <Card.Title>{item.name}</Card.Title>
                                                </Card.Body>
                                            </Card>
                                    ))}
                                </div>
                                <Row>
                                    <Col md={1}>
                                        <Button onClick={() => onConfirm()}>
                                            تایید
                                        </Button>
                                    </Col>
                                </Row>
                            </Container>
                        </Form>
                    </ModalBody>
                </Modal>
            </ThemeProvider>
        )
}