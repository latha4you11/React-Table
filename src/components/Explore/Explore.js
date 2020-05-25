import React, { Fragment } from 'react'
import { Table, PageHeader } from 'antd'

import axiosWrapper from '../../axiosWrapper'
import Styles from './Explore.module.css'

class TableComponent extends React.Component {
  state = {
    data: [],
    pagination: {
      current: 1,
      pageSize: 100,
    },
    loading: false,
  }

  componentDidMount() {
    const { pagination } = this.state
    this.fetch({ pagination })
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.fetch({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination,
      ...filters,
    })
  }

  fetch = (params = {}) => {
    this.setState({ loading: true })
    axiosWrapper.get('funds.json').then((data) => {
      this.setState({
        loading: false,
        data: data.data.slice(0, 200),
        pagination: {
          ...params.pagination,
          total: 200
        },
      })
    })
  }

  handleDetailsRoute = data => {
    let match = this.state.data.filter(element => {
      return element.name === data
    });
    let params = match[0].code;
    this.props.history.push(`/${params}`)
  }

  render() {
    const { data, pagination, loading } = this.state
    const getDynamicOptions = (type) => {
      const uniqueArray = []
      const filteredData = []

      this.state.data.map((element) => {
        if (
          uniqueArray.indexOf(element[type]) === -1 &&
          element[type] !== undefined &&
          element[type] !== null
        ) {
          uniqueArray.push(element[type])
          filteredData.push({ text: element[type], value: element[type] })
        }
      })

      return filteredData
    }

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        render: name => {
          return(
            <Fragment>
              <div className={Styles.nameLink} onClick={() => this.handleDetailsRoute(name)}>{name}</div>
            </Fragment>
          )
        },
        sorter: (a, b) => {
          if (a.name < b.name) {
            return -1
          }
          if (a.name > b.name) {
            return 1
          }
          return 0
        },
        sortDirections: ['ascend', 'descend'],
      },
      {
        title: 'Fund Category',
        dataIndex: 'fund_category',
        filters: getDynamicOptions('fund_category'),
        sorter: (a, b) => {
          if (a.fund_category < b.fund_category) {
            return -1
          }
          if (a.fund_category > b.fund_category) {
            return 1
          }
          return 0
        },
        sortDirections: ['ascend', 'descend'],
        onFilter: (value, record) => {
          return record.fund_category === value
        },
      },
      {
        title: 'Fund Type',
        dataIndex: 'fund_type',
        filters: getDynamicOptions('fund_type'),
        onFilter: (value, record) => {
          return record.fund_type === value
        },
      },
      {
        title: 'Plan',
        dataIndex: 'plan',
        filters: getDynamicOptions('plan'),
        onFilter: (value, record) => {
          return record.plan === value
        },
      },
      {
        title: 'Year 1 returns',
        dataIndex: 'returns',
        render: (returns) => {
          return returns.year_1
        },
        sorter: (a, b) => a.returns.year_1 - b.returns.year_1,
        sortDirections: ['ascend', 'descend'],
      },
      {
        title: 'Year 3 returns',
        dataIndex: 'returns',
        render: (returns) => {
          return returns.year_3
        },
        sorter: (a, b) => a.returns.year_3 - b.returns.year_3,
        sortDirections: ['ascend', 'descend'],
      },
    ]
    return (
      <div className={Styles.root}>
        <PageHeader
          className={Styles.pageHeader}
          title="Kuvera Database"
        />
        <Table
          className={Styles.table}
          columns={columns}
          dataSource={data}
          pagination={pagination}
          loading={loading}
          onChange={this.handleTableChange}
        />
      </div>
    )
  }
}

export default TableComponent
