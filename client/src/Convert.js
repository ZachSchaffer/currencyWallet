import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import "./App.css";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Jumbotron from "react-bootstrap/Jumbotron";
import Alert from 'react-bootstrap/Alert'

function Convert() {
  const [currency, setCurrency] = useState("USD");
  const [amount, setAmount] = useState(0);
  const [conversion, setConversion] = useState("USD");
  const [conversionAmount, setConversionAmount] = useState(0);
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);

  // const currencies = [
  //   "CAD",
  //   "HKD",
  //   "ISK",
  //   "PHP",
  //   "DKK",
  //   "HUF",
  //   "CZK",
  //   "GBP",
  //   "RON",
  //   "SEK",
  //   "IDR",
  //   "INR",
  //   "BRL",
  //   "RUB",
  //   "HRK",
  //   "JPY",
  //   "THB",
  //   "CHF",
  //   "EUR",
  //   "MYR",
  //   "BGN",
  //   "TRY",
  //   "CNY",
  //   "NOK",
  //   "NZD",
  //   "ZAR",
  //   "USD",
  //   "MXN",
  //   "SGD",
  //   "AUD",
  //   "ILS",
  //   "KRW",
  //   "PLN",
  // ];

  const currencies = ["USD", "CAD", "EUR", "JPY"];

  function validate() {
    return (!Number.isNaN(amount) && amount > 0);
  }

  async function submitRequest() {
    if (!validate()) {
      setShow(true);
      setConversionAmount(0);
      return 
    }

    setShow(false);

    const data = {
      currency: currency,
      amount: amount,
      convertTo: conversion,
    };

    const res = await fetch("http://localhost:5000/api/convert", {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const body = await res.json();

    setConversionAmount(body.amount);
  }

  return (
    <div className="App">
      <Container>
        <Jumbotron>
          <h1>Currency Wallet</h1>
        </Jumbotron>
        <Alert show={show} variant="danger">
          <Alert.Heading>WARNING!!!!</Alert.Heading>
          <p>
            Please enter a positive number in the input.
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => setShow(false)} variant="outline-danger">
              I will be good
            </Button>
          </div>
        </Alert>
        <Row>
          <InputGroup className="mb-3">
            <DropdownButton
              as={InputGroup.Prepend}
              variant="outline-secondary"
              title={currency}
              id="input-group-dropdown-1"
            >
              {currencies.map((curr) => {
                return (
                  <Dropdown.Item onClick={() => setCurrency(curr)}>
                    {curr}
                  </Dropdown.Item>
                );
              })}
            </DropdownButton>
            <FormControl
              type="number"
              defaultValue={0}
              onChange={(e) => {
                setAmount(parseFloat(e.target.value));
              }}
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        </Row>
        <Row>
          <h3> Is equal to...</h3>
          <InputGroup className="mb-3">
            <DropdownButton
              as={InputGroup.Prepend}
              variant="outline-secondary"
              title={conversion}
              id="input-group-dropdown-1"
            >
              {currencies.map((curr) => {
                return (
                  <Dropdown.Item onClick={() => setConversion(curr)}>
                    {curr}
                  </Dropdown.Item>
                );
              })}
            </DropdownButton>
            <FormControl type="text" placeholder={conversionAmount} readOnly />
          </InputGroup>
        </Row>
        <Button variant="dark" onClick={submitRequest}>
          Convert
        </Button>
      </Container>
    </div>
  );
}

export default Convert;
