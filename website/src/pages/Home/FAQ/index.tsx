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

import styles from './styles.module.css';

function FAQ() {
  return (
    <Section>
      <h1>FAQ</h1>
      <ul>
        <li className={styles.qaQuestion}>
          <b>Does Agora require authoritative nodes?</b>
        </li>
        <p className={styles.qaAnswer}>
          No, Agora is fully decentralized. All agents can communicate without
          relying on any central node.
        </p>
        <li className={styles.qaQuestion}>
          <b>
            How do agents know which protocol is being used in a given
            communication?
          </b>
        </li>
        <p className={styles.qaAnswer}>
          Agents add the SHA1 hash of the text file describing the protocol.
          Refer to the{' '}
          <a href="/docs/protocol/beginner-friendly">specification</a> for more
          info.
        </p>
        <li className={styles.qaQuestion}>
          <b>What license does Agora use?</b>
        </li>
        <p className={styles.qaAnswer}>Agora is released under MIT license.</p>
      </ul>
    </Section>
  );
}

export default FAQ;
