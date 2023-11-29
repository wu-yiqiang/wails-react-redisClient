import { useEffect, useState } from 'react'
import { Modal, Form, Input, Col, Row } from 'antd'
function Connection(props: any) {
  const [form] = Form.useForm()
  const { open, title, handleOpen } = props
  const [isModalOpen, setIsModalOpen] = useState(false)
  useEffect(() => {
    setIsModalOpen(open)
  }, [open])

  const handleOk = () => {
    handleOpen(false)
  }

  const handleCancel = () => {
    handleOpen(false)
    form.resetFields()
  }

  const onFinish = (values: any) => {
    console.log('Success:', values)
    handleOpen(false)
    form.resetFields()
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Modal title={title} width={'80%'} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Form form={form} labelCol={{ span: 6 }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="连接名" name="username" rules={[{ required: true, message: '请输入连接名' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="地址" name="username" rules={[{ required: true, message: '请输入地址' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="端口" name="username" rules={[{ required: true, message: '请输入端口号' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入用户名' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default Connection
