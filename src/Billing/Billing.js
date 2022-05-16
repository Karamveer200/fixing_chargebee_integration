/* eslint-disable no-unused-vars */
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';
import { Modal } from 'simplexiar_react_components';

import classes from './Billing.module.css';
import ChangePaymentPlanModal from './Modals/ChangePaymentPlanModal/ChangePaymentPlanModal';

const Billing = () => {
  const [showChangePaymentModal, setShowChangePaymentModal] = useState(false);
  const closeChangePaymentModal = () => {
    setShowChangePaymentModal(false);
  };

  return (
    <div className={classes.root}>
      <button className={classes.editPayment} onClick={() => setShowChangePaymentModal(true)}>
        Change Information
      </button>

      <Modal
        show={showChangePaymentModal}
        modalClosed={closeChangePaymentModal}
        className={classes.modalPaymentUpdater}
      >
        <div className={classes.closeIcon_paymentModal} onClick={closeChangePaymentModal}>
          <CloseIcon className={classes.closeIcon} />
        </div>
        <ChangePaymentPlanModal
          showChangePaymentModal={showChangePaymentModal}
          closeChangePaymentModal={closeChangePaymentModal}
        />
      </Modal>
    </div>
  );
};

export default Billing;
