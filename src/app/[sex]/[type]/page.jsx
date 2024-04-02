"use client";
import React, { useEffect, useState } from "react";
import Layout from "@/app/component/layout";
import { getAllStock } from "@/app/component/utils/ApiFunctions";
import { Card, Col, Container, Row } from "react-bootstrap";
import { usePathname, useRouter } from "next/navigation";

export default function page() {
  const pathname = usePathname();
  const parts = pathname.split("/");
  const sex = parts[parts.length - 2];
  const type = parts[parts.length - 1];

  const [womenStock, setWomenStock] = useState([""]);
  useEffect(() => {
    getAllStock().then((data) => {
      setWomenStock(
        data.filter((stock) => stock.sex === sex && stock.type === type)
      );
    });
  }, []);

  const router = useRouter();

  const handleCardClick = (id) => {
    router.push(`/${sex}/${type}/detail/${id}`);
  };
  return (
    <Layout themeColor={"#000"} bgColor={"bg-light"}>
      <Container style={{ marginTop: "250px" }}>
        <Row>
          {womenStock.map((stock, index) => (
            <Col key={index} lg={6} className="mb-4">
              <Card
                onClick={() => handleCardClick(stock.id)}
                style={{ cursor: "pointer" }}
              >
                <Card.Img
                  variant="top"
                  src={
                    stock.photo ? `data:image/png;base64, ${stock.photo}` : ""
                  }
                  alt="photo"
                  className="w-100 mx-auto"
                  style={{ height: "auto", maxWidth: "100%" }}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Layout>
  );
}
