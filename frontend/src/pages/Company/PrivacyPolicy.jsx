import React from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar/Navbar";

function PrivacyPolicy() {
  return (
    <>
      <Navbar />

      <div className="container" style={{ fontSize: "13px" }}>
        <h1
          className="text-center text-uppercase "
          style={{ padding: "1.2em 0" }}
        >
          Privacy Policy
        </h1>
        <p>
          Ayaba is compliant with The General Data Protection Regulation (GDPR)
          (EU) 2016/679.
        </p>
        <p>
          It means that we are open about our methods of tracking and use of the
          visitors’ personal data, and you can freely check what exactly we’re
          doing to it.
        </p>
        <p>At shynster.com, we collect:</p>
        <ul>
          <li>Your name and surname </li>
          <li>Your email address </li>
          <li>Your physical address </li>
          <li>Your phone number </li>
          <li>
            The data about the browser and device you use to view the store{" "}
          </li>
          <li>The way you navigate the store </li>
        </ul>
        <p>
          We gather your contact details because they are necessary to accept
          and process your orders, and to make sure you’ve got your packages.
        </p>
        <p>
          We gather the details of your technical equipment and on-site behavior
          in order to make our store more user-friendly, and to personalize our
          store services for you (for example, to automatically switch the store
          to the mobile version.)
        </p>
        <p>
          Our store works with outer companies that help us provide the best
          service for you, and these third parties also use some of the personal
          details you’re leaving. We limit the data they can access to only what
          is necessary for them to perform their obligations.
        </p>
        <ul>
          <li>
            Payment services use your credit card number, your name and surname
            to verify and process your payments for our products{" "}
          </li>
          <li>
            Our manufacturers and stock keepers use the data of your order
            contents to assemble the necessary package for you{" "}
          </li>
          <li>
            Postal services use your first name, last name, and physical address
            to arrange the product delivery for you{" "}
          </li>
          <li>
            Mass mailing services use your email address to send you emails (if
            you have subscribed for them){" "}
          </li>
        </ul>
        <p>
          If you keep browsing our webstore after reading this Privacy Policy,
          you give us the consent to use your personal details for the purposes
          explained above.
        </p>
        <p>If you don’t agree to these terms, please leave the website.</p>
        <p>You can email us at support@shynster.com and ask:</p>
        <ul>
          <li>
            To receive the copy of your personal details we have collected{" "}
          </li>
          <li>To delete your personal details from our system </li>
          <li>
            To withdraw your consent (if you previously agreed to provide us
            with the data, but then changed your mind){" "}
          </li>
        </ul>
        <p>
          We are doing our best to guarantee the security of your personal
          details while keeping and using them.
        </p>
        <p>Thank you for your cooperation!</p>
      </div>

      <Footer />
    </>
  );
}

export default PrivacyPolicy;
