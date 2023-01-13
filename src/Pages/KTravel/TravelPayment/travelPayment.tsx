/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment } from "react";
import { Card, Form, Row } from "react-bootstrap";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import styles from "./travelPayment.module.scss";
import Button from "Components/Button/button";

// import styles from "./travelHome.module.scss";

const TravelPayment: React.FunctionComponent = () => {
  return (
    <Fragment>
      <BasePageLayout
        hideFooterOnMobile={"false"}
        hideNavigation={0}
        showNavigation={"no"}
      >
        <div className={"card " + styles.icon}>
          <div className="card-body">ICONS COMES HERE</div>
        </div>
        <div className="container">
          <div className="row">
            <div className={"card mt-3 " + styles.flightCard}>
              <div className="card-header">
                Lagos(LOS) to Abuja(ABJ)
                <div className="row">
                  <div className="col">October 14, 2019|1 Audit</div>
                  <div className="col">Change flight</div>
                </div>
              </div>
              <Card.Body>
                <Card.Title className={styles.cardFlightDetails}>
                  Flight details
                </Card.Title>
                <Card.Text>
                  Arik Air W3724 | &nbsp;&nbsp;&nbsp;&nbsp;Economy
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Duration
                </Card.Text>
                <Card.Text>
                  Oct 14 &nbsp;&nbsp;13:45 &nbsp; |
                  &nbsp;&nbsp;&nbsp;&nbsp;Muritala Mohammed Airport
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Duration
                </Card.Text>
                <Card.Text>
                  Oct 14 &nbsp;&nbsp;14:40 &nbsp; |
                  &nbsp;&nbsp;&nbsp;&nbsp;Muritala Mohammed Airport
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;01hr
                  45min
                </Card.Text>
              </Card.Body>
            </div>
            <Card
              border="light"
              className={"mt-3 " + styles.flightCardSettings}
            >
              <Card.Body>
                <Card.Text>
                  <Row>
                    <p>Adult</p>
                    <p className="ml-auto">N23,798 x 1</p>
                  </Row>
                  <Row>
                    <p>Base Fare</p>
                    <p className="ml-auto">N5, 024</p>
                  </Row>
                  <Row>
                    <p>Taxes & Fees</p>
                    <p className="ml-auto">N18, 754</p>
                  </Row>
                  <Row>
                    <p>Services Fees & Taxes</p>
                    <p className="ml-auto">N20</p>
                  </Row>
                  <br />
                  <Row>
                    <p>TOTAL</p>
                    <p className="ml-auto">N23,798 x 1</p>
                  </Row>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <Card border="light" className={"mt-3 " + styles.card}>
            <Card.Header>Payment Method</Card.Header>
            <Card.Body>
              <Card.Title className={styles.cardTitle}>
                <Form.Check label="Pay Now" type="checkbox" />
              </Card.Title>
              <Card.Text className={styles.paymentInfo}>
                Your wallet Balance will be used to complete the transaction, If
                your balance is low your debit card on your profile will be
                charged
              </Card.Text>
            </Card.Body>
          </Card>
          <Card border="light" className={"mt-3 " + styles.card}>
            <Card.Body>
              <Card.Title className={styles.cardTitle}>
                <Form.Check label="Pay at the Bank" type="checkbox" />
              </Card.Title>
              <Card.Text className={styles.paymentInfo}>
                Some brief tx can go in here just to explained in plain english
                wha pay now means
              </Card.Text>
            </Card.Body>
          </Card>
          <Card border="light" className={"mt-3 " + styles.card}>
            <Card.Body>
              <Card.Title className={styles.cardTitle}>
                <Form.Check label="Apply a voucher code" type="checkbox" />
              </Card.Title>
              <Card.Text className={styles.paymentInfo}>
                Do you have a voucher? Enter the voucher code below
              </Card.Text>
              {/* <Form>
                <Form.File custom id="custom-file" label="Add a Voucher / Gift Card" />
              </Form> */}
              <Form.Group as={Row} controlId="formGridState">
                <Form.Control
                  className={styles.formControl}
                  placeholder="Add a Voucher / Gift Card"
                  type="text"
                />
                <Button
                  btnClass={"btn-primary text-white"}
                  className={styles.applyButton}
                  title={"Apply"}
                />
              </Form.Group>
            </Card.Body>
          </Card>
          <p className={styles.termsConditions}>
            By booking this item, you agree to pay the total amount shown, which
            includes Service Fees, on the right and to the Booking{" "}
            <a href="#">Terms and Conditions</a> and{" "}
            <a href="#">Privacy Policy</a>
          </p>
          <Button
            btnClass={"btn-primary text-white"}
            className={styles.continueButton}
            title={"Continue"}
          />
        </div>
      </BasePageLayout>
    </Fragment>
  );
};

export default TravelPayment;
