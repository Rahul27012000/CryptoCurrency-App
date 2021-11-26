import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';

import { useGetExchangesQuery } from '../Services/cryptoApi';
import Loader from './Loader';

const { Text,Title } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  const exchangesList = data?.data?.exchanges;

  if (isFetching) return <Loader />;

  return (
    <>
    <Title level={3} style={{color:"#0071bd",textAlign:"center"}}>Tap on the Row for More Info!</Title>
      <Row>
        <Col span={24}>Exchanges (with Rank)</Col>
        
      </Row>
      <Row>
        {exchangesList.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Panel
                key={exchange.id}
                showArrow={true}
                header={(
                  <Row key={exchange.id}>
                    <Col span={24}>
                      <Text><strong>{exchange.rank}.</strong></Text>
                      <Avatar className="exchange-image" src={exchange.iconUrl} />
                      <Text><strong>{exchange.name}</strong></Text>
                    </Col>
                    
                  </Row>
                  )}
              >
                {
                 
                    <Row>
                    <Col span={8}><b>Exchange Volume:</b> ${millify(exchange.volume)}</Col>
                    <Col span={8}><b>Number Of Markets:</b>{millify(exchange.numberOfMarkets)}</Col>
                    <Col span={8}><b>Market Share:</b>{millify(exchange.marketShare)}%</Col>
                    </Row>
  
                }
                {
                    HTMLReactParser(exchange.description || 'No Description for this')
                }
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
