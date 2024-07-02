import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({open,setOpen}) {
  

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   return (
      <>
         <Dialog
            open={open}
            onClose={handleClose}
            sx={{
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
            }}
         >
            <DialogContent
               sx={{
                  background: 'green',
                  width: '200px',
                  height: '100px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
               }}
            >
               <DialogContentText
                  id="alert-dialog-description"
                  sx={{ color: 'white', textAlign: 'center' }}
               >
                  Curso Completado Felicitaciones....
               </DialogContentText>
            </DialogContent>
         </Dialog>
      </>
   );
}