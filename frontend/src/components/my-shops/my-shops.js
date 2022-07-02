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
  const [currentShop, setCurrentShop] = useState({});
  const [stores, setStores] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [currentShopProducts, setCurrentShopProducts] = useState([]);

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

  const fetchData = () => {
    async function fetchStores(allProducts) {
      const res = await fetch("http://127.0.0.1:3002/shopowner/stores", {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const resultStores = await res.json();
      const filteredStores = resultStores.filter(store => store.name);
      setStores(filteredStores);
      const currentShop = filteredStores[0] ?? {id:'', name:'', products: []};
      syncCurrentShop(currentShop, allProducts);
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
      return products;
    }
    fetchProducts().then((products)=> fetchStores(products));
  }

  useEffect( () =>
    fetchData(), [])

  const syncCurrentShop = (shop, allProducts) => {
    setCurrentShop(shop);
    const currentShopProducts = shop.products.map(productId => allProducts.find((prod) => prod.id === productId));
    setCurrentShopProducts(currentShopProducts);
  }
  
  const addProductToStore = async (productId, suggestedPrice) => {
    const res = await fetch("http://127.0.0.1:3002/product/addstore", {
      method: "POST",
      body: JSON.stringify({
        productId: productId,
        shopId: currentShop.id,
        suggestedPrice,
      }),
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((result) => result.json())
  }

  const addItems = async (addedItems, suggestedPrice) => {
    await Promise.all(addedItems.map(item => addProductToStore(item, suggestedPrice)));
    fetchData();
  }

  const onAddStore = async (event) => {
    event.preventDefault();
    const store = {
      name: event.target[0].value,
      city: event.target[1].value
    };
    await fetch("http://127.0.0.1:3002/shopowner/addstore", {
      method: "POST",
      body: JSON.stringify(store),
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    fetchData();
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
                               onClick={() => syncCurrentShop(store, allProducts)} style={{textAlign:"start"}}>{store.name}
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
                  {currentShopProducts.map(item => (
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
        afterCreate={fetchData}
      ></NewProduct>
    </Container>
  );
}
