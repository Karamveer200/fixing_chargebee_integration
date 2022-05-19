import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

import AddressCollector from './AddressCollector/AddressCollector';
import classes from './ChangePaymentPlanModal.module.css';
import PaymentCollector from './PaymentCollector/PaymentCollector';
import PaymentConfirmation from './PaymentConfirmation/PaymentConfirmation';

export const BILLING_FORM_SCHEMA = {
  firstName: '',
  lastName: '',
  companyName: '',
  taxRegistrationNumber: '',
  streetAddressLine1: '',
  streetAddressLine2: '',
  city: '',
  postalCode: '',
};

export const BILLING_DATA_SCHEMA = {
  firstName: 'firstName',
  lastName: 'lastName',
  companyName: 'companyName',
  taxRegistrationNumber: 'taxRegistrationNumber',
  streetAddressLine1: 'streetAddressLine1',
  streetAddressLine2: 'streetAddressLine2',
  city: 'city',
  postalCode: 'postalCode',
};

export const REACT_SELECT_KEYS = {
  countryData: 'countryData',
  provinceData: 'provinceData',
  phoneNumberData: 'phoneNumberData',
};

const REACT_SELECT_DATA_SCHEMA = {
  [REACT_SELECT_KEYS.countryData]: { value: 'CA', label: 'Canada' },
  [REACT_SELECT_KEYS.provinceData]: { value: 'BC', label: 'British columbia' },
  [REACT_SELECT_KEYS.phoneNumberData]: null,
};

const ChangePaymentPlanModal = ({ showChangePaymentModal, closeChangePaymentModal }) => {
  const [billingInfoCollector, setBillingInfoCollector] = useState(BILLING_FORM_SCHEMA);
  const [reactSelectStates, setReactSelectStates] = useState(REACT_SELECT_DATA_SCHEMA);

  const TABS = {
    FIRST_STEP: 0,
    SECOND_STEP: 1,
    THIRD_STEP: 2,
  };

  const ref = useRef();
  const [currentTab, setCurrentTab] = useState(TABS.FIRST_STEP);

  useEffect(() => {
    setCurrentTab(TABS.FIRST_STEP);
  }, []);

  useEffect(() => {
    if (currentTab === TABS.THIRD_STEP && !showChangePaymentModal) setCurrentTab(TABS.FIRST_STEP);
  }, [showChangePaymentModal, currentTab]);

  console.log('currentTab', currentTab);
  const RenderSelectedTab = () => {
    if (currentTab === TABS.FIRST_STEP) {
      return (
        <AddressCollector
          closeChangePaymentModal={closeChangePaymentModal}
          setStep2={setStep2}
          billingInfoCollector={billingInfoCollector}
          setBillingInfoCollector={setBillingInfoCollector}
          reactSelectStates={reactSelectStates}
          setReactSelectStates={setReactSelectStates}
        />
      );
    }

    if (currentTab === TABS.SECOND_STEP) {
      return (
        <PaymentCollector
          setStep1={setStep1}
          setStep3={setStep3}
          billingInfoCollector={billingInfoCollector}
          reactSelectStates={reactSelectStates}
        />
      );
    }

    if (currentTab === TABS.THIRD_STEP) {
      return (
        <PaymentConfirmation
          closeChangePaymentModal={closeChangePaymentModal}
          billingInfoCollector={billingInfoCollector}
          reactSelectStates={reactSelectStates}
        />
      );
    }
  };

  const setStep1 = () => {
    setCurrentTab(TABS.FIRST_STEP);
  };

  const setStep2 = () => {
    setCurrentTab(TABS.SECOND_STEP);
  };

  const setStep3 = () => {
    setCurrentTab(TABS.THIRD_STEP);
  };

  const TrackSteps = () => {
    return (
      <div className={`${classes.flex_col} ${classes.mt_top_25px}`}>
        <div className={classes.flex_col}>
          <div
            className={`${classes.circle} 
            ${currentTab === TABS.FIRST_STEP && classes.activeCircle}
            ${currentTab !== TABS.FIRST_STEP && classes.activeCircleDone}
            `}
          />
          <div
            className={`${classes.stepsNumber} ${classes.firstStepNumber} 
          ${currentTab === TABS.FIRST_STEP && classes.activeText}
          ${currentTab !== TABS.FIRST_STEP && classes.activeCircleDoneTextNumber}`}
          >
            1
          </div>
          <div
            className={`${classes.stepsText} ${classes.firstStepText} 
           ${currentTab === TABS.FIRST_STEP && classes.activeText}
           ${currentTab !== TABS.FIRST_STEP && classes.activeCircleDoneText}`}
          >
            Billing Address
          </div>
        </div>

        <div
          className={`${classes.line}
        ${currentTab !== TABS.FIRST_STEP && classes.activeCircleDoneLine}`}
        />

        <div className={classes.flex_col}>
          <div
            className={`${classes.circle} 
          ${currentTab === TABS.SECOND_STEP && classes.activeCircle}
          ${currentTab !== TABS.FIRST_STEP && currentTab !== TABS.SECOND_STEP && classes.activeCircleDone}`}
          />

          <div
            className={`${classes.stepsNumber} ${classes.secondStepNumber} 
          ${currentTab === TABS.SECOND_STEP && classes.activeText}
          ${
            currentTab !== TABS.FIRST_STEP && currentTab !== TABS.SECOND_STEP && classes.activeCircleDoneTextNumber
          }`}
          >
            2
          </div>
          <div
            className={`${classes.stepsText} ${classes.secondStepText}
           ${currentTab === TABS.SECOND_STEP && classes.activeText}
           ${currentTab !== TABS.FIRST_STEP && currentTab !== TABS.SECOND_STEP && classes.activeCircleDoneText}`}
          >
            Credit Card
          </div>
        </div>

        <div
          className={`${classes.line}
        ${currentTab !== TABS.FIRST_STEP && currentTab !== TABS.SECOND_STEP && classes.activeCircleDoneLine}`}
        />

        <div className={classes.flex_col}>
          <div className={`${classes.circle}  ${currentTab === TABS.THIRD_STEP && classes.activeCircle}`} />
          <div
            className={`${classes.stepsNumber} ${classes.thirdStepNumber}
            ${currentTab === TABS.THIRD_STEP && classes.activeText}`}
          >
            3
          </div>
          <div
            className={`${classes.stepsText} ${classes.thirdStepText}
           ${currentTab === TABS.THIRD_STEP && classes.activeText}`}
          >
            Confirmation
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={classes.root} ref={ref}>
      <div className={classes.left_column}>
        <div className={classes.header}>Change Payment Information</div>
        <TrackSteps />
      </div>
      <RenderSelectedTab />
    </div>
  );
};

export default ChangePaymentPlanModal;

ChangePaymentPlanModal.propTypes = {
  showChangePaymentModal: PropTypes.bool,
  closeChangePaymentModal: PropTypes.func,
};
