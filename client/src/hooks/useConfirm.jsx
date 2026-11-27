import { useState } from 'react';
import { ConfirmationModal } from '../components/common/index.js';

/**
 * Promise-based confirmation. Pass confirmLabel/tone for non-destructive
 * confirmations so the action button never lies about what it will do.
 */
export const useConfirm = () => {
  const [confirmState, setConfirmState] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmLabel: undefined,
    cancelLabel: undefined,
    tone: 'danger',
    onConfirm: () => {},
    onCancel: () => {},
  });

  const confirm = ({
    title,
    message,
    confirmLabel,
    cancelLabel,
    tone = 'danger',
  }) =>
    new Promise((resolve) => {
      setConfirmState({
        isOpen: true,
        title,
        message,
        confirmLabel,
        cancelLabel,
        tone,
        onConfirm: () => {
          setConfirmState((previous) => ({ ...previous, isOpen: false }));
          resolve(true);
        },
        onCancel: () => {
          setConfirmState((previous) => ({ ...previous, isOpen: false }));
          resolve(false);
        },
      });
    });

  const ConfirmationModalWrapper = () => (
    <ConfirmationModal
      isOpen={confirmState.isOpen}
      title={confirmState.title}
      message={confirmState.message}
      confirmLabel={confirmState.confirmLabel}
      cancelLabel={confirmState.cancelLabel}
      tone={confirmState.tone}
      onConfirm={confirmState.onConfirm}
      onCancel={confirmState.onCancel}
    />
  );

  return { confirm, ConfirmationModalWrapper };
};

export default useConfirm;
