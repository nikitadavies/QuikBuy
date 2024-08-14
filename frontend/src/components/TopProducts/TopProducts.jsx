import React, { useEffect, useState } from 'react';
import './TopProducts.css';
import api from "../../api/index";
import {  useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function TopProducts() {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
      const fetchProducts = async () => {
          try {
            setLoading(true);
              const response = await api.product.getProducts();
              if (response) {
                  setProducts(response);
              }
          } catch (error) {
              console.error('Error fetching events:', error);
          } finally {
              setLoading(false);
          }
      };
      fetchProducts();
  }, []);
  return (
    <section className="top-stores">
        <h2>Our Top Products</h2>
        <div className="brand-cards">
          {products?.map((product, index) => (
            <>
            <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 340 }}
              image={product.imageUrl}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.productName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
              {product.productDescription}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => {navigate(`/product/${product.productId}`)}}>View Product</Button>
            </CardActions>
          </Card>
          </>
          ))}
        </div>
      </section>
  );
}

export default TopProducts;
