import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dropdown from "../../components/Dropdown/Dropdown";
import DropzoneComponent from "../../components/DropzoneComponent/DropzoneComponent";

import api from "../../api/index";



function AddProduct() {
  const [productName, setProductName] = useState("");
  const [price, setPrice]= useState("");
  const [stock, setStock]= useState("");
  const [productDescription, setProductDescription] = useState();

  const navigate = useNavigate();

  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
const product = {
    productName: productName,
    price: price,
    stock: stock,
    description: productDescription,
    storeId: "abb6f236-39ca-4c9b-845e-ae68ffce8883"
}
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = async () => {
      const base64Image = reader.result.split(',')[1];

      try {
        const response = await api.product.createProducts({
            productName: productName,
            price: price,
            stock: stock,
            description: productDescription,
            storeId: "abb6f236-39ca-4c9b-845e-ae68ffce8883",
            image: base64Image,
        });
        console.log('Product created successfully:', response.data);
        toast.success("Store created successfully!");
        navigate("/home");
      } catch (error) {
        console.error('Error creating store:', error);
      }
    };
  };


  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };


  return (
    <div className="container py-3">
      <ToastContainer />
      <div className="row g-3">
        <div className="col-lg-8">
          <div className="card border-1 shadow-sm">
            <div className="card-body">
              <form className="row g-3">
                <h4 className="fw-bold py-1 mb-0 row justify-content-center mt-2">Add Products to your Store</h4>

                <div className="fw-semibold mb-0">
                  <label className="form-label fw-semibold">Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={productName}
                    onChange={(e) => {
                      setProductName(e.target.value);
                    }}
                  />
                </div>

                <div className="col-md-4 fw-semibold mb-0">
                  <label className="form-label fw-semibold">Price (in CAD)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                </div>

                <div className="col-md-4 fw-semibold mb-0">
                  <label className="form-label fw-semibold">Stock</label>
                  <input
                    type="text"
                    className="form-control"
                    value={stock}
                    onChange={(e) => {
                      setStock(e.target.value);
                    }}
                  />
                </div>
        

                <h6 className="fw-semibold mb-0">About your Product</h6>
                <div>
                  <input type="textarea" className="form-control"  value={productDescription} onChange={(e) => {
                      setProductDescription(e.target.value);
                    }}/>
                </div>

                <div className="col-md-12">
                  <hr className="text-muted mb-0" />
                </div>

                <h6 className="fw-semibold mb-0">Add Product Images</h6>
                
          <input type="file" accept="image/*" onChange={handleImageChange} />
     

                <div className="col-md-12 mt-4">
                  <div className="d-grid gap-2 d-flex justify-content-end">
                    <Link href="/" onClick={handleSubmit}>
                      <a className="btn btn-primary w-100"
                    style={{backgroundColor: "#1A2529", border: "none"}}>Submit</a>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

export default AddProduct;
