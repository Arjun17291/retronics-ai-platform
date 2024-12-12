import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { FlowEditor } from './components/FlowEditor';
import { KnowledgeBase } from './pages/KnowledgeBase';
import { Personas } from './pages/Personas';
import { Integrations } from './pages/Integrations';
import { Channels } from './pages/Channels';
import { Analytics } from './pages/Analytics';
import { Layout } from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="flow/:id" element={<FlowEditor />} />
          <Route path="flow/new" element={<FlowEditor />} />
          <Route path="knowledge" element={<KnowledgeBase />} />
          <Route path="personas" element={<Personas />} />
          <Route path="integrations" element={<Integrations />} />
          <Route path="channels" element={<Channels />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;