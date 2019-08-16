import React from 'react';
import get from 'lodash/get';
import TypeResolver from './resolver/TypeResolver';
const LinkedItem = ({ linkedItem, resolveFunc }) => {
  const type = get(linkedItem, 'system.type');
  return <TypeResolver resolveFunc={resolveFunc} linkedItem={linkedItem} type={type}></TypeResolver>
};

export default LinkedItem;