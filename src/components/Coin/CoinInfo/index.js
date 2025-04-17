import React, { useState } from 'react';
import "./styles.css";

function CoinInfo({ heading, desc }) {
  const [flag, setFlag] = useState(false);

  // Ensure desc is a valid string before using string methods
  const isValidDesc = typeof desc === 'string';

  const shortDesc = isValidDesc
    ? desc.slice(0, 350) + "<p style='color:var(--grey)'> Read More...</p>"
    : "";

  const longDesc = isValidDesc
    ? desc + "<p style='color:var(--grey)'> Read Less...</p>"
    : "";

  return (
    <div className='grey-wrapper' style={{ padding: "0rem 1rem" }}>
      <h2 className='coin-info-heading'>{heading}</h2>

      {isValidDesc ? (
        desc.length > 350 ? (
          <p
            onClick={() => setFlag(!flag)}
            className='coin-info-desc'
            dangerouslySetInnerHTML={{ __html: !flag ? shortDesc : longDesc }}
          />
        ) : (
          <p dangerouslySetInnerHTML={{ __html: desc }} />
        )
      ) : (
        <p style={{ color: 'var(--grey)' }}>No description available.</p>
      )}
    </div>
  );
}

export default CoinInfo;
