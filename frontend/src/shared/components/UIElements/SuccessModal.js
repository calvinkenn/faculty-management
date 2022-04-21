import React from 'react';

import Modal from './Modal';
import Button from '../FormElements/Button';

const SuccessModal = props => {
  return (
    <Modal
      onCancel={props.onClear}
      header="Success!"
      show={!!props.success}
      footer={<Button onClick={props.onClear}>Close</Button>}
    >
      <p style={{color: 'green'}}>{props.success}</p>
    </Modal>
  );
};

export default SuccessModal;