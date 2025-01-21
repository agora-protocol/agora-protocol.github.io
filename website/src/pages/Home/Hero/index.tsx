/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import GitHubButton from 'react-github-btn';

import Logo from '../Logo';

import GridBackground from './GridBackground';
import FloorBackground from './FloorBackground';
import Devices from './Devices';
import styles from './styles.module.css';

function Hero() {
  return (
    <div className={styles.container}>
      <div className={styles.socialLinks}>
        <a
          className="twitter-follow-button"
          href={`https://twitter.com/Agora_Protocol`}
          data-show-count="false"
          data-size="large">
          Follow @Agora_Protocol
        </a>
        <GitHubButton
          href="https://github.com/agora-protocol/python"
          data-icon="octicon-star"
          data-size="large"
          aria-label="Star agora-protocol/python on GitHub">
          Star
        </GitHubButton>
      </div>
      <div className={styles.backgroundContainer}>
        <div className={styles.gridBackground}>
          <GridBackground />
        </div>
        <div className={styles.floorBackground}>
          <FloorBackground />
        </div>
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>Agora Protocol</h1>
        <h2 className={styles.subtitle}>
          Scalable and reliable communication between your agents.
        </h2>
        <div className={styles.buttonContainer}>
          <a href="/docs/getting-started" className={styles.primaryButton}>
            Get Started
          </a>
          <a
            href="https://huggingface.co/spaces/agora-protocol/agora-demo"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondaryButton}>
            HuggingFace Demo
          </a>
        </div>
      </div>
    </div>
  );
}

export default Hero;
