import ErrorIcon from './errorIcon'
import SuccessIcon from './successIcon'

const Toast = (props: { type: string; message: string | undefined | null }) => {
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

  return (
    <div className='toast toast-top toast-center'>
      <div className={`alert alert-${props.type}`}>
        <Icon />
        <span className=''>{message}</span>
      </div>
    </div>
  )
}

export default Toast
