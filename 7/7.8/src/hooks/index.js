import { useState, useEffect } from "react"
import axios from "axios"

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios.get(baseUrl).then((response) => setResources(response.data))
  }, [])

  const create = (resource) => {
    axios.post(baseUrl, resource).then((response) => response.data)
    setResources(resources.concat(resource))
  }

  const service = {
    create,
  }

  return [resources, service]
}

export const useField = (type) => {
  const [value, setValue] = useState("")

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}
