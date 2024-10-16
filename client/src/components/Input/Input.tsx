import './Input.css';

const Input = ({
  message,
  setMessage,
  sendMessage,
}: {
  message: string,
  setMessage: Function,
  sendMessage: Function,
}) => {
  return (
    <form className="form">
      <input
        className="input"
        type="text"
        placeholder='Enter your message'
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyPress={(event) => event.key === "Enter" ? sendMessage(event) : null}
      />
      <button className="sendButton" onClick={(event) => sendMessage(event)}>Send</button>
    </form>
  )
}

export default Input