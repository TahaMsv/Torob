import React, {useEffect, useState} from "react";
import "./my-shops.scss";
import {Badge, Button, Card, Col, Container, Form, FormControl, ListGroup, ListGroupItem, Row,} from "react-bootstrap";
import {AddProduct} from "../add-product/add-product";
import {NewProduct} from "../create-product/create-product";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export function MyShops() {
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showCreateProductModal, setShowCreateProductModal] = useState(false);
  const [currentShop, setCurrentShop] = useState({id: 2, name: "غرب گستران شرق", items:[]},);
  const [stores, setStores] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  useEffect( () => {
    async function fetchStores() {
      const res = await fetch("http://127.0.0.1:3002/shopowner/stores", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const resultStores = await res.json();
      setStores(resultStores.filter(store => store.name).map(store => ({...store, items: []})))
    }

    async function fetchProducts() {
      const res = await fetch("http://127.0.0.1:3002/search", {
      method: "GET",
      headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
          "Content-type": "application/json; charset=UTF-8"
      }
      });
      const products = await res.json();
      setAllProducts(products);
    }
    fetchStores();
    fetchProducts();
  }, [])

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
            <Card.Header className="card-header">ثبت فروشگاه جدید</Card.Header>
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
        </Col>
        <Col>
          <Card>
          <Card.Header className="card-header">
            فروشگاه های فعلی
          </Card.Header>
            <Card.Body>
              <ListGroup>
                {stores.map(store =>
                <ListGroupItem variant={"secondary"} action active={currentShop.id === store.id}
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
                <span>کالا های فروشگاه {currentShop.name} :</span>
                <div className="btn-container">
                  <Button className="addBtn" onClick={() => setShowAddProductModal(true)}>
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
              <div className="carousel-container">
                <Carousel responsive={responsive}>
                  {mockData.map(item => (
                      <Card style={{ width: '16rem'}}>
                        <Card.Img variant="top" src={item.img} />
                        <Card.ImgOverlay>
                          <Badge style={{float: "right"}}>{item.leastPrice}$</Badge>
                        </Card.ImgOverlay>
                        <Card.Body>
                          <Card.Title>{item.name}</Card.Title>
                          <Card.Text>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquid aperiam dolores eos expedita, inventore maxime minus nisi repellendus? Ad?
                          </Card.Text>
                        </Card.Body>
                      </Card>
                  ))}
                </Carousel>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <AddProduct
        show={showAddProductModal}
        setShow={setShowAddProductModal}
        addItems={addItems}
        currentShop={currentShop}
        allProducts={allProducts}
      ></AddProduct>
      <NewProduct
        show={showCreateProductModal}
        setShow={setShowCreateProductModal}
        currentShop={currentShop}
      ></NewProduct>
    </Container>
  );
}
