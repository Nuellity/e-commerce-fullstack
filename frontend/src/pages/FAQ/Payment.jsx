import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";

function Payment() {
  return (
    <>
      <Navbar />
      <div className="container" style={{ fontSize: "13px" }}>
        <h1 className="text-center text-uppercase py-4">Payment methods</h1>
        <img
          className="img-fluid pb-5"
          src="images/img/about/payment.svg"
          alt="payment-img"
          style={{ height: "150px", width: "100%" }}
        />

        <p>
          <b>Payment methods include PayPal and Credit cards.</b>
        </p>
        <p>
          PayPal is a safer, easier way to send and receive money online. When
          you select PayPal as the payment method, you will be linked to the
          PayPal site where you can make payment.
        </p>
        <p>
          PayPal can be used to purchase items by Credit Card (Visa, MasterCard,
          Discover, and American Express), Debit Card, or E-check (i.e. using
          your regular Bank Account).
        </p>
        <p>
          1) After viewing your items on your shopping cart page, you can click
          and check out with PayPal. Then you will leave our site and enter
          PayPal’s website.
          <br />
          2) You can sign in to your PayPal account, or you can create a new one
          if you haven’t got one.
          <br />
          3) You can use the PayPal as you want according to the on-screen
          instructions.
        </p>
        <p>
          Usually, PayPal e-check will take 3-5 business days to be confirmed by
          PayPal.
        </p>
        <p>
          <b>The reasons why we suggest you use PayPal:</b>
          <br />
          Payment is traceable. By using your PayPal account, you can trace the
          status of your payment.
          <br />
          When you make payment for your order, you don’t need to use your
          credit card online (you can transfer directly from your bank account).
          When you use your credit card through PayPal, nobody will see your
          credit card number, which will minimize the risk of unauthorized use.
        </p>
        <p>
          The store may also accept credit cards for the payment. In order to
          accept credit card payments, the store complies with the industry
          security standards established by the major credit card companies
          (American Express, Discover, JCB, MasterCard, and Visa) to protect the
          buyers from cardholder information theft.
        </p>
        <p>
          All credit card information is kept to a minimum. The storage and
          retention of any credit card information is limited to what is
          required for business operations only. Access to credit card
          information is strictly limited to those employees who are authorized
          and trained to use it for the business purposes.
        </p>
      </div>
      <Footer />
    </>
  );
}

export default Payment;
