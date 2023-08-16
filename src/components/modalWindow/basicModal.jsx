import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import UserForm from './userForm';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: '90vh',
  overflowY: 'scroll',
  bgcolor: '#ddd',
  border: 'none',
  borderRadius: '5px',
  boxShadow: 24,
  display: 'flex',
  p: 4,
};

AddModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
  };
  

export default function AddModal({ open, handleClose }) {
    

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <UserForm/>
        </Box>
      </Modal>
    </div>
  );
}
