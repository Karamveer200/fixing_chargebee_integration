import { useField } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import alertRedIcon from '../../../../Assets/icons/alertRedIcon.svg';
import classes from './TextField.module.css';

const TextField = ({
  label,
  hideLabel = false,
  isOptional = false,
  fullInputWidth = false,
  width220 = false,
  width135 = false,
  setAddressError = () => {},
  ...props
}) => {
  const [field, meta] = useField(props);

  useEffect(() => {
    if (meta?.error && field.name === 'streetAddressLine1') {
      setAddressError(true);
    } else setAddressError(false);
  }, [meta?.error, field.name]);

  return (
    <div className={`${classes.flex_col}`}>
      {!hideLabel && !isOptional && (
        <label className={classes.label} htmlFor={field.name}>
          {label}
        </label>
      )}

      {isOptional && (
        <div className={classes.flex_row}>
          <label className={classes.label} htmlFor={field.name}>
            {label}
          </label>
          <span className={classes.optionalSpan}>(Optional)</span>
        </div>
      )}

      <input
        autoComplete='off'
        className={`${classes.input}
         ${fullInputWidth && classes.fullInputWidth}
         ${width220 && classes.width220}
         ${width135 && classes.width135}
         ${meta?.error && meta.touched && classes.invalidRedBorder}
         ${meta?.error && meta.touched && field.name === 'streetAddressLine1' && classes.fixAddressInputPosition}`}
        {...props}
        {...field}
      />

      {meta?.error && meta.touched && (
        <div
          className={`${classes.flex_row} 
        ${field.name === 'postalCode' && classes.addMaxWidth}
        ${field.name === 'streetAddressLine1' && classes.fixAddressErrorPosition}`}
        >
          <div className=''>
            <img src={alertRedIcon} />
          </div>
          <div>{meta?.error}</div>
        </div>
      )}
    </div>
  );
};

export default TextField;

TextField.propTypes = {
  label: PropTypes.string,
  hideLabel: PropTypes.bool,
  isOptional: PropTypes.bool,
  fullInputWidth: PropTypes.bool,
  width220: PropTypes.bool,
  width135: PropTypes.bool,
  setAddressError: PropTypes.func,
};
