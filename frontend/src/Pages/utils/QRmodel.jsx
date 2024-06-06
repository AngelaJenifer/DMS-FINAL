import React from 'react';
import { Modal, Box, Button } from '@mui/material';
import QRCode from 'qrcode.react';

const QRmodal = ({ open, onClose, qrCodeData }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="qr-code-modal-title"
            aria-describedby="qr-code-modal-description"
        >
            <Box sx={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                width: 300, 
                bgcolor: 'background.paper', 
                boxShadow: 24, 
                p: 4, 
                textAlign: 'center' 
            }}>
                <h2 id="qr-code-modal-title">QR Code</h2>
                <QRCode value={qrCodeData} size={200} />
                <Box mt={2} closebutton>
                    <Button onClick={() => window.print()}>Print</Button>
                    <Button onClick={onClose} style={{color:"red"}}>Cancel</Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default QRmodal;
