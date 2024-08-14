import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import api from "../../api/index";
import QuantitySelector from "../../components/QuantitySelector/QuantitySelector"

function ProductDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);
  const emailId = JSON.parse(localStorage.getItem("userData"))?.email;

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const previousPath = location.state && location.state.previousPath;

  const handleConfirmOrder = () => {
    onBuyProduct();
  };
  console.log(product);

  useEffect(() => {
    api.product
      .getProduct(id)
      .then((response) => {
        setProduct(response);
      })
      .catch((error) => {
        console.error("Error fetching Product:", error);
      });
  }, []);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };


  const onBuyProduct = async () => {
    try {
      const response = await api.product.placeOrder({
        storeId: "abb6f236-39ca-4c9b-845e-ae68ffce8883",
        productId: id,
        quantity: quantity,
        orderPaymentMethod: "Cash on Demand",
        userId: JSON.parse(localStorage.getItem("userData"))?.userId
      });
      if (response) {
        toast.success("Order confirmed successfully!");
        const params = { emailId, product };
        const response = await fetch(
          "https://wfvot37zu3.execute-api.us-east-1.amazonaws.com/dev/send-notifications",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(params),
          }
        );
        const data = await response.json();

        navigate("/home");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="vstack">
      <ToastContainer />
      <div className="bg-white mb-4">
        <div className="container py-4">
          <div className="row gy-3 gx-4">
            <div className="col-lg-5">
              <div className="row">
                <div className="col-12">
                  <div className="ratio ratio-1x1">
                    <img
                      className="rounded"
                      src={product?.imageUrl}
                      width={150}
                      height={150}
                      alt="Product image."
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="d-flex">
                <div className="d-inline h2 mb-0 fw-semibold me-3">
                  {product?.productName}
                </div>
                <div className="ms-auto">
                  <button
                    className="btn btn-outline-secondary text-primary border"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Add to wish list"
                  >
                    <FontAwesomeIcon icon={["far", "heart"]} size="lg" />
                  </button>
                </div>
              </div>

              <div className="vstack">
                <div className="d-flex mb-3 gap-2 mt-2">
                  <span className="text-success small">
                    <FontAwesomeIcon icon={["fas", "check-circle"]} />
                    &nbsp;In Stock
                  </span>
                </div>
                <h4 className="fw-semibold">
                  ${product?.price}
                </h4>
                <p className="fw-light">{product?.productDescription}</p>
                <dl className="row mb-0">
                  <dt className="col-sm-3 fw-semibold">Code#</dt>
                  <dd className="col-sm-9">{id}</dd>
                  <dt className="col-sm-3 fw-semibold">Category</dt>
                  <dd className="col-sm-9">Dress</dd>
                  <dt className="col-sm-3 fw-semibold">Stock</dt>
                  <dd className="col-sm-9">{product?.stock}</dd>
                </dl>
                
                  <div>
                    <h6 className="fw-semibold">Select Quantity</h6>
                    <QuantitySelector
                      quantity={quantity}
                      handleQuantityChange={handleQuantityChange}
                    />
                  </div>
            
                <hr className="text-muted" />
                <div className="d-flex">
                 
                      <button
                        className="btn btn-primary px-md-4 col col-md-auto me-2"
                        style={{backgroundColor: "#1A2529", border: "none"}}
                        onClick={() => {
                          if (localStorage.getItem("token")) {
                            onBuyProduct();

                          } else {
                            // Redirect to the login page
                            window.location.href = "/login";
                          }
                        }}
                      >
                        Buy now
                      </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container"></div>
      <br />
    </div>
  );
}

export default ProductDetail;
