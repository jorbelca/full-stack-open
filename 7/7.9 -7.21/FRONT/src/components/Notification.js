import { useSelector } from "react-redux"

const Notification = () => {
  const message = useSelector((state) => state.notification)
  const warning = useSelector((state) => state.warning)

  return (
    <>
      {message.length !== 0 ? <div className="message">{message}</div> : ""}
      {warning.length !== 0 ? <div className="warning">{warning}</div> : ""}
    </>
  )
}

export default Notification
