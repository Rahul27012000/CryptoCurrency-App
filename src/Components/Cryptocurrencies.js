import React, { useState, useEffect } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Typography, Card, Row, Col, Input } from 'antd'
import { Loader } from './';

import { useGetCryptosQuery } from '../Services/cryptoApi'
const { Title } = Typography

const Cryptocurrencies = ({ simplified }) => {
    const count = simplified ? 10 : 100;
    const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState([])
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const filtered = cryptosList?.data?.coins.filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setCryptos(filtered)
    }, [cryptosList, searchTerm])
    //whenever one of the (cryptolist,searchterm) thing change then it will show 
    if (isFetching) return <Loader />
    return (
        <>

            {!simplified && (
                <>
                    <div>
                        <Title level={3} style={{color:"#0071bd",textAlign:"center"}}>Tap on the card for more info</Title>
                    </div>
                    <div className="search-crypto">
                        <Input placeholder="Search Cryptocurrency" onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                </>
            )}

            {/* gutters are spaces (Top-bott) (leftright) */}
            <Row gutter={[32, 32]} className="crypto-card-container">
                {cryptos?.map((currency) => (
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
                        <Link key={currency.id} to={`/crypto/${currency.id}`}>
                            <Card title={`${currency.rank}. ${currency.name}`} extra={<img className="crypto-image" src={currency.iconUrl} />} hoverable>
                                <p>Price: {millify(currency.price)}</p>
                                <p>Market Cap: {millify(currency.marketCap)}</p>
                                <p>Daily Change: {currency.change}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>

        </>
    )
}

export default Cryptocurrencies
