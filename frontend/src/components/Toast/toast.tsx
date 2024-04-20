import { useEffect, useState } from 'react'
import ErrorIcon from './errorIcon'
import SuccessIcon from './successIcon'
import { useAppSelector } from '../../utils/redux_hooks'
import { selectUser } from '../../reducers/usersReducer'

const Toast = (props: { type: string; message: string | undefined | null }) => {
  const [show, setShow] = useState<boolean>(true)
  const userState = useAppSelector(selectUser)

  console.log(props.type)

  let message = props.message
  if (!props.message) message = 'Unknown'
  const assertNever = (value: string): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    )
  }

  const Icon: React.FC = () => {
    switch (props.type) {
      case 'error':
        return <ErrorIcon />
      case 'success':
        return <SuccessIcon />
      default:
        return assertNever(props.type)
    }
  }
  setTimeout(() => {
    setShow(false)
  }, 3000)

  if (show)
    return (
      <div className='toast toast-top toast-center top-8 z-50'>
        <div className={`alert alert-${props.type}`}>
          <Icon />
          <span className=''>{message}</span>
        </div>
      </div>
    )
}

export default Toast
