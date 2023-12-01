import { useEffect, useState } from 'react'
import { Button, Collapse, message } from 'antd'
const { Panel } = Collapse
import Connection from '../components/Connection'
import { SettingFilled, DeleteFilled } from '@ant-design/icons'
import { ConnectionList, ConnectionDelete } from '../../wailsjs/go/main/App'
import { useForm } from 'antd/es/form/Form'
const formDatas = {
  identify: '',
  name: '',
  port: '',
  username: '',
  password: ''
}
function Pannel() {
  const [list, setList] = useState([])
  const [forms, setForms] = useState({})
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('新建连接')
  useEffect(() => {
    flush()
  }, [])
  const flush = async () => {
    const { data, code, msg } = await ConnectionList()
    if (code === 200) {
      setList(data)
    } else {
      message.error(msg ? msg : '连接失败')
    }
  }
  const onChange = (key: string | string[]) => {
    console.log(key)
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

  const handleDelete = async (values: any) => {
    const { data, code, msg } = await ConnectionDelete(values)
    if (code === 200) {
      message.success(msg)
      flush()
    } else {
      message.error(msg)
    }
  }

  const genExtra = (values: any) => (
    <>
      <SettingFilled
        onClick={(event) => {
          handleTitle('编辑连接')
          setForms(values)
          handleOpen(true)
          event.stopPropagation()
        }}
      />
      <DeleteFilled
        onClick={(event) => {
          handleDelete(values)
          event.stopPropagation()
        }}
        style={{ marginLeft: 5, color: '#ff4d4f' }}
      />
    </>
  )
  return (
    <>
      <Button type="primary" onClick={createLink} style={{ marginBottom: '10px' }}>
        创建连接
      </Button>
      <Collapse onChange={onChange} ghost>
        {list.length &&
          list.map((item: any) => {
            return (
              <Panel header={item.name} key={item.identify} extra={genExtra(item)}>
                {item.addr}
              </Panel>
            )
          })}
      </Collapse>
      <Connection open={open} handleOpen={handleOpen} title={title} flush={flush} forms={ forms } />
    </>
  )
}

export default Pannel
