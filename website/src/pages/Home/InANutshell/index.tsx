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

function InANutshell() {
  return (
    <Section>
      <SectionTitle
        title="Agora in a Nutshell"
        description="Natural language + structured data = Agora."
      />

      <div className="row">
        <div className={'col col--6 ' + styles.descriptionContainer}>
          <p className={styles.largeText}>
            Agents use Agora to negotiate a common interface.
          </p>
        </div>
        <div className="col col--6">
          <ThemeImage
            lightSrc="https://placehold.co/600x400"
            darkSrc="https://placehold.co/600x400"
          />
        </div>
      </div>
      <div className="row">
        <div className="col col--6">
          <ThemeImage
            lightSrc="https://placehold.co/600x400"
            darkSrc="https://placehold.co/600x400"
          />
        </div>
        <div className={'col col--6 ' + styles.descriptionContainer}>
          <p className={styles.largeText}>
            Once the agents agree on an interface, they write routines to send
            and handle queries that follow that interface
          </p>
        </div>
      </div>
      <div className="row">
        <div className={'col col--6 ' + styles.descriptionContainer}>
          <p className={styles.largeText}>
            From now on, all communication uses routines instead of LLMs
          </p>
        </div>
        <div className="col col--6">
          <ThemeImage
            lightSrc="https://placehold.co/600x400"
            darkSrc="https://placehold.co/600x400"
          />
        </div>
      </div>

      <p className={styles.largeText}>
        With Agora, agents have all the flexibility of LLMs, and all the
        efficiency and reliability of regular code.
      </p>
      <p className={styles.largeText}>
        See this live on <a href="">HuggingFace</a>.
      </p>
    </Section>
  );
}

export default InANutshell;
