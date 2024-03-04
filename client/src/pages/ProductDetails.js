import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();

  // Fetch product details
  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await axios.get(
          `/api/v1/product/get-product/${params.slug}`
        );
        setProduct(data?.product);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (params?.slug) {
      getProduct();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.slug]);

  useEffect(() => {
    //get similar product
    const getSimilarProduct = async () => {
      try {
        const { data } = await axios.get(
          `/api/v1/product/related-product/${product._id}/${product.category._id}`
        );
        setRelatedProducts(data?.products);
      } catch (error) {
        console.log(error);
      }
    };
    if (product._id && product.category?._id) {
      getSimilarProduct();
    }
  }, [product]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
    toast.success("Item Added to cart");
  };

  return (
    <Layout>
      <h2 className="mt-2 mb-3">Product Details</h2>
      <div className="row container">
        <div className="col-md-6">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <img
              src={`/api/v1/product/product-photo/${product._id}`}
              className="card-img-top img-fluid"
              style={{
                objectFit: "contain",
                width: "100%",
                height: "auto",
                maxHeight: "15rem",
              }}
              alt={product.name}
            />
          )}
        </div>
        <div className="col-md-6">
          <h2 className="text-center mb-2">Product Details</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <h6>Name : {product.name}</h6>
              <h6>Description : {product.description}</h6>
              <h6>Price : <i className="fa fa-inr"></i> {product.price}</h6>
              <h6>Category : {product.category.name}</h6>
              <button
                className="btn btn-secondary ms-1"
                onClick={() => addToCart(product)}
              >
                ADD TO CART
              </button>
            </>
          )}
        </div>
      </div>
      <div className="row container mt-4">
        <h2>Similar Products</h2>
        {relatedProducts.length < 1 && <p>No Similar Products Found</p>}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top img-fluid"
                style={{ objectFit: "contain", height: "15rem" }}
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0, 30)}</p>
                <p className="card-text"> <i className="fa fa-inr"></i> {p.price}</p>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  More Details
                </button>
                <button
                  className="btn btn-secondary ms-1"
                  onClick={() => addToCart(p)}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
