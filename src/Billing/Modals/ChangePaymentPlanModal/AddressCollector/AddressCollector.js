import 'react-phone-number-input/style.css';

import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import PhoneInput from 'react-phone-number-input';
import { useQuery } from 'react-query';
import Select from 'react-select';
import { Button } from 'simplexiar_react_components';
import * as Yup from 'yup';

import alertRedIcon from '../../../../Assets/icons/alertRedIcon.svg';
import { getBillingCountryOptions, getBillingProvinceOptions } from '../../../Services/axios/billing';
import { REACT_SELECT_KEYS } from '../ChangePaymentPlanModal';
import TextField from '../TextField/TextField';
import classes from './AddressCollector.module.css';

// TODO:Integrate Phone number code with Country dropdown

const AddressCollector = ({
  closeChangePaymentModal,
  setStep2,
  billingInfoCollector,
  setBillingInfoCollector,
  reactSelectStates,
  setReactSelectStates,
}) => {
  const customStyles = {
    control: (base) => ({
      ...base,
      minHeight: 40,
    }),
  };

  const yupValidation = Yup.object({
    firstName: Yup.string().required('A first name is required'),
    lastName: Yup.string().required('A last name is required'),
    companyName: Yup.string(),
    taxRegistrationNumber: Yup.string(),
    streetAddressLine1: Yup.string().required('Enter a valid address, including number and street name'),
    city: Yup.string().required('Enter a valid city'),
    postalCode: Yup.string().required('Enter a valid postal code'),
  });

  const [selectCountry, setSelectCountry] = useState({ value: 'CA', label: 'Canada' });
  const [selectProvince, setSelectProvince] = useState();
  const [phoneNumber, setPhoneNumber] = useState('');

  const [addressError, setAddressError] = useState(false);
  const [formData, setFormData] = useState();
  const [savedFormData, setSavedFormData] = useState();

  const [triggerSelectedCountryValidation, setTriggerSelectedCountryValidation] = useState(false);
  const [triggerSelectedProvinceValidation, setTriggerSelectedProvinceValidation] = useState(false);
  const [triggerSelectedPhoneNumberValidation, setTriggerSelectedPhoneNumberValidation] = useState(false);
  const [allowNextStep, setAllowNextStep] = useState(false);

  const countryDataOptions = [];
  const provinceDataOptions = [];

  useEffect(() => {
    if (!formData && Object.values(billingInfoCollector)?.join('')?.length > 0 && allowNextStep) {
      setFormData(billingInfoCollector);
      console.log('check billingInfoCollector', billingInfoCollector);
    }
  }, [formData, billingInfoCollector, allowNextStep]);

  console.log('check', formData, allowNextStep);

  useEffect(() => {
    if (formData && Object.values(billingInfoCollector)?.join(''?.length > 0)) {
      setStep2();
    }
  }, [formData, billingInfoCollector]);

  useEffect(() => {
    setSavedFormData(billingInfoCollector);
    setSelectCountry(reactSelectStates.countryData);
    setSelectProvince(reactSelectStates.provinceData);
    setPhoneNumber(reactSelectStates.phoneNumberData);
  }, []);

  const onCountryChange = (event) => {
    if (!event) return;
    setSelectCountry(event);
  };

  const onProvinceChange = (event) => {
    if (!event) return;
    setSelectProvince(event);
  };

  const getCountryOptions = () => countryDataOptions?.map((item) => ({ label: item?.name, value: item?.code }));

  const getProvinceOptions = () => {
    if (provinceDataOptions) return provinceDataOptions[0]?.name?.map((item) => ({ label: item, value: item }));
    return [];
  };

  const handleReactSelectValidations = () => {
    setTriggerSelectedCountryValidation(true);
    setTriggerSelectedProvinceValidation(true);
    setTriggerSelectedPhoneNumberValidation(true);
  };

  const handleFormSubmission = (values) => {
    if (
      !selectCountry ||
      !selectProvince ||
      !phoneNumber ||
      phoneNumber?.length < 12 ||
      phoneNumber?.length > 13
    ) {
      return;
    }
    console.log('values', values);
    setAllowNextStep(true);
    setFormData(values);
    setBillingInfoCollector(values);
    setReactSelectStates((prev) => ({
      ...prev,
      [REACT_SELECT_KEYS.phoneNumberData]: phoneNumber,
    }));
  };

  if (!savedFormData) return <p>Loading...</p>;

  return (
    <div className={classes.root}>
      <div className={classes.header}>Billing Information</div>
      <Scrollbars className={classes.hideHorizontalScroll}>
        <Formik
          initialValues={savedFormData}
          enableReinitialize
          validationSchema={yupValidation}
          onSubmit={handleFormSubmission}
        >
          {() => {
            return (
              <div className={`${classes.mt_20px}`}>
                <Form className={classes.flex_col_gap_10px}>
                  <div className={classes.flex_row}>
                    <TextField label='First Name' name='firstName' type='text' />
                    <TextField label='Last Name' name='lastName' type='text' />
                  </div>

                  <div className={classes.flex_row}>
                    <TextField label='Company Name' name='companyName' type='text' isOptional />
                    <TextField
                      label='Tax Registration Number'
                      name='taxRegistrationNumber'
                      type='text'
                      isOptional
                      placeholder='123456789 0123456'
                    />
                  </div>

                  <div className={classes.flex_col}>
                    <TextField
                      fullInputWidth
                      label='Street Address'
                      name='streetAddressLine1'
                      type='text'
                      placeholder='Line 1'
                      setAddressError={setAddressError}
                    />
                    <TextField
                      fullInputWidth
                      hideLabel
                      name='streetAddressLine2'
                      type='text'
                      placeholder='Line 2 (Optional)'
                    />
                  </div>

                  <div className={`${classes.flex_row} ${addressError && classes.addTopMargin}`}>
                    <div className={classes.flex_col_country}>
                      <label className={classes.label}>Country</label>
                      <Select
                        options={getCountryOptions()}
                        onChange={onCountryChange}
                        value={[selectCountry]}
                        className={`${classes.select_classes}
                      ${triggerSelectedCountryValidation && !selectCountry && classes.invalidSelectTag}`}
                        placeholder='Select Country'
                        styles={customStyles}
                        menuPlacement='top'
                      />
                      {triggerSelectedCountryValidation && !selectCountry && (
                        <div className={`${classes.only_flex_row}`}>
                          <img src={alertRedIcon} />
                          <div>Select a Country</div>
                        </div>
                      )}
                    </div>

                    <div className={classes.flex_col_country}>
                      <label className={classes.label}>Phone Number</label>
                      <div className={classes.phoneNumberRoot}>
                        <PhoneInput
                          international
                          defaultCountry={selectCountry?.value}
                          value={phoneNumber}
                          onChange={setPhoneNumber}
                          className={classes.phoneNumberInput}
                          placeholder='+1 123 456 7890'
                        />

                        {triggerSelectedPhoneNumberValidation &&
                          (!phoneNumber || phoneNumber?.length < 12 || phoneNumber?.length > 13) && (
                            <div className={`${classes.only_flex_row}`}>
                              <div className={classes.phoneNumberValidationImg}>
                                <img src={alertRedIcon} />
                              </div>

                              <div className={classes.phoneNumberValidation}>
                                Enter a number in the 222-333-4444 format{' '}
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>

                  <div className={classes.flex_row}>
                    <TextField name='city' type='text' label='City' width220 />

                    <div className={classes.flex_col_country}>
                      <label className={classes.label}>Province/State</label>
                      <Select
                        options={getProvinceOptions()}
                        onChange={onProvinceChange}
                        value={[selectProvince]}
                        className={`${classes.select_classes_province} 
                      ${triggerSelectedCountryValidation && !selectProvince && classes.invalidSelectTag}`}
                        placeholder='Select Province'
                        styles={customStyles}
                        menuPlacement='top'
                      />

                      {triggerSelectedProvinceValidation && !selectProvince && (
                        <div className={`${classes.only_flex_row}`}>
                          <img src={alertRedIcon} />
                          <div>Select a Province/State</div>
                        </div>
                      )}
                    </div>

                    <TextField name='postalCode' type='text' label='Postal/Zip Code' width135 />
                  </div>

                  <div className={classes.flex_row_buttons}>
                    <Button className={classes.cancelBtn} onClick={closeChangePaymentModal}>
                      Cancel
                    </Button>
                    <Button className={classes.continueBtn} type='submit' onClick={handleReactSelectValidations}>
                      Continue
                    </Button>
                  </div>
                </Form>
              </div>
            );
          }}
        </Formik>
      </Scrollbars>
    </div>
  );
};

export default AddressCollector;

AddressCollector.propTypes = {
  setStep2: PropTypes.func,
  setBillingInfoCollector: PropTypes.func,
  setReactSelectStates: PropTypes.func,
  closeChangePaymentModal: PropTypes.func,
  billingInfoCollector: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    companyName: PropTypes.string,
    taxRegistrationNumber: PropTypes.string,
    streetAddressLine1: PropTypes.string,
    streetAddressLine2: PropTypes.string,
    city: PropTypes.string,
    postalCode: PropTypes.string,
  }),
  reactSelectStates: PropTypes.shape({
    countryData: PropTypes.shape({ label: PropTypes.string, value: PropTypes.string }),
    provinceData: PropTypes.shape({ label: PropTypes.string, value: PropTypes.string }),
    phoneNumberData: PropTypes.string,
  }),
};
