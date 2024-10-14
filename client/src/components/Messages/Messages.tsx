import './Messages.css';

import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message/Message';
import { MessageInterface } from '../../interface/message';

const Messages = ({ messages, name }: { messages: MessageInterface[], name: string }) => {
  return (
    <ScrollToBottom>
      {messages.map((message, i) => (
        <div key={`${message}-${i}`}>
          <Message message={message} name={name} />
        </div>
      ))}
    </ScrollToBottom>
  )
}

export default Messages