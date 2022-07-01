import React, {useState} from "react";
import './my-shops.scss';
import addImg from '../../assets/logo/add-img.svg';
import {Form, Button, Container, Row, Co, Col, Card, FormControl, CardImg} from 'react-bootstrap'
import {AddProduct} from "../add-product/add-product";
import {NewProduct} from "../create-product/create-product";

export function MyShops() {
    const [showAddProductModal, setShowAddProductModal] = useState(false);
    const [showCreateProductModal, setShowCreateProductModal] = useState(false);
    const [addedItems, addItems] = useState([]);

    const store =
        {
            "name": "HomaKala",
            "city": "tehran",
            "ownerId": 6
        };


    const onAddStore = async(event) => {
        event.preventDefault();
        const res = await fetch('http://127.0.0.1:3002/product/addstore', {
            method: "POST",
            mode: 'cors',
            body: JSON.stringify(store),
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'), 
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        console.log(res)
    }

        return (
          <Container className="main-container">
            <Row>
              <Col md={8}>
              <Card className="form-card">
                <Card.Header className="card-header">مشخصات فروشگاه </Card.Header>
            <Form onSubmit={(event) => onAddStore(event)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="">نام فروشگاه</Form.Label>
          <Form.Control className="" placeholder="نام فروشگاه را وارد کنید" />
        </Form.Group>
              
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>آدرس فروشگاه</Form.Label>
          <Form.Control type="textbox" placeholder="آدرس" />
        </Form.Group>

        <Form.Group className="mb-3">
        <Form.Label>توضیحات</Form.Label>
        <FormControl></FormControl>
        </Form.Group>
        <Button variant="primary" type="submit">
          ثبت
        </Button>
      </Form>
          </Card>
              </Col>
              <Col>
              <Card className= "justify-content-center align-items-center" style={{height: "100%"}}>
                <Card.Img className="add-img" src={addImg}>
              </Card.Img>
              <Card.ImgOverlay className="">
                <Card.Subtitle className="card-subtitle">عکس را بارگذاری کنید</Card.Subtitle>
              </Card.ImgOverlay>
              </Card>
              </Col>
            </Row>
            <Row className= "add-items">
              <Col>
              <Card>
                <Card.Header>
                  <div className="add-item-header">
                      <span>افزودن کالا</span>
                      <div className="btn-container">
                          <Button onClick={() => setShowAddProductModal(true)}>+</Button>
                          <Button variant={"outline-primary"} onClick={() => setShowCreateProductModal(true)}>ساخت کالا</Button>
                      </div>
                  </div>
                </Card.Header>
                <Card.Body>
                    {
                        addedItems.map(item => (
                            <div>
                                <img src={item.img} style={{width: "5rem"}}/>
                                <h5>{item.name}</h5>
                                <span>{item.price}</span>
                            </div>
                        ))
                    }
                </Card.Body>
              </Card>
              </Col>
            </Row>
              <AddProduct show = {showAddProductModal} setShow={setShowAddProductModal} addItems={addItems}></AddProduct>
              <NewProduct show = {showCreateProductModal} setShow={setShowCreateProductModal} ></NewProduct>
          </Container>
          
        )
}