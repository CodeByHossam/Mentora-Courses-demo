import React from 'react';
import Button from './Button';
import Modal from './Modal';

/**
 * Confirmation dialog with an action-specific label and tone. Destructive is
 * the default because every current call site deletes data, but non-destructive
 * confirmations can opt into the primary tone.
 */
const ConfirmationModal = ({
  isOpen,
  title = 'Please confirm',
  message,
  confirmLabel,
  cancelLabel = 'Cancel',
  tone = 'danger',
  onConfirm,
  onCancel,
}) => {
  const label = confirmLabel || (tone === 'danger' ? 'Delete' : 'Confirm');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title={title}
      description={message}
      ariaLabel={title}
    >
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="secondary" onClick={onCancel}>
          {cancelLabel}
        </Button>
        <Button
          variant={tone === 'danger' ? 'danger' : 'primary'}
          onClick={onConfirm}
        >
          {label}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
