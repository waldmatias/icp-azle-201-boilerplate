import React from "react";
import PropTypes from "prop-types";
import { Card, Button, Col, Badge, Stack } from "react-bootstrap";
import { Principal } from "@dfinity/principal";
import { e8sToIcpDecimal } from "../../utils/ledger";

const Product = ({ product, buy }) => {
  const { id, price, title, description, location, attachmentUrl, seller, soldAmount } =
    product;

  const triggerBuy = () => {
    buy(id);
  };

  const displayPrice = (price) => {
    let priceString = e8sToIcpDecimal(price);
    // check for decimal part
    let decimals = priceString.split('.').pop();
    // console.log(`decimals: ${decimals}`);    

    return Number.parseInt(decimals) === 0 ? Number.parseInt(priceString) : priceString;
  };

  return (
    <Col key={id}>
      <Card className=" h-100">
        <Card.Header as="h5">
          <Stack direction="horizontal" gap={2}>
            <Badge bg="secondary" className="ms-auto">
              {soldAmount.toString()} Sold
            </Badge>
          </Stack>
        </Card.Header>
        <div className=" ratio ratio-4x3">
          <img src={attachmentUrl} alt={title} style={{ objectFit: "cover" }} />
        </div>
        <Card.Body className="d-flex  flex-column text-center">
          <Card.Title>{title}</Card.Title>
          <Card.Text className="flex-grow-1 ">{description}</Card.Text>
          <Card.Text className="text-secondary">
            <span>{location}</span>
          </Card.Text>
          <Card.Text className="text-secondary">
            <span>Seller: {Principal.from(seller).toText()}</span>
          </Card.Text>
          <Button
            variant="outline-dark"
            onClick={triggerBuy}
            className="w-100 py-3"
          >
            Buy for {displayPrice(price)} LICP
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

Product.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
  buy: PropTypes.func.isRequired,
};

export default Product;
