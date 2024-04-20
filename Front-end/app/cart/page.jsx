"use client";
import React, { useState, useEffect } from "react";
import {
  getAllCampaigns,
  getAllCartItems,
  getAllStock,
  sendCartItems,
  sendSelectCampaigns,
} from "../component/utils/ApiFunctions";
import Layout from "@/app/component/layout";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import CloseIcon from "../component/icons/close";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [coupon, setCoupon] = useState([]);
  const [onTop, setOnTop] = useState([]);
  const [seasonal, setSeasonal] = useState([]);

  const [selectedCoupon, setSelectedCoupon] = useState("");
  const [selectedOnTop, setSelectedOnTop] = useState("");
  const [selectedSeasonal, setSelectedSeasonal] = useState("");

  const [finalPrice, setFinalPrice] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const cartData = getAllCartItems();
      const stockData = await getAllStock();
      const campaignsData = await getAllCampaigns();
      const cartProducts = [];
      cartData.forEach((cartItem) => {
        const productInStock = stockData.find(
          (stockItem) => stockItem.id === cartItem.id
        );
        if (productInStock) {
          cartProducts.push({ ...productInStock, quantity: cartItem.quantity });
        }
      });

      setCartItems(cartProducts);
    };

    fetchData();
  }, []);

  useEffect(() => {
    getAllCampaigns().then((data) => {
      setCoupon(data.filter((campaign) => campaign.category === "Coupon"));
      setOnTop(data.filter((campaign) => campaign.category === "On Top"));
      setSeasonal(data.filter((campaign) => campaign.category === "Seasonal"));
    });
  }, []);

  useEffect(() => {
    sendCartItems(cartItems);
    setFinalPrice(valuePrice(cartItems));
  }, [cartItems]);

  const valuePrice = (cartItems) => {
    return cartItems.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.quantity;
    }, 0);
  };

  const handleRemoveItem = (id) => {
    const confirmDelete = window.confirm(
      "คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้?"
    );

    if (confirmDelete) {
      const updatedCartItems = cartItems.filter((item) => item.id !== id);
      setCartItems(updatedCartItems);
      updateLocalStorage(updatedCartItems);
    }
  };

  const updateLocalStorage = (items) => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  const handleCouponChange = (e) => {
    const selectedCouponIndex = parseInt(e.target.value);
    setSelectedCoupon(selectedCouponIndex);
    setSelectedOnTop(""); 
    setSelectedSeasonal(""); 
    const selectedCouponData = coupon[selectedCouponIndex];
    const changePrice = sendSelectCampaigns(selectedCouponData, cartItems);
    setFinalPrice(changePrice);
  };

  const handleOnTopChange = (e) => {
    const selectedOnTopIndex = parseInt(e.target.value);
    setSelectedOnTop(selectedOnTopIndex);
    setSelectedSeasonal(""); 
    const selectedOnTopData = onTop[selectedOnTopIndex];
    const changePrice = sendSelectCampaigns(selectedOnTopData, cartItems);
    setFinalPrice(changePrice);
  };

  const handleSeasonalChange = (e) => {
    const selectedSeasonalIndex = parseInt(e.target.value);
    setSelectedSeasonal(selectedSeasonalIndex);
    
    const selectedSeasonalData = seasonal[selectedSeasonalIndex];
    const changePrice = sendSelectCampaigns(selectedSeasonalData, cartItems);
    setFinalPrice(changePrice);
  };

  return (
    <Layout themeColor={"#000"} bgColor={"bg-light"}>
      <Container style={{ marginTop: "250px" }}>
        <p> ตะกร้า({cartItems.length})</p>
        <Row style={{ marginBottom: "200px" }}>
          {cartItems.map((item, index) => (
            <Col key={index} lg={4} className="mb-4">
              <Card>
                <Card.Body className="p-0 ">
                  <Card style={{ border: "none", marginBottom: "10px" }}>
                    <Card.Img
                      variant="top"
                      src={
                        item.photo ? `data:image/png;base64, ${item.photo}` : ""
                      }
                      alt="photo"
                      className="w-100 mx-auto"
                      style={{ height: "auto", maxWidth: "100%" }}
                    />
                  </Card>
                  <div className="d-flex justify-content-between p-2">
                    <Card.Title>{item.name}</Card.Title>

                    <Button
                      onClick={() => handleRemoveItem(item.id)}
                      style={{
                        padding: "0",
                        border: "none",
                      }}
                      variant="link"
                    >
                      <CloseIcon />
                    </Button>
                  </div>

                  <Card.Text className="p-2">฿ {item.price} </Card.Text>
                  <Card.Text className="p-2">{item.size} </Card.Text>
                  <Card.Text className="p-2">จำนวน: {item.quantity}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
          <Col lg={12}>
            <select
              className="form-select mb-5"
              aria-label="Default select example"
              value={selectedCoupon}
              onChange={handleCouponChange}
            >
              <option value="">เลือก Coupon</option>
              {coupon.map((item, index) => (
                <option key={index} value={index}>
                  {item.name}{" "}
                  {item.category}{" "}
                  {item.discount}
                </option>
              ))}
            </select>
          </Col>
          <Col lg={12}>
            <select
              className="form-select mb-5"
              aria-label="Default select example"
              value={selectedOnTop}
              onChange={handleOnTopChange}
              disabled={selectedCoupon === ""} 
            >
              <option value="">เลือก On Top</option>
              {onTop.map((item, index) => (
                <option key={index} value={index}>
                  {item.name}{" "}
                  {item.category}{" "}
                  {item.discount}
                </option>
              ))}
            </select>
          </Col>
          <Col lg={12}>
            <select
              className="form-select"
              aria-label="Default select example"
              value={selectedSeasonal}
              onChange={handleSeasonalChange}
              disabled={selectedOnTop === ""} 
              style={{ marginBottom: "200px" }}
            >
              <option value="">เลือก Seasonal</option>
              {seasonal.map((item, index) => (
                <option key={index} value={index}>
                  {item.name}{" "}
                  {item.category}{" "}
                  {item.discount}
                </option>
              ))}
            </select>
          </Col>
        </Row>
        <div
          className="fixed-bottom pb-4 border-top d-flex justify-content-end"
          style={{
            backgroundColor: "#fff",
            paddingRight: "10px",
          }}
        >
          <p>รวม {finalPrice}</p>
        </div>
      </Container>
    </Layout>
  );
}