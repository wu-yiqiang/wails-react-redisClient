import { useEffect, useState } from 'react'
import { Button, Collapse, message, Popconfirm, Select } from 'antd'
const { Panel } = Collapse
import Connection from '../components/Connection'
import Setting from '../components/Setting'
import Keys from './Keys'
import Add from '../components/Add'
import { SettingFilled, DeleteFilled, CaretRightOutlined, RedoOutlined,EditFilled  } from '@ant-design/icons'
import { ConnectionList, ConnectionDelete, DbList, KeyList } from '../../wailsjs/go/main/App'
import { useForm } from 'antd/es/form/Form'
import '../style/pannel.css'
const formDatas = {
  identify: '',
  name: '',
  port: '',
  addr: '',
  username: '',
  password: ''
}
function Pannel(props: any) {
  const { setInfo, info } = props
  const [list, setList] = useState([])
  const [identify, setIdentify] = useState('')
  const [keys, setKeys] = useState([])
  const [db, setDb] = useState("")
  const [dbName, setDbName] = useState('')
  const [dbdata, setDbData] = useState([])
  const [forms, setForms] = useState({})
  const [open, setOpen] = useState(false)
  const [settingOpen, setSettingOpen] = useState(false)
  const [title, setTitle] = useState('新建连接')
  const [addOpen, setAddOpen] = useState(false)
  useEffect(() => {
    flush()
  }, [])
  const flush = async () => {
    const { data, code, msg } = await ConnectionList()
    if (code === 200) {
      setList(data)
      message.success('获取连接列表成功')
    } else {
      message.error(msg ? msg : '连接失败')
    }
  }
  const queryLink = async (key: string | string[]) => {
    if (!key.length) return
    setIdentify(key[0])
    const { code, data, msg } = await DbList(key[0])
    if (code === 200) {
      setDbData(
        data.map((d: any) => {
          return { value: d.key, label: `${d.key} (${d.number})` }
        })
      )
      setDb(data[0].key)
    } else {
      setDbData([])
      setDb("")
      message.error(msg)
    }
  }
  const createLink = () => {
    handleTitle('新建连接')
    setForms(formDatas)
    setOpen(true)
  }

  const handleOpen = (value: boolean) => {
    setOpen(value)
  }

  const handleTitle = (value: string) => {
    setTitle(value)
  }
  
  const handleSettingOpen = (value: boolean) => {
    
    setSettingOpen(value)
  }

  const handleAddOpen = (value: boolean) => {
    if (value && !info?.identify) return message.warning('请先选择DB')
    setAddOpen(value)
  }

  const handleDelete = async (values: any) => {
    const { data, code, msg } = await ConnectionDelete(values)
    if (code === 200) {
      message.success(msg)
      flush()
    } else {
      message.error(msg)
    }
  }

  const openAdd = () => {
    
    handleAddOpen(true)
  }
  const cancel = (event: any) => {
    event.stopPropagation()
  }
  
  const handleChangeDb = async (value: string, identify: string) => {
    const { data, code, msg } = await KeyList({ conn_identify: identify, db: parseInt(value.slice(2)), keyword: '' })
    setDbName(value)
    setInfo({ identify: identify, db: parseInt(value.slice(2)) })
    if (code === 200) {
      setKeys(data)
      
    } else {
      setKeys([])
      message.error(msg)
    }
  }
  const genExtra = (values: any) => (
    <>
      <EditFilled
        onClick={(event) => {
          handleTitle('编辑连接')
          setForms(values)
          handleOpen(true)
          event.stopPropagation()
        }}
      />
      <RedoOutlined
        style={{ margin: '0 5px' }}
        onClick={(event) => {
          queryLink([values.identify])
          event.stopPropagation()
        }}
      />
      <Popconfirm title="确认删除该连接？" placement="bottom" onConfirm={() => handleDelete(values)} onCancel={(event) => cancel(event)} okText="确认" cancelText="取消">
        <DeleteFilled onClick={(event) => event.stopPropagation()} />
      </Popconfirm>
    </>
  )
  return (
    <div className="pannel">
      <div className="btns">
        <Button type="primary" onClick={createLink}>
          新建连接
        </Button>
        <Button onClick={flush} icon={<RedoOutlined />}></Button>
        <Button onClick={() => handleSettingOpen(true)} icon={<SettingFilled />}></Button>
      </div>
      <Collapse onChange={queryLink} ghost accordion expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} style={{ background: '#f5f5f5' }} />}>
        {list.length &&
          list.map((item: any) => {
            return (
              <Panel header={item.name} key={item.identify} extra={genExtra(item)}>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <Select defaultValue={db} style={{ width: '50%' }} onChange={(value) => handleChangeDb(value, item.identify)} options={dbdata} />
                  <Button style={{ width: '50%', marginLeft: '10px' }} onClick={() => openAdd()}>
                    New Key
                  </Button>
                </div>
                <div className="keys">
                  <Keys keyList={keys} db={dbName} identify={identify} setInfo={setInfo} />
                </div>
              </Panel>
            )
          })}
      </Collapse>
      <Connection open={open} handleOpen={handleOpen} title={title} flush={flush} forms={forms} />
      <Setting open={settingOpen} handleOpen={handleSettingOpen} />
      <Add open={addOpen} handleOpen={handleAddOpen} info={ info } />
    </div>
  )
}

export default Pannel
