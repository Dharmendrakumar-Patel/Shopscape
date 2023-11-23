import { useState } from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, Button } from '@mui/material';
import CustomDialog from '../components/CustomDialog';

export default function CustomCard ({ product }) {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedValue(null);
    };

    const handleView = (product) => {
        setSelectedValue(product)
        handleClickOpen()
    }

    return (
        <>
            <Card sx={{ maxWidth: '100%' }}>
                <CardActionArea onClick={() => handleView(product)}>
                    <CardMedia
                        component="img"
                        image={product?.photos[0].url}
                        alt={product?.name}
                        className='object-cover h-[200px] w-[auto]'
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {product?.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {product?.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <div className='w-full p-1'> 
                        <Button size="small" className='float-right cursor-pointer' onClick={() => handleView(product)} >View More</Button>
                    </div>
                </CardActions>
            </Card>
            <CustomDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
                name="DetailedProduct"
                className='w-[60%] h-[80%]'
            />
        </>
    );
}

CustomCard.propTypes = {
    product: PropTypes.object.isRequired,
};