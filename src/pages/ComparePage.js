import React, { useState, useEffect } from 'react'
import Header from '../components/Common/Header'
import SelectCoins from '../components/Compare/SelectCoins'
import SelectDays from '../components/Coin/SelectDays'
import { CoinObject } from '../functions/convertObject'
import { settingChartData } from '../functions/settingChartData'
import { getCoinPrices } from '../functions/getCoinPrices'
import { getCoinData } from '../functions/getCoinData'
import Loader from '../components/Common/Loader'
import List from '../components/Dashboard/List'
import CoinInfo from '../components/Coin/CoinInfo'
import LineChart from '../components/Coin/LineChart'
import TogglePriceType from '../components/Coin/PriceType'

function ComparePage() {
  const [crypto1, setCrypto1] = useState('bitcoin')
  const [crypto2, setCrypto2] = useState('ethereum')
  const [crypto1Data, setCrypto1Data] = useState({})
  const [crypto2Data, setCrypto2Data] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [days, setDays] = useState(30)
  const [priceType, setPriceType] = useState('prices')
  const [chartData, setChartData] = useState({})

  // Fetch coin data and prices
  async function getData() {
    setIsLoading(true)
    try {
      const [data1, data2] = await Promise.all([
        getCoinData(crypto1),
        getCoinData(crypto2),
      ])
      if (data1 && data2) {
        CoinObject(setCrypto1Data, data1)
        CoinObject(setCrypto2Data, data2)

        const [prices1, prices2] = await Promise.all([
          getCoinPrices(crypto1, days, priceType),
          getCoinPrices(crypto2, days, priceType),
        ])
        if (prices1.length > 0 && prices2.length > 0) {
          settingChartData(setChartData, prices1, prices2)
        }
      }
    } catch (error) {
      console.error('Error fetching coin data or prices:', error)
    }
    setIsLoading(false)
  }

  // Fetch data when coins or price type change
  useEffect(() => {
    getData()
  }, [crypto1, crypto2, days, priceType])

  // Handle coin selection change
  const handleCoinChange = async (event, isCoin2) => {
    setIsLoading(true)
    const selectedCoin = event.target.value
    if (isCoin2) {
      setCrypto2(selectedCoin)
    } else {
      setCrypto1(selectedCoin)
    }

    try {
      const [coinData1, coinData2] = await Promise.all([
        getCoinData(crypto1),
        getCoinData(crypto2),
      ])
      if (coinData1) {
        CoinObject(setCrypto1Data, coinData1)
      }
      if (coinData2) {
        CoinObject(setCrypto2Data, coinData2)
      }

      const [prices1, prices2] = await Promise.all([
        getCoinPrices(crypto1, days, priceType),
        getCoinPrices(crypto2, days, priceType),
      ])

      if (prices1.length > 0 && prices2.length > 0) {
        settingChartData(setChartData, prices1, prices2)
      }
    } catch (error) {
      console.error('Error fetching coin data or prices:', error)
    }
    setIsLoading(false)
  }

  // Handle days selection change
  const handleDaysChange = async (event) => {
    setIsLoading(true)
    setDays(event.target.value)
    try {
      const [prices1, prices2] = await Promise.all([
        getCoinPrices(crypto1, event.target.value, priceType),
        getCoinPrices(crypto2, event.target.value, priceType),
      ])
      settingChartData(setChartData, prices1, prices2)
    } catch (error) {
      console.error('Error fetching coin prices:', error)
    }
    setIsLoading(false)
  }

  // Handle price type change
  const handlePriceTypeChange = async (event, newType) => {
    setIsLoading(true)
    setPriceType(newType)
    try {
      const [prices1, prices2] = await Promise.all([
        getCoinPrices(crypto1, days, newType),
        getCoinPrices(crypto2, days, newType),
      ])
      settingChartData(setChartData, prices1, prices2)
    } catch (error) {
      console.error('Error fetching coin prices:', error)
    }
    setIsLoading(false)
  }

  return (
    <div>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="coins-days-flex">
            <SelectCoins
              crypto1={crypto1}
              crypto2={crypto2}
              handleCoinChange={handleCoinChange}
            />
            <SelectDays
              days={days}
              handleDaysChange={handleDaysChange}
              nopTag={true}
            />
          </div>
          <div className="grey-wrapper" style={{ padding: '0rem 1rem' }}>
            <List coin={crypto1Data} />
          </div>
          <div className="grey-wrapper" style={{ padding: '0rem 1rem' }}>
            <List coin={crypto2Data} />
          </div>
          <div className="grey-wrapper">
            <TogglePriceType
              priceType={priceType}
              handlePriceTypeChange={handlePriceTypeChange}
            />
            <LineChart chartData={chartData} priceType={priceType} multiAxis={true} />
          </div>
          <CoinInfo heading={crypto1Data.name} desc={crypto1Data.desc} />
          <CoinInfo heading={crypto2Data.name} desc={crypto2Data.desc} />
        </>
      )}
    </div>
  )
}

export default ComparePage
