import React from "react";
import { Link } from "react-router-dom";

const ReturnsPolicy = () => {
  return (
    <div className="container mx-auto p-4 sm:p-8 md:p-12 lg:p-16">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
        Returns & Order Policy
      </h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Order Processing
        </h2>
        <p className="text-gray-600 mb-2">
          <strong>Order Confirmation:</strong> Once your order is placed, you
          will receive a confirmation email detailing your order. Please review
          it carefully.
        </p>
        <p className="text-gray-600">
          <strong>Processing Time:</strong> Orders are typically processed
          within 1-3 business days. During peak seasons, processing may take
          longer.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Shipping Information
        </h2>
        <p className="text-gray-600 mb-2">
          <strong>Shipping Methods:</strong> We offer various shipping options
          at checkout. Delivery times vary based on your location and chosen
          method.
        </p>
        <p className="text-gray-600">
          <strong>Tracking Your Order:</strong> After your order has shipped,
          you will receive a tracking number via email.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Returns</h2>
        <p className="text-gray-600 mb-2">
          <strong>Return Eligibility:</strong> Items may be returned within 30
          days of receipt, provided they are unused, in original packaging, and
          include all tags.
        </p>
        <p className="text-gray-600">
          <strong>Exclusions:</strong> Sale items, custom products, and gift
          cards are not eligible for return.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          How to Return an Item
        </h2>
        <ol className="list-decimal list-inside text-gray-600">
          <li className="mb-2">
            <strong>Contact Us:</strong> Email our customer service at{" "}
            <Link
              to="mailto:support@bagbasket.com"
              className="text-blue-500 underline"
            >
              support@bagbasket.com
            </Link>{" "}
            to initiate a return. Include your order number and reason for
            return.
          </li>
          <li className="mb-2">
            <strong>Return Label:</strong> We will provide a return shipping
            label if the return is due to a defect or error on our part. For
            other returns, customers are responsible for shipping costs.
          </li>
          <li>
            <strong>Pack Your Item:</strong> Securely pack the item in its
            original packaging. Include a copy of your order confirmation.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Refunds</h2>
        <p className="text-gray-600 mb-2">
          <strong>Processing Time:</strong> Refunds will be processed within 5-7
          business days of receiving your returned item. You will be notified
          via email once your refund has been processed.
        </p>
        <p className="text-gray-600">
          <strong>Original Payment Method:</strong> Refunds will be issued to
          the original payment method used for the purchase.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Exchanges</h2>
        <p className="text-gray-600">
          If you need a different size or color, please return the original item
          and place a new order.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Contact Us</h2>
        <p className="text-gray-600">
          For any questions or concerns regarding your order or our return
          policy, please reach out to our customer service team at{" "}
          <Link
            to="mailto:support@bagbasket.com"
            className="text-blue-500 underline"
          >
            support@bagbasket.com
          </Link>
          .
        </p>
      </section>
    </div>
  );
};

export default ReturnsPolicy;
