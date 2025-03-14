import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};


export default function ConfirmModal({show, title,body ,handlerAgree, handlerDisagree,data}) {
  const {t} = useTranslation()
  return (
    <div>
    
      <Modal
        open={show}
        // onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">{title}</h2>
          <p id="parent-modal-description">
            {body} 
          </p>

          <Box  sx={{display:"flex",flexDirection:"row", justifyContent:"space-around"}} >
          <Button onClick={handlerDisagree} color="secondary" >{t('btn_undo')}</Button>
          <Button onClick={()=>handlerAgree(data.id)} color="error" >{t('btn_run')}</Button>
          </Box>
        
        </Box>
      </Modal>
    </div>
  );
}