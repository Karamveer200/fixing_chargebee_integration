/* eslint-disable no-unused-vars */
import { CardComponent, CardCVV, CardExpiry, CardNumber } from '@chargebee/chargebee-js-react-wrapper';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PropTypes from 'prop-types';
import React, { useRef, useState, useEffect } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { Button } from 'simplexiar_react_components';

import alertRedIcon from '../../../../Assets/icons/alertRedIcon.svg';
import { getBillingPaymentIntent } from '../../../Services/axios/billing';
import { BILLING_DATA_SCHEMA, REACT_SELECT_KEYS } from '../ChangePaymentPlanModal';
import classes from './PaymentCollector.module.css';

// Google Fonts and other whitelisted fonts
const FONTS = ['https://fonts.googleapis.com/css2?family=Montserrat&display=swap'];
// Style customizations
const STYLES = {
  base: {
    fontWeight: 600,
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '16px',
    fontSmoothing: 'antialiased',

    ':focus': {
      color: '#2d3a47',
    },

    '::placeholder': {
      color: '#9BACC8',
    },

    ':focus::placeholder': {
      color: '#CFD7DF',
    },
  },
};

const PaymentCollector = ({ setStep1, setStep3, billingInfoCollector, reactSelectStates }) => {
  const ref = useRef(null);
  const ref_2 = useRef(null);
  const [nameOnCard, setNameOnCard] = useState('');

  const [triggerNameValidation, setTriggerNameValidation] = useState(false);
  const [cardNumberError, setCardNumberError] = useState(null);
  const [cardExpiryError, setCardExpiryError] = useState(null);
  const [cardCVVError, setCardCVVError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  window.Chargebee.init({
    site: 'simplyask-test',
    publishableKey: 'test_5GzhKOsqV3zM2qA4t7TxlqC4GzQFIcuUv',
  });

  const handleValidations = async (e) => {
    setTriggerNameValidation(true);

    if (e) e.preventDefault();

    if (ref) {
      try {
        const getPaymentIntent = await getBillingPaymentIntent();

        console.log('getPaymentIntent', getPaymentIntent);

        if (getPaymentIntent) {
          if (getPaymentIntent && ref) {
            ref.current
              .authorizeWith3ds(getPaymentIntent, {
                billingAddress: {
                  firstName: 'Test',
                  lastName: 'Chargebee',
                  addressLine1: '3406 Creekside Lane',
                  addressLine2: 'Surf',
                  addressLine3: '',
                  city: 'Surf',
                  state: 'California',
                  stateCode: 'CA',
                  countryCode: 'US',
                  zip: '93455',
                },
              })
              .then((res) => {
                console.log('res', res);
                setStep3();
              })
              .catch((err) => {
                console.log('authorizeWith3ds Failed with error - ', err);
              });
          }
        }
      } catch (error) {
        console.log('error 2', error);
      }
    }
  };

  const handleCardNumberError = (e) => {
    setCardNumberError(e.error);
  };

  const handleCardExpiryError = (e) => {
    setCardExpiryError(e.error);
  };

  const handleCardCVVError = (e) => {
    setCardCVVError(e.error);
  };

  const goToPreviousStep = () => {
    setStep1();
  };

  const NoteDiv = () => {
    return (
      <div className={classes.noteDivRoot}>
        <div>
          <InfoOutlinedIcon className={classes.infoIcon} />
        </div>
        <div className={classes.flex_col_between}>
          <div className={classes.noteText}>
            We will not charge for usage below SimplyAsk Free Tier Limits. We may temporarily hold ~$1 CAD/USD/EUR
            as a pending transaction for 3-5 days to verify your identify.
          </div>
          <div className={classes.noteText}>
            You may be redirected to your bank’s website to authorize the payment information change for identity
            verification.
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className={classes.root} ref={ref_2}>
      <div className={classes.header}>Credit Card Information</div>
      <Scrollbars className={classes.hideHorizontalScroll}>
        <div className={`${classes.mt_20px}`}>
          <div className='ex1-wrap'>
            <div className='ex1-fieldset'>
              <div className={`ex1-field ${classes.flex_col_no_gap}`}>
                <label className={`ex1-label ${classes.label}`}>Name on Card</label>
                <input
                  name='firstName'
                  className={`ex1-input ${classes.input} ${classes.mt_5}`}
                  type='text'
                  value={nameOnCard}
                  onChange={(e) => setNameOnCard(e.target.value)}
                />
                <i className='ex1-bar' />
                {triggerNameValidation && nameOnCard.length < 1 && (
                  <div className={`${classes.only_flex_row}`}>
                    <img src={alertRedIcon} alt='' />
                    <div>A valid name, as it appears on the credit card, is required</div>
                  </div>
                )}
              </div>

              <CardComponent
                ref={ref}
                className={`${classes.font_size} fieldset field`}
                fonts={FONTS}
                styles={STYLES}
              >
                <div className={`ex1-field ${classes.flex_col} ${classes.mt_20px}`}>
                  <label className={`ex1-label ${classes.label}`}>Card Number</label>
                  <CardNumber
                    className={`ex1-input ${classes.input}`}
                    placeholder='1234 1234 1234 1234'
                    onChange={handleCardNumberError}
                  />
                  <i className='ex1-bar' />
                  {cardNumberError && (
                    <div className={`${classes.only_flex_row}`}>
                      <img src={alertRedIcon} alt='' />
                      <div>A valid card number, in the 1234 1234 1234 1234, format is required</div>
                    </div>
                  )}
                </div>
                <div className={`${classes.flex_row_between} ${classes.mt_20px} ${classes.pt_3} ex1-fields`}>
                  <div className={`ex1-field ${classes.flex_col}`}>
                    {/* Card expiry field */}
                    <label className={`ex1-label ${classes.label}`}>Expiry</label>
                    <CardExpiry
                      className={`ex1-input ${classes.halfWidthInput}`}
                      onChange={handleCardExpiryError}
                    />
                    <i className='ex1-bar' />
                    {cardExpiryError && (
                      <div className={`${classes.only_flex_row}`}>
                        <div className={classes.pt_3}>
                          <img src={alertRedIcon} alt='' />
                        </div>
                        <div>An expiry date, in MM / YY, format is required</div>
                      </div>
                    )}
                  </div>
                  <div className={`ex1-field ${classes.flex_col}`}>
                    {/* Card cvv field */}
                    <label className={`ex1-label ${classes.label}`}>CVC</label>
                    <CardCVV className={`ex1-input ${classes.halfWidthInput}`} onChange={handleCardCVVError} />
                    <i className='ex1-bar' />
                    {cardCVVError && (
                      <div className={`${classes.only_flex_row}`}>
                        <div className={classes.pt_3}>
                          <img src={alertRedIcon} alt='' />
                        </div>
                        <div>A security code, in the 123 format, is required</div>
                      </div>
                    )}
                  </div>
                </div>
              </CardComponent>
            </div>
          </div>

          <NoteDiv />

          <div className={classes.flex_row_buttons}>
            <Button className={classes.cancelBtn} onClick={goToPreviousStep}>
              Previous Step
            </Button>
            <Button className={classes.continueBtn} type='submit' onClick={handleValidations}>
              Confirm Information
            </Button>
          </div>
        </div>
      </Scrollbars>
    </div>
  );
};

export default PaymentCollector;

PaymentCollector.propTypes = {
  setStep1: PropTypes.func,
  setStep3: PropTypes.func,
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
