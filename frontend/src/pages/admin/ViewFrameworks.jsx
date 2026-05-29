import React from 'react';
import RuleAndPolicies from '../RuleAndPolicies'; // 👈 Yeh bina kisi path/import error ke user wale logic ko reuse karega

const FrameworkPage = () => {
  return (
    <div style={{ width: '100%' }}>
      <RuleAndPolicies />
    </div>
  );
};

export default FrameworkPage;