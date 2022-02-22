import React from 'react'

import '../ChatEngine.css'

import { ChatEngine } from 'react-chat-engine'

export default function ReactChatEngine() {
  return (
    <ChatEngine
      height={'100vh'}
      publicKey={'e173e9c9-12c1-408e-92dd-68dbd20e2115'}
      userName={'user1'}
      userSecret={'user1'}
    />
  )
}