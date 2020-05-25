import React, { useState, useEffect } from 'react'
import { PageHeader, Row, Col, Card } from 'antd'

import Styles from './Details.module.css'
import axiosWrapper from '../../axiosWrapper'

const Details = (props) => {
  const [details, setDetails] = useState({})
  let code = props.match.params.code
  useEffect(() => {
    fetchData(code)
  }, [])

  const fetchData = async (code) => {
    let response = await axiosWrapper.get(`/funds/${code}.json`)
    setDetails(response.data[0])
  }
  return (
    <React.Fragment>
      <PageHeader
        className={Styles.pageTitle}
        title={`Details of Fund with code ${code}`}
      />
      <div className={Styles.detailsRoot}>
        {/* <Row>
            <Col span={8} className={Styles.propertyName}>Fund Name:</Col>
            <Col span={16} className={Styles.propertyValue}>{details.name} </Col>
          </Row>
          <Row>
            <Col span={8} className={Styles.propertyName}>Fund Type</Col>
            <Col span={16} className={Styles.propertyValue}>{details.fund_type}</Col>
          </Row>
          <Row>
            <Col span={8} className={Styles.propertyName}>Fund Category</Col>
            <Col span={16} className={Styles.propertyValue}>{details.fund_category}</Col>
          </Row> */}
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Fund Name" bordered={true} className={Styles.propertyName}>
              {details.name}
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Fund Type" bordered={true} className={Styles.propertyName}>
              {details.fund_type}
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Fund Category" bordered={true} className={Styles.propertyName}>
              {details.fund_category}
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Crisil Rating" bordered={true} className={Styles.propertyName}>
              {details.crisil_rating}
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Fund Manager" bordered={true} className={Styles.propertyName}>
              {details.fund_manager}
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  )
}

export default Details
