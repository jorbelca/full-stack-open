import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  const styleNot = {
    border: "solid",
    padding: 10,
    borderWidth: 1.5,
    borderColor: "lightgreen",
    borderRadius: 6,
    display: "",
  }
  if (notification.length === 0) {
    styleNot.display = "none"
  }
  return <div style={styleNot}>{notification}</div>
}

export default Notification
