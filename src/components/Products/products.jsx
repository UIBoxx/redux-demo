import { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';



import { useSelector, useDispatch } from 'react-redux';
import { fetchProductData } from '../ReduxAction/apiAction';

export default function ProductCard() {
  const products = useSelector(state => state.productData.data.products) || [];
  const loading = useSelector(state => state.productData.loading);
  const error = useSelector(state => state.productData.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductData());
  }, [dispatch]);

  if (loading) {
    return <div className='load' style={{ fontSize: '3rem', color: 'red' }}>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
      

      <Card sx={{ width: '1000px', height: '100vh', overflow: 'scroll', display: 'flex', flexWrap: 'wrap' }}>
        {products.slice(0, 24).map(item => (
          <CardActionArea key={item.id} style={{ width: '200px', margin: '10px' }}>
            <CardMedia
              component="img"
              height="140"
              image={item.thumbnail}
              alt="green iguana"
              style={{ objectFit: 'cover' }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        ))}
      </Card>
  );
}
