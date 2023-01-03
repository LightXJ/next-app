/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import styles from './index.module.scss';

interface Data {
  key: string,
  contractNumber: string,
  documentNumber: string,
  name: string
}

export default function Index(){
  type ColumnsProps = ColumnsType<Data>;

  const columns: ColumnsProps = [
    { title: '合同编号', dataIndex: 'contractNumber', key: 'contractNumber', align: 'left' as const, fixed: 'left' as const, width: 300 },
    { title: '单据编号', dataIndex: 'documentNumber', key: 'documentNumber', width: 300 },
    { title: '名称', dataIndex: 'name', key: 'name', align: 'left' as const, width: 300},
  ];

  const dataList = [
    {
      key: 'a',
      contractNumber: 'YC20200228上海浦江文化传媒有限公司',
      documentNumber: 'HTSP2020051000200001',
      name: '上海浦江文化传媒有限公司',
    },
    {
      key: 'b',
      contractNumber: 'YC20200228',
      documentNumber: 'HTSP2020051000200001',
      name: '上海浦江文化传媒有限公司',
    },
    {
      key: 'c',
      contractNumber: 'YC20200228',
      documentNumber: 'HTSP2020051000200001',
      name: '上海浦江文化传媒有限公司上海浦江文化传媒有限公司上海浦江文化传媒有限公司上海浦江文化传媒有限公司上海浦江文化传媒有限公司上海浦江文化传媒有限公司上海浦江文化传媒有限公司上海浦江文化传媒有限公司',
    },
  ];


  return (
    <div>
      <Table columns={columns} dataSource={dataList} scroll={{x: '100%'}} /> 

      <table className={`${styles.tableWrap}`}>
        <thead>
          <tr>
            {columns.map(item=>{
              return (
                <th key={item.key}>{item.title}</th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {dataList.map(dataItem=>{
            return (
              <tr key={dataItem.key}>
                {columns.map(cItem=>{
                  const curKey = cItem?.dataIndex || columns?.key;
                  return (
                    <td key={cItem.key}>{dataItem[curKey]}</td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}