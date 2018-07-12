import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';

export default function TextMaskPhone(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

TextMaskPhone.propTypes = {
  inputRef: PropTypes.func.isRequired,
};
