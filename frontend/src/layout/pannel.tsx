import { useEffect, useState } from 'react'
import { Button, Collapse, message, Popconfirm } from 'antd'
const { Panel } = Collapse
import Connection from '../components/Connection'
import { SettingFilled, DeleteFilled } from '@ant-design/icons'
import { ConnectionList, ConnectionDelete } from '../../wailsjs/go/main/App'
import { useForm } from 'antd/es/form/Form'
const formDatas = {
  identify: '',
  name: '',
  port: '',
  addr: '',
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

  const cancel = (event: Event) => {
    event.stopPropagation()
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

      <Popconfirm title="确认删除该连接？" onConfirm={() => handleDelete(values)} onCancel={(event) => cancel(event)} okText="确认" cancelText="取消">
        <DeleteFilled style={{ marginLeft: 5, color: '#ff4d4f' }} onClick={(event) => event.stopPropagation()} />
      </Popconfirm>
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
