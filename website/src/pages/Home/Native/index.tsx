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

function Native() {
  return (
    <Section>
      <SectionTitle
        title="Free, Open Source, Decentralized"
        description="Build agent networks that scale."
      />
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <ThemeImage
            lightSrc="/img/homepage/file-based-routing.png"
            darkSrc="/img/homepage/file-based-routing-dark.png"
            className={styles.cardImage}
            alt="File system with folders and files representing screens and navigation"
          />
          <div className={styles.cardContent}>
            <h4 className={styles.cardTitle}>Efficient</h4>
            <p className={styles.cardDescription}>Reduce token usage by 98%</p>
          </div>
        </div>
        <div className={styles.card}>
          <ThemeImage
            lightSrc="/img/homepage/libraries.png"
            darkSrc="/img/homepage/libraries-dark.png"
            className={styles.cardImage}
            alt="Grid of icons representing libraries, SDKs, and native code"
          />
          <div className={styles.cardContent}>
            <h4 className={styles.cardTitle}>Robust</h4>
            <p className={styles.cardDescription}>
              Stop hoping that your LLM won't mess up.
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <ThemeImage
            lightSrc="/img/homepage/tools.png"
            darkSrc="/img/homepage/tools-dark.png"
            className={styles.cardImage}
            alt="List of developer tool toggles for debugging, performance, and more"
          />
          <div className={styles.cardContent}>
            <h4 className={styles.cardTitle}>Framework-agnostic</h4>
            <p className={styles.cardDescription}>
              Supports any agent that can use natural language.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Native;
