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

export function AddProduct(props){

    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(()=> {
        setSelectedItems(props.currentShop.items.filter(item => item.isAdded))
    }, [props.currentShop])

    const handleAddRemove = (item) => {
        if (selectedItems.includes(item))
            setSelectedItems(selectedItems.filter(el => el.id !== item.id));
        else
            setSelectedItems([...selectedItems, item])
    }

    const onConfirm = () => {
        props.addItems(selectedItems);
        props.setShow(false)
    }

        return (
                   <ThemeProvider dir={"rtl"}>
                       <Modal show={props.show} onHide={() => props.setShow(false)} size={"lg"}>
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
                                           {props.currentShop.items.map(item => (
                                                   <Card style={{ width: '16rem'}} id={item.id} onClick={() => handleAddRemove(item)}>
                                                       <Card.Img variant="top" src={item.img} />
                                                       <Card.ImgOverlay>
                                                           <input type={"checkbox"}
                                                                  checked={selectedItems.includes(item)}/>
                                                       </Card.ImgOverlay>
                                                       <Card.Body>
                                                           <Card.Title>{item.name}</Card.Title>
                                                           <Card.Text>
                                                               Some quick example text to build on the card title and make up the bulk of
                                                               the card's content.
                                                           </Card.Text>

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