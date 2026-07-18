import React from 'react';
import AppShell from '../../AppShell/AppShell';
import content from './content';

export default function RizentApp() {
  return <AppShell appId="rizent" content={content} />;
}
