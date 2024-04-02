"use client";
import { getAllStock } from "@/app/component/utils/ApiFunctions";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Layout from "@/app/component/layout";

export default function Home() {
  const pathname = usePathname();
  const id = pathname.split("/").pop();

  const [details, setDetails] = useState([""]);

  const addToCart = (productId) => {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    const existingItem = cartItems.find((item) => item.id === productId);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cartItems.push({ id: productId, quantity: 1 });
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };
  const handleAddToCart = (productId) => {
    addToCart(productId);
    alert("เพิ่มสินค้าลงในตะกร้าเรียบร้อยแล้ว");
  };
  useEffect(() => {
    getAllStock().then((data) => {
      setDetails(data.filter((stock) => stock.id == id));
      console.log(data.filter((stock) => stock.id == id));
    });
  }, []);

  return (
    <Layout themeColor={"#000"} bgColor={"bg-light"}>
      <Container style={{ marginTop: "250px" }}>
        {details.map((detail, index) => (
          <Row key={index}>
            <Col lg={4} className="mb-4">
              <Card>
                <Card.Body className="p-4">
                  <Card.Text> ส่วนประกอบ การดูแล & แหล่งที่มา</Card.Text>
                  <Card.Text>ส่วนประกอบ</Card.Text>
                  <Card.Text>{detail.component}</Card.Text>
                  <Card.Text>การดูแล</Card.Text>

                  <Card.Text>{detail.care}</Card.Text>
                  <Card.Text>แหล่งที่มา</Card.Text>

                  <Card.Text>{detail.source}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} className="mb-4">
              <Card style={{ border: "none" }}>
                <Card.Img
                  variant="top"
                  src={
                    detail.photo ? `data:image/png;base64, ${detail.photo}` : ""
                  }
                  alt="photo"
                  className="w-75 mx-auto"
                  style={{ height: "auto", maxWidth: "100%" }}
                />
              </Card>
            </Col>
            <Col lg={4} className="mb-4">
              <Card>
                <Card.Body className="p-4">
                  <Card.Text>{detail.name}</Card.Text>
                  <Card.Text>COLLECTION</Card.Text>
                  <Card.Text>฿ {detail.price}</Card.Text>
                  <Card.Text style={{ textTransform: "uppercase" }}>
                    MERCY {detail.sex} COLLECTION
                  </Card.Text>
                  <Card.Text>{detail.detail}</Card.Text>
                  <Card.Text>{detail.size}</Card.Text>
                </Card.Body>
                <Button
                  className="link-secondary"
                  onClick={() => handleAddToCart(detail.id)}
                  style={{
                    backgroundColor: "white",
                    border: "1px solid black",
                    color: "black",
                  }}
                >
                  Add to Cart
                </Button>
              </Card>
            </Col>
          </Row>
        ))}
      </Container>
    </Layout>
  );
}
