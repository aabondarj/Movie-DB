import React from 'react';
import { Alert } from 'antd';

const onError = () => {

    return (
      <Alert
      message="An error has occurred"
      description="We apologize, something went wrong. We are already working on this!"
      type="error"
      closable
       />
    )
}

export default  onError;