import Dialog from '@/components/Dialog/Dialog';
import { useRef } from 'react';

export const useDialog = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const toggleDialog = () => {
    if (!dialogRef.current) return;

    if (dialogRef.current.hasAttribute('open')) {
      dialogRef.current.close();
    } else {
      dialogRef.current.showModal();
    }
  };

  return { dialogRef, toggleDialog, Dialog };
};
