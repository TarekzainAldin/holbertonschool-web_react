import React from 'react';

const BodySectionWithMarginBottom = ({ title, children }) => {
  const style = {
    marginBottom: '40px',
  };

  return (
    <section style={style}>
      <h2>{title}</h2>
      {children}
    </section>
  );
};

export default BodySectionWithMarginBottom;
