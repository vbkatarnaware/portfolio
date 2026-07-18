import React from 'react';
import AppShell from '../../AppShell/AppShell';
import content from './content';

export default function QRapidApp() {
  return <AppShell appId="qrapid" content={content} />;
}
