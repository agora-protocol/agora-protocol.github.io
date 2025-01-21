/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import Logo from '../Logo';

import styles from './styles.module.css';

function CallToAction() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.background} />
      <div className={styles.container}>
        <h1 className={styles.title}>Let's build better agents.</h1>
        <div className={styles.buttonPair}>
          <a href="/docs/getting-started" className={styles.primaryButton}>
            Get Started
          </a>
          <a href="/docs/environment-setup" className={styles.secondaryButton}>
            Discord
          </a>
        </div>
      </div>
    </div>
  );
}

export default CallToAction;
