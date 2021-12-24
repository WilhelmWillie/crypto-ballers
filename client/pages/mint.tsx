import { useCallback } from 'react';
import type { NextPage } from 'next'

import { useBallers } from '../hooks/useBallers';

const Mint: NextPage = () => {
  const {
    methods: {
      draft
    }
  } = useBallers();

  const handleDraftClick = useCallback(() => {
    draft(1);
  }, [draft])

  return (
    <div>
      <h1>Mint</h1>

      <button onClick={handleDraftClick}>Draft</button>
    </div>
  )
}

export default Mint;