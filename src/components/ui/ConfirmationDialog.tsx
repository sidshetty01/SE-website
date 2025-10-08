import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  message?: string;
}

const ConfirmationDialog: React.FC<Props> = ({ open, onOpenChange, title = 'Submitted', message }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4 text-muted-foreground">
          {message && <p>{message}</p>}
          <div className="flex flex-col items-center">
            <img src="/images/whatsappLink.jpg" alt="WhatsApp QR" className="w-48 h-48 object-contain rounded-md shadow" />
            <p className="text-sm text-center mt-2">Scan this QR to join our WhatsApp group</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
