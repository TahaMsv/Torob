import React, {useState} from "react";
import './my-shops.scss';
import addImg from '../../assets/logo/add-img.svg';
import {Form, Button, Container, Row, Co, Col, Card, FormControl, CardImg} from 'react-bootstrap'
import {AddProduct} from "../add-product/add-product";

export function MyShops() {
    const [showModal, setShowModal] = useState(false);
    const [addedItems, addItems] = useState([]);

        return (
          <Container className="main-container">
            <Row>
              <Col md={8}>
              <Card className="form-card">
                <Card.Header className="card-header">مشخصات فروشگاه </Card.Header>
            <Form>
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
                      <Button onClick={() => setShowModal(true)}></Button>
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
              <AddProduct show = {showModal} setShow={setShowModal} addItems={addItems}></AddProduct>
          </Container>
          
        )
}