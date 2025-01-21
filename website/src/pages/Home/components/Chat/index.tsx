import React from 'react';

import styles from './styles.module.css';

export default function Chat({
  messages,
  code,
}: {
  messages: string[][];
  code: boolean;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.imessage}>
        {(messages || []).map(([from, message], i) => (
          <div
            key={i}
            className={
              styles.messageContainer +
              ' ' +
              (from === 'me' ? styles['from-me'] : styles['from-them'])
            }>
            <p
              className={
                from === 'me' ? styles['from-me'] : styles['from-them']
              }>
              {code ? <pre className={styles.code}>{message}</pre> : message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
