import { useSelector } from 'react-redux'
import store from '../../store/store'

function Customer() {
  // == Reading value from the customer store...
  const customer = useSelector((store) => store.customer.fullName)
  const name = useSelector((store) => store)
  console.log(name)
  return <h2>👋 Welcome, %{customer}%</h2>
}

export default Customer
