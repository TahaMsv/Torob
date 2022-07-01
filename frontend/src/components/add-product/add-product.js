import React, {useState} from "react";
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

    const [selectedItems, addRemoveItem] = useState([]);

    const mockData = [
        {
            id: 3,
            name: "لنوو آیدیا پد",
            img: "https://www.notebookcheck.com/uploads/tx_nbc2/LenovoIdeaPad3-17__1__02.jpg",
            leastPrice: 200000,
            dateAdded: "1401/2/31",
            isFavorited: true
        }, {
            id: 4,
            name: "لنوو آیدیا پد",
            img: "https://www.notebookcheck.com/uploads/tx_nbc2/LenovoIdeaPad3-17__1__02.jpg",
            leastPrice: 200000,
            dateAdded: "1401/2/31",
            isFavorited: true
        }
    ];

    const handleAddRemove = (item) => {
        if (selectedItems.includes(item.id))
            addRemoveItem(selectedItems.filter(el => el !== item.id));
        else
            addRemoveItem([...selectedItems, item.id])
    }

    const onConfirm = () => {
        const addeditems = selectedItems.map(id => mockData.find((item)=> item.id === id))
        props.addItems(addeditems)
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
                                           {mockData.map(item => (
                                                   <Card style={{ width: '16rem'}} id={item.id} onClick={() => handleAddRemove(item)}>
                                                       <Card.Img variant="top" src={item.img} />
                                                       <Card.ImgOverlay>
                                                           <input type={"checkbox"}
                                                                  checked={selectedItems.includes(item.id)}/>
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