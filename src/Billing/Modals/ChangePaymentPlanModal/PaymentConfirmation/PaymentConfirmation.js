import PropTypes from 'prop-types';
import React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { Button } from 'simplexiar_react_components';

import successOrangeIcon from '../../../../Assets/icons/successOrangeIcon.svg';
import { BILLING_DATA_SCHEMA, REACT_SELECT_KEYS } from '../ChangePaymentPlanModal';
import classes from './PaymentConfirmation.module.css';

const PaymentConfirmation = ({
  closeChangePaymentModal,
  billingInfoCollector,
  reactSelectStates,
}) => {
  return (
    <div className={classes.root}>
      <Scrollbars className={classes.hideHorizontalScroll}>
        <div className={classes.header}>
          <img src={successOrangeIcon} className={classes.successImage} />
          <div className={classes.paymentConfirmStatus}>Success!</div>
          <div className={classes.paymentConfirmInfo}>Your payment information has been successfully changed.</div>
        </div>
        <div className={classes.paymentConfirmBody}>
          <div className={classes.left_grid}>
            <div className={classes.paymentTitle}>Old Payment Information</div>
            <div className={classes.billingInfoRoot}>
              <div className="">
                Billy Bob
              </div>
              <div className="">Awesome Company</div>
              <div className="">123456789</div>
              <div className="">+1 222-333-4444</div>
              <div className="">1111 Street St.</div>
              <div className="">Vancouver, BC, V0V 0V0</div>
              <div className="">Canada</div>
              {' '}

            </div>

            <div className={classes.cardInfoRoot}>
              <img src="" alt="" className={classes.paymentImg} />
              <div className="">
                Billy Bob
              </div>
              <div className=""> xxxx-xxx-xxxx-1234</div>
              <div className="">123456789</div>
              <div className="">02/22</div>
              <div className="">123</div>
            </div>
          </div>
          <div className={classes.right_grid}>
            <div className={classes.paymentTitle}>New Payment Information</div>
            <div className={classes.billingInfoRoot}>
              <div className="">
                {`${billingInfoCollector?.[BILLING_DATA_SCHEMA.firstName]} ${billingInfoCollector?.[BILLING_DATA_SCHEMA.lastName]}`}
              </div>
              <div className="">{`${billingInfoCollector?.[BILLING_DATA_SCHEMA.companyName]}`}</div>
              <div className="">{`${billingInfoCollector?.[BILLING_DATA_SCHEMA.taxRegistrationNumber]}`}</div>
              <div className="">{`${reactSelectStates?.[REACT_SELECT_KEYS.phoneNumberData]}`}</div>
              <div className="">{`${billingInfoCollector?.[BILLING_DATA_SCHEMA.streetAddressLine1]}`}</div>
              <div className="">
                {`${billingInfoCollector?.[BILLING_DATA_SCHEMA.city]}, 
              ${reactSelectStates?.[REACT_SELECT_KEYS.provinceData]?.label}, 
             `}

              </div>
              <div className="">{` ${billingInfoCollector?.[BILLING_DATA_SCHEMA.postalCode]}, ${reactSelectStates?.[REACT_SELECT_KEYS.countryData]?.label}`}</div>

            </div>

            <div className={classes.cardInfoRoot}>
              <img src="" alt="" className={classes.paymentImg} />
              <div className="">
                Billy Bob
              </div>
              <div className=""> xxxx-xxx-xxxx-1234</div>
              <div className="">123456789</div>
              <div className="">02/22</div>
              <div className="">123</div>

            </div>
          </div>
        </div>

      </Scrollbars>
      <div className={classes.flex_row_buttons}>
        <Button className={classes.continueBtn} type="submit" onClick={closeChangePaymentModal}>
          Return to Billing
        </Button>
      </div>
    </div>
  );
};

export default PaymentConfirmation;

PaymentConfirmation.propTypes = {
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
