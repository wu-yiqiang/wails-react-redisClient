import { useEffect, useState } from 'react'
import { Modal, Form, Input, Col, Row, message, Button } from 'antd'
import {isIp4} from '../utils/validator'
import { ConnectionCreate, ConnectionEdit } from '../../wailsjs/go/main/App'
import './Connection.css'
function Connection(props: any) {
  let [form] = Form.useForm()
  const {open, title, handleOpen, flush, forms } = props
  const [isModalOpen, setIsModalOpen] = useState(false)
  useEffect(() => {
    form.setFieldsValue(forms)
    setIsModalOpen(open)
  }, [open, forms])

  const handleOk = async () => {
    await form.validateFields()
    const data = await createLink()
    if (!data) return
    form.resetFields()
    flush()
    handleOpen(false)
  }

  const createLink = async () => {
    const { code, msg, data } = await ConnectionCreate(form.getFieldsValue())
    if (code == 200) {
      message.success(msg)
      return true
    }
    if (code !== 200) {
      message.error(msg)
      return false
    }
  }

  const editLink = async () => {
    let datas = form.getFieldsValue()
    datas.identify = forms.identify ? forms.identify : ''
    const { code, msg, data } = await ConnectionEdit(datas)
    if (code == 200) {
      message.success(msg)
      return true
    }
    if (code !== 200) {
      message.error(msg)
      return false
    }
  }

  const handleCancel = () => {
    form.resetFields()
    handleOpen(false)
  }

  const handleEdit = async () => {
    await form.validateFields()
    const data = await editLink()
    if (!data) return
    form.resetFields()
    flush()
    handleOpen(false)
  }
  const checkIp4 = (_: any, value: string) => {
    if (!value) return Promise.resolve()
    console.log('valiue', value,isIp4(value))
    if (!isIp4(value)) {
      return Promise.reject(new Error('IP地址不合法（不支持localhost写法）'))
    } else {
      return Promise.resolve()
    }
  }
  
  return (
    <Modal title={title} width={'80%'} open={isModalOpen} onCancel={handleCancel} footer={null}>
      <Form form={form} labelCol={{ span: 6 }} autoComplete="off">
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="连接名称" name="name" rules={[{ required: true, message: '请输入连接名' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="连接地址" name="addr" validateTrigger={['onChange', "onBlur"]} rules={[{ validator: checkIp4 }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="端口号" name="port">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="用户名" name="username">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="密码" name="password">
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className="submit">
        <Button onClick={handleCancel}>取消</Button>
        {title === '新建连接' ? (
          <Button type="primary" onClick={handleOk}>
            确定
          </Button>
        ) : (
          <Button type="primary" onClick={handleEdit}>
            修改
          </Button>
        )}
      </div>
    </Modal>
  )
}

export default Connection
