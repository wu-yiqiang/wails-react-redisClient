import { useEffect, useState } from 'react'
import { Modal, Form, Input, Col, Row, message, Button } from 'antd'

function Setting(props: any) {
  const { open, handleOpen } = props
  const [isModalOpen, setIsModalOpen] = useState(false)
  useEffect(() => {
    setIsModalOpen(open)
  }, [open])
  const handleCancel = () => {
    handleOpen(false)
  }
  return (
    <Modal title="设置" width={'80%'} open={isModalOpen} onCancel={handleCancel} footer={null}>
      该功能正在持续开发中，敬请期待。。。
    </Modal>
  )
}

export default Setting
