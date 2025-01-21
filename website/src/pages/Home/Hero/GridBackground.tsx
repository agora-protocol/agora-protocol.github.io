/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import styles from './styles.module.css';

function GridBackground() {
  return (
    <svg
      width={1512}
      height={684}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.svgContent}>
      <path
        fill="var(--home-hero-grid-icon-background)"
        d="M110 409.765h54v54h-54z"
      />
      <path
        fill="var(--home-hero-grid-icon-background)"
        d="M330 573.765h54v54h-54z"
      />
      <path
        fill="var(--home-hero-grid-icon-background)"
        d="M1206 573.765h54v54h-54z"
      />
      <path
        fill="var(--home-hero-grid-icon-background)"
        d="M1316 408.765h54v54h-54z"
      />
      <path
        fill="var(--home-hero-grid-icon-background)"
        d="M1152 298.969h54v54h-54z"
      />
      <path
        fill="var(--home-hero-grid-icon-background)"
        d="M331 243.765h54v54h-54z"
      />
      <path
        fill="var(--home-hero-grid-icon-background)"
        d="M276 462.765h54v54h-54z"
      />
      <path
        fill="var(--home-hero-grid-icon-background)"
        d="M1316 244.969h54v54h-54z"
      />
      <path
        fill="var(--home-hero-grid-icon-background)"
        d="M987 190.765h54v54h-54z"
      />
      <path
        fill="var(--home-hero-grid-icon-background)"
        d="M605 136.765h54v54h-54z"
      />
      <path
        fill="var(--home-hero-grid-icon-background)"
        d="M167 189.765h54v54h-54z"
      />
      <path
        fill="var(--home-hero-grid-icon-background)"
        d="M1372 628.189h51.766v54H1372z"
      />
      <path
        fill="var(--home-hero-grid-icon-background)"
        d="M988 517.765h54v54h-54z"
      />
      <path
        fill="var(--home-hero-grid-icon-background)"
        d="M57 626.715h54v54H57z"
      />
      <defs>
        <radialGradient
          id="a"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(0 -591.533 857.267 0 766.983 683.455)">
          <stop stopColor="var(--home-hero-grid-grid)" />
          <stop
            offset={1}
            stopColor="var(--home-hero-grid-grid)"
            stopOpacity={0}
          />
        </radialGradient>
      </defs>
    </svg>
  );
}

export default GridBackground;
