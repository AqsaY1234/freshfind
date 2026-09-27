import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import botData from '../data/bot_data.json'
import marketsData from '../data/m_data.json'
import produceData from '../data/p_data.json'
import { isMarketOpen } from '../utils'

function Bot() {
  const [isOpen, setIsOpen] = useState(false)
  const [typed, setTyped] = useState('')
  const [messages, setMessages] = useState([
    { sender: 'bot', text: botData[0].text, options: botData[0].options, links: [] }
  ])

  function matchTypedQuestion(raw) {
    const q = raw.toLowerCase().trim()

    const produceHit = produceData.find(p => q.includes(p.name.toLowerCase()))
    if (produceHit) {
      const links = produceHit.marketsAvailable
        .map(id => marketsData.find(m => m.id === id))
        .filter(Boolean)
        .map(m => ({ to: `/market/${m.id}`, label: m.name }))
      links.push({ to: '/produce', label: 'Produce Guide' })
      return {
        text: `${produceHit.name} is typically in ${produceHit.season} (${produceHit.category}). Here are markets that usually carry it.`,
        links,
        options: ["What's in season?", 'Find a Market']
      }
    }

    const marketHit = marketsData.find(m =>
      q.includes(m.name.toLowerCase()) || q.includes(m.area.toLowerCase())
    )
    if (marketHit) {
      return {
        text: `${marketHit.name} is in ${marketHit.area}. Hours: ${marketHit.openingHours}–${marketHit.closingHours} on ${marketHit.operatingDays.join(', ')}. Status: ${isMarketOpen(marketHit) ? 'Open now' : 'Closed right now'}.`,
        links: [{ to: `/market/${marketHit.id}`, label: marketHit.name }],
        options: ['Find a Market', 'Open now?']
      }
    }

    if (/bookmark|save|favourite|favorite/.test(q)) {
      return {
        text: 'You can bookmark markets and produce, add session notes, export a list, and share links from the Bookmarks page.',
        links: [{ to: '/bookmarks', label: 'Open Bookmarks' }],
        options: ['Find a Market']
      }
    }
    if (/season|produce|fruit|veg|herb|dairy/.test(q)) {
      return botData.find(item => item.id === "What's in season?")
    }
    if (/open|hour|time|schedule/.test(q)) {
      return botData.find(item => item.id === 'Open now?')
    }
    if (/contact|email|phone/.test(q)) {
      return botData.find(item => item.id === 'Contact')
    }
    if (/about|team/.test(q)) {
      return {
        text: 'FreshFind helps residents find nearby farmers markets. Learn more on About Us.',
        links: [{ to: '/about', label: 'About Us' }],
        options: ['Find a Market']
      }
    }
    if (/market|where|find|near|directory/.test(q)) {
      return botData.find(item => item.id === 'Find a Market')
    }

    return {
      text: "I didn't catch that. Try asking about a market, produce, hours, or pick a quick reply.",
      links: [{ to: '/markets', label: 'Find Markets' }, { to: '/produce', label: 'Produce Guide' }],
      options: ['Find a Market', "What's in season?", 'Contact']
    }
  }

  function pushReply(userText, reply) {
    const botReply = {
      sender: 'bot',
      text: reply.text,
      options: reply.options || [],
      links: reply.links || []
    }
    setMessages(prev => [...prev, { sender: 'user', text: userText }, botReply])
  }

  const handleOptionClick = (option) => {
    const response = botData.find(item => item.id === option)
    pushReply(option, response || { text: "Sorry, I didn't understand that.", options: [] })
  }

  function handleTyped(e) {
    e.preventDefault()
    const question = typed.trim()
    if (!question) return
    setTyped('')
    pushReply(question, matchTypedQuestion(question))
  }

  const lastMessage = messages[messages.length - 1]

  return (
    <>
      <button
        className="chatbot-launcher"
        onClick={() => setIsOpen(prev => !prev)}
        aria-label="Toggle chat assistant"
      >
        💬
      </button>

      {isOpen && (
        <div className="chatbot-window" role="dialog" aria-label="FreshFind assistant">
          <div className="chatbot-header">
            <strong>FreshFind Assistant</strong>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
            >
              ✖
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-bubble ${msg.sender}`} style={{ animation: 'chatIn 0.25s ease both' }}>
                {msg.text}
                {msg.sender === 'bot' && msg.links?.length > 0 && (
                  <div className="mt-2 d-flex flex-column gap-1">
                    {msg.links.map(link => (
                      <Link
                        key={link.to + link.label}
                        to={link.to}
                        onClick={() => setIsOpen(false)}
                        style={{ fontWeight: 600 }}
                      >
                        {link.label} →
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {lastMessage.sender === 'bot' && lastMessage.options?.length > 0 && (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '10px' }}>
                {lastMessage.options.map(opt => (
                  <button
                    key={opt}
                    onClick={() => handleOptionClick(opt)}
                    className="chatbot-option-btn"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form className="chatbot-input-bar" onSubmit={handleTyped}>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Type a question..."
              value={typed}
              onChange={e => setTyped(e.target.value)}
              aria-label="Ask the assistant"
            />
            <button type="submit" className="btn btn-sm btn-custom">Send</button>
          </form>
        </div>
      )}
    </>
  )
}

export default Bot
