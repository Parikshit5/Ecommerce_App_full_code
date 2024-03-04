import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [cart,setCart]=useCart();
  const navigate=useNavigate();

  //get all category
  const getAllCategory = async (req, res) => {
    try {
      const { data } = await axios.get(
        `/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategory();
    getTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //get filtered product

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `/api/v1/product/product-filters`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  //get Total Count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  //Load More
  useEffect(()=>{
    if(page===1) return;
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[page])

  //Load more
  const loadMore=async()=>{
    try {
      setLoading(true)
      const {data}=await axios.get(`/api/v1/product/product-list/${page}`)
      setLoading(false)
      setProducts([...products,...data.products])
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }


  //filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked, radio]);

  return (
    <Layout title={"All Products - Best offers"}>
      <img src="..\..\images\banner.png" alt="furniture banner" style={{
        width:"100%",
        height:"40vh"
        }}/>
      <div className="row mt-3">
        <div className="col-md-2 m-lg-3 border border p-3">
          <h5 className="text-center mt-2">Filter By Category</h5>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          {/*price filter */}
          <h5 className="text-center mt-4">Filter By Price</h5>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger mt-3"
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </button>
          </div>
        </div>
        <div className="col-md-9 ml-4">
          <h2 className="text-center">All Products</h2>
          <div className="d-flex flex-wrap m-lg-3">
            {products?.map((p) => (
             
                <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top img-fluid"
                    style={{
                      objectFit: "inherit",
                      width: "100%",
                      height: "205px",
                    }}
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      {p.description.substring(0, 30)}
                    </p>
                    <p className="card-text font-weight-bold" > <i className="fa fa-inr"></i> {p.price}</p>
                    <button className="btn btn-primary ms-1" onClick={()=>navigate(`/product/${p.slug}`)}>
                      More Details
                    </button>
                    <button className="btn btn-secondary ms-1"
                    onClick={()=>{
                      setCart([...cart,p])
                      localStorage.setItem('cart',JSON.stringify([...cart,p]))
                      toast.success('Item Added to cart')
                    }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-success"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Load more"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
