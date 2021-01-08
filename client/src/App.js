import React from 'react';
import Navbar from '../src/components/navBar/navbar';
import Tasks from '../src/components/tasks/tasks';

export default function App() {
  return (
    <>
      <Navbar />
      <main style={{ marginLeft: '300px' }}>
        <Tasks />
      </main>
    </>
  );
}
