import React, { useState } from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';
import { Loader } from './';
import { useGetCryptoNewsQuery } from '../Services/cryptonewsApi';
import { useGetCryptosQuery } from '../Services/cryptoApi'
const { Text, Title } = Typography;
const { Option } = Select;
const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';
const News = ({ simplified }) => {
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
    const { data } = useGetCryptosQuery(100);
    const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 20 });
    if (!cryptoNews?.value) return <Loader/>
    return (
        <Row gutter={[24, 24]}>
            {
                !simplified && (
                    <Col span={24}>
                        <Select showSearch
                            className="select-news"
                            placeholder="Select Crypto for News"
                            optionFilterProp="children"
                            onChange={(value) => setNewsCategory(value)}
                            filterOption={(i, option) => option.children.toLowerCase().indexOf(i.toLowerCase()) >= 0}
                        >
                            <Option value="Cryptocurrency">
                                Cryptocurrency
                            </Option>
                            {
                                data?.data?.coins.map((coin) => <Option value={coin.name}>{coin.name}</Option>)
                            }
                        </Select>
                    </Col>
                )}
            {cryptoNews.value.map((n, i) => (
                <Col xs={24} sm={12} lg={8} key={i}>
                    <Card hoverable className="news-card" style={{maxHeight:"500px"}}>
                        <a href={n.url} target="_blank" rel="noreferrer">
                            <div className="news-image-container">
                                <Title level={4} className="news-title">{n.name.length>60 ? `${n.name.substring(0, 60)}...` : n.name}</Title>
                                <img style={{ maxWidth: '200px', maxHeight: '100px' }} src={n?.image?.thumbnail?.contentUrl || demoImage} alt="newsimage" />
                            </div>
                            <p>
                                {n.description.length > 150 ? `${n.description.substring(0, 150)}...` : n.description}
                            </p>
                            <div className="provider-container">
                                <div>
                                    <Avatar src={n.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="avatar" />
                                    <Text className="provider-name">{n.provider[0]?.name}</Text>

                                </div>
                                <Text>{
                                    moment(n.datePublished).startOf('ss').fromNow()
                                }</Text>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))
            }
        </Row>
    )
}

export default News
