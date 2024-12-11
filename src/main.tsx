import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import * as dotenv from 'dotenv';

dotenv.config();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  </StrictMode>,
)
