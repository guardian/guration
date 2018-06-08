// @flow

import React, { type Node as ReactNode } from 'react';
import { PathContext } from './Context';

type FieldProps = {
  type: string,
  value: string | number | boolean,
  children: ReactNode
};

const Field = ({ type, value, children }: FieldProps) => (
  <PathContext.Consumer>
    {({ fields, ...pathContext }) => (
      <PathContext.Provider
        value={{
          ...pathContext,
          fields: { ...fields, [type]: value }
        }}
      >
        {children}
      </PathContext.Provider>
    )}
  </PathContext.Consumer>
);

export default Field;
