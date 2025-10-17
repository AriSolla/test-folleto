import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Alert } from "@mui/material";
import { useFlyer } from "../../context/FlyerContext";

interface PopupProps {
  open: boolean;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ open, onClose }) => {
  const { flyer } = useFlyer();

    
    
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>{flyer.notice?.title}</DialogTitle>
      <DialogContent>
        <Alert severity={"success"} variant="standard">
          {flyer.notice?.message}
        </Alert>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Popup;
