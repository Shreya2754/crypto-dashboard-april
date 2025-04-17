import React from 'react'
import "./styles.css"
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { Tooltip } from '@mui/material';
import { convertNumber } from '../../../functions/convertNumbers';
import { Link } from 'react-router-dom';

function List({ coin }) {
  const safeLocale = (num) =>
    typeof num === 'number' ? num.toLocaleString() : "N/A";

  return (
    <Link to={`/coin/${coin.id}`}>
      <tr className='list-row'>
        {/* Coin Logo */}
        <Tooltip title="Coin Logo">
          <td className='td-image'>
            <img
              src={coin?.image || "/default-logo.png"} // Fallback to default logo if not found
              alt={`${coin?.name || "Unknown Coin"} logo`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default-logo.png"; // Fallback in case of image error
              }}
              className='coin-logo'
            />
          </td>
        </Tooltip>

        {/* Coin Info */}
        <Tooltip title="Coin Info" placement='bottom-start'>
          <td>
            <div className='name-col'>
              <p className='coin-symbol'>{coin?.symbol || "N/A"}</p>
              <p className='coin-name'>{coin?.name || "Unknown Coin"}</p>
            </div>
          </td>
        </Tooltip>

        {/* Price Change */}
        <Tooltip title="Price Change In 24Hrs" placement='bottom-start'>
          <td className='chip-flex'>
            {typeof coin?.price_change_percentage_24h === 'number' ? (
              coin.price_change_percentage_24h > 0 ? (
                <>
                  <div className='price-chip'>
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </div>
                  <div className='icon-chip'>
                    <TrendingUpRoundedIcon />
                  </div>
                </>
              ) : (
                <>
                  <div className='price-chip chip-red'>
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </div>
                  <div className='icon-chip chip-red'>
                    <TrendingDownRoundedIcon />
                  </div>
                </>
              )
            ) : (
              <div className='price-chip'>N/A</div>
            )}
          </td>
        </Tooltip>

        {/* Current Price */}
        <Tooltip title="Current Price">
          <td>
            <h3
              className='coin-price td-center-align'
              style={{
                color:
                  coin?.price_change_percentage_24h < 0
                    ? "var(--red)"
                    : "var(--green)"
              }}
            >
              ${typeof coin?.current_price === "number" ? safeLocale(coin.current_price) : "N/A"}
            </h3>
          </td>
        </Tooltip>

        {/* Total Volume */}
        <Tooltip title="Total Volume" placement='bottom-end'>
          <td>
            <p className='total_volume td-right-align td-total-volume'>
              {safeLocale(coin?.total_volume)}
            </p>
          </td>
        </Tooltip>

        {/* Market Cap */}
        <Tooltip title="Market Cap">
          <td className='desktop-td-mkt'>
            <p className='total_volume td-right-align'>
              ${typeof coin?.market_cap === 'number' ? safeLocale(coin.market_cap) : "N/A"}
            </p>
          </td>
        </Tooltip>

        {/* Market Cap for Mobile */}
        <Tooltip title="Market Cap">
          <td className='mobile-td-mkt'>
            <p className='total_volume td-right-align'>
              ${typeof coin?.market_cap === 'number' ? convertNumber(coin.market_cap) : "N/A"}
            </p>
          </td>
        </Tooltip>
      </tr>
    </Link>
  );
}

export default List;
