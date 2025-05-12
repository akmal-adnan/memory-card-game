import styles from '@/components/Dialog/styles.module.scss';
import { forwardRef } from 'react';

type Props = {
  children: React.ReactNode;
  toggleDialog: () => void;
  canClose: boolean;
};

const Dialog = forwardRef<HTMLDialogElement, Props>(
  ({ children, toggleDialog, canClose = true }, ref) => {
    return (
      <dialog
        className={styles.dialogWrapper}
        ref={ref}
        onClick={(e) => {
          if (e.currentTarget === e.target && canClose) {
            toggleDialog();
          }
        }}
      >
        <div className={styles.dialogContainer}>{children}</div>
      </dialog>
    );
  }
);
export default Dialog;
