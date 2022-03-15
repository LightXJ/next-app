import { Row, Col } from 'antd';

const style = { background: '#0092ff', padding: '8px 0', border: '1px solid white' };
export default function Index(){
  return (
    <>
    
      <Row>
        <Col xs={24} sm={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col xs={24} sm={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col xs={24} sm={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col xs={24} sm={6}>
          <div style={style}>col-6</div>
        </Col>
      </Row>

      {/* 什么都不设置的话 */}
      <Row>
        <Col>
          <div style={style}>col-6col-6col-6col-6</div>
        </Col>
        <Col>
          <div style={style}>col-6</div>
        </Col>
        <Col>
          <div style={style}>col-6</div>
        </Col>
        <Col>
          <div style={style}>col-6</div>
        </Col>
      </Row>

      <Row>
          <div style={style}>col-6col-6col-6col-6</div>
        <Col>
          <div style={style}>col-6</div>
        </Col>
        <Col>
          <div style={style}>col-6</div>
        </Col>
        <Col>
          <div style={style}>col-6</div>
        </Col>
      </Row>
    </>
  )
}