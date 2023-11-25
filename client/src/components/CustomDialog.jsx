import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { DialogContent } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DetailedProduct from './DetailedProduct';
import EditProduct from './EditProduct';

function CustomDialog (props) {
    const { onClose, selectedValue, open, name } = props;

    const handleClose = () => {
        onClose();
    }

    return (
        <Dialog
            onClose={handleClose}
            open={open}
            sx={{
            "& .MuiDialog-container": {
                "& .MuiPaper-root": {
                    width: "100%",
                    maxWidth: "65%",  
                    minWidth: "280px",
                },
            },
        }}>
            <DialogTitle>{selectedValue !== null && selectedValue?.name}</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers={true}>
                {
                    name === 'DetailedProduct' ?
                        <DetailedProduct product={selectedValue} onClose={() => handleClose()} />
                        :
                        <EditProduct product={selectedValue} onClose={() => handleClose()} />
                }
            </DialogContent>
        </Dialog>
    );
}

CustomDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string,
    name: PropTypes.string
};

export default CustomDialog;