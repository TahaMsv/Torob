import React, {useEffect, useState} from "react";
import "./my-shops.scss";
import {Button, Card, Col, Container, Form, FormControl, ListGroup, ListGroupItem, Row,} from "react-bootstrap";
import {AddProduct} from "../add-product/add-product";
import {NewProduct} from "../create-product/create-product";

export function MyShops() {
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showCreateProductModal, setShowCreateProductModal] = useState(false);
  const [currentShop, setCurrentShop] = useState(    {id: 2, name: "غرب گستران شرق", items:[]},
  )

  useEffect( () => {
    async function fetchStores() {
      const res = await fetch("http://127.0.0.1:3002/shopowner/stores", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      return await res.json()
    }
    fetchStores();
  })

  const addItems = (addedItems) => {
    currentShop.items.forEach((item) => {
      item.isAdded = !!addedItems.includes(item);
    })
  }

  const mockData = [
    {
      id: 3,
      name: "لنوو آیدیا پد",
      img: "https://www.notebookcheck.com/uploads/tx_nbc2/LenovoIdeaPad3-17__1__02.jpg",
      leastPrice: 200000,
      dateAdded: "1401/2/31",
      isFavorited: true,
      isAdded: false
    }, {
      id: 4,
      name: "لنوو آیدیا پد",
      img: "https://www.notebookcheck.com/uploads/tx_nbc2/LenovoIdeaPad3-17__1__02.jpg",
      leastPrice: 200000,
      dateAdded: "1401/2/31",
      isFavorited: true,
      isAdded: false
    },{
      id: 1,
      name: "لنوو آیدیا پد",
      img: "https://www.notebookcheck.com/uploads/tx_nbc2/LenovoIdeaPad3-17__1__02.jpg",
      leastPrice: 200000,
      dateAdded: "1401/2/31",
      isFavorited: true,
      isAdded: false
    },{
      id: 2,
      name: "لنوو آیدیا پد",
      img: "https://www.notebookcheck.com/uploads/tx_nbc2/LenovoIdeaPad3-17__1__02.jpg",
      leastPrice: 200000,
      dateAdded: "1401/2/31",
      isFavorited: true,
      isAdded: false
    },
  ]

  const stores = [
    {id: 1, name: "شرق گستران غرب", items: mockData},
    {id: 2, name: "غرب گستران شرق", items:[]},
    {id: 3, name: "بهتخسیهتبخهست", items:[]}
  ]

  const onAddStore = async (event) => {
    event.preventDefault();
    const store = {
      name: event.target[0].value,
      city: event.target[1].value
    };
    fetch("http://127.0.0.1:3002/shopowner/addstore", {
      method: "POST",
      body: JSON.stringify(store),
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    .then(res => {
      return res.json();
    })
    .then(json => {
      console.log(json);
    });
  };

  return (
    <Container className="main-container">
      <Row>
        <Col md={8}>
          <Card className="form-card">
            <Card.Header className="card-header">مشخصات فروشگاه </Card.Header>
            <Form onSubmit={(event) => onAddStore(event)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="">نام فروشگاه</Form.Label>
                <Form.Control
                  className=""
                  placeholder="نام فروشگاه را وارد کنید"
                />
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
        </Col> {/*{currentShop.items.map((item) => (*/}
              {/*  <div>*/}
              {/*    <img src={item.img} style={{ width: "5rem" }} />*/}
              {/*    <h5>{item.name}</h5>*/}
              {/*    <span>{item.price}</span>*/}
              {/*  </div>*/}
              {/*))}*/}
        <Col>
          <Card>
          <Card.Header className="card-header">
            فروشگاه های فعلی
          </Card.Header>
            <Card.Body>
              <ListGroup>
                {stores.map(store =>
                <ListGroupItem action active={currentShop.id === store.id}
                               onClick={() => setCurrentShop(store)} style={{textAlign:"start"}}>{store.name}
                </ListGroupItem>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="add-items">
        <Col>
          <Card>
            <Card.Header>
              <div className="add-item-header">
                <span>افزودن کالا</span>
                <div className="btn-container">
                  <Button onClick={() => setShowAddProductModal(true)}>
                    +
                  </Button>
                  <Button
                    variant={"outline-primary"}
                    onClick={() => setShowCreateProductModal(true)}
                  >
                    ساخت کالا
                  </Button>
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              {currentShop.items.filter(item => item.isAdded).map((item) => (
                <div>
                  <img src={item.img} style={{ width: "5rem" }} />
                  <h5>{item.name}</h5>
                  <span>{item.price}</span>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <AddProduct
        show={showAddProductModal}
        setShow={setShowAddProductModal}
        addItems={addItems}
        currentShop={currentShop}
      ></AddProduct>
      <NewProduct
        show={showCreateProductModal}
        setShow={setShowCreateProductModal}
      ></NewProduct>
    </Container>
  );
}
