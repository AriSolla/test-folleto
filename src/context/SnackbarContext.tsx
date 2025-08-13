import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface SnackbarContextType {
  showMessage: (
    message: string, 
    severity?: 'success' | 'error' | 'info' | 'warning',
    duration?: number
  ) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar debe usarse dentro de SnackbarProvider');
  }
  return context;
};

export function SnackbarProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('info');
  const [duration, setDuration] = useState<number>(3000);

  const showMessage = (msg: string, sev: typeof severity = 'info', duration?: number) => {
    setMessage(msg);
    setSeverity(sev);
    setDuration(duration ?? 3000); 
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ showMessage }}>
      {children}
      <Snackbar open={open} autoHideDuration={duration} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}
