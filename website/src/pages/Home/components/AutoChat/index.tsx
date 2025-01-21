import React, {useEffect, useState} from 'react';

import styles from './styles.module.css';
import Chat from '../Chat';

export default function AutoChat({
  messages,
  speed,
  messagePause,
  resetPause,
  code,
}: {
  messages: string[][];
  speed: number;
  messagePause: number;
  resetPause: number;
  code: boolean;
}) {
  messages = messages || [];

  const [currentMessages, setCurrentMessages] = useState([]);

  async function wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Type the messages character by character, adding a pause between each message. Once all messages are typed, reset the messages.
  useEffect(() => {
    let currentMessageIndex = 0;
    let currentCharacterIndex = 0;

    function updateMessages() {
      let currentMessages = messages.slice(0, currentMessageIndex);
      if (messages[currentMessageIndex]) {
        currentMessages.push([
          messages[currentMessageIndex][0],
          messages[currentMessageIndex][1].slice(0, currentCharacterIndex),
        ]);
      }

      // Drop zero-length messages
      currentMessages = currentMessages.filter(
        ([_, message]) => message.length > 0
      );

      setCurrentMessages(currentMessages);
    }

    async function typeMessages() {
      await wait(messagePause);
      while (currentMessageIndex < messages.length) {
        const message = messages[currentMessageIndex][1];
        if (currentCharacterIndex < message.length) {
          currentCharacterIndex += 1;
          updateMessages();
        } else {
          await wait(messagePause);
          currentMessageIndex += 1;
          currentCharacterIndex = 0;
          updateMessages();
        }
        if (speed > 0) {
          await wait(1000 / speed);
        }
      }
      await wait(resetPause);
      currentMessageIndex = 0;
      currentCharacterIndex = 0;
      updateMessages();

      setTimeout(() => {
        typeMessages();
      }, 0);
    }
    typeMessages();
  }, []);

  return <Chat messages={currentMessages} code={code} />;
}
