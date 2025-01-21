/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import Section from '../components/Section';
import SectionTitle from '../components/SectionTitle';
import ThemeImage from '../components/ThemeImage';

import FoxFact from './FoxFact';
import styles from './styles.module.css';
import Chat from '../components/Chat';
import AutoChat from '../components/AutoChat';

const codeMessageA = `{
  "location": "London",
  "date": "2023-01-20"
}`;

const codeMessageB = `{
  "weather": "cloudy",
  "precipitation": 0.53,
  "temperature": 56
}`;

function Platforms() {
  return (
    <Section>
      <SectionTitle
        title="An efficient and robust protocol for communication between LLM agents."
        description={null}
      />
      <div className={'row ' + styles.content}>
        <div className={'col col--6 ' + styles.chatContainer}>
          <p className={styles.chatTitle}>Go from this</p>
          <AutoChat
            messages={[
              [
                'me',
                "Hi! What's the weather forecast for London on the 20th of January?",
              ],
              [
                'them',
                'Hello! The forecast is cloudy, with a 53% chance of precipitation and an average temperature of 56 °F.',
              ],
            ]}
            speed={15}
            messagePause={500}
            resetPause={5000}
          />
        </div>
        <div className={'col col--6 ' + styles.chatContainer}>
          <p className={styles.chatTitle}>To this</p>
          <AutoChat
            messages={[
              ['me', codeMessageA],
              ['them', codeMessageB],
            ]}
            speed={-1}
            messagePause={1000}
            resetPause={5000}
            code
          />
        </div>
      </div>
    </Section>
  );
}

export default Platforms;
