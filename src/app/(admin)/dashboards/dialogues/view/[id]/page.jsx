'use client'

import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useParams } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import { Button, Card, Form, Row, Col } from 'react-bootstrap'

const DialogueViewer = () => {
  const { id } = useParams()

  const [voiceA, setVoiceA] = useState('Lucia')
  const [voiceB, setVoiceB] = useState('Enrique')
  const [availableVoices, setAvailableVoices] = useState([])
  const synthRef = useRef(window.speechSynthesis)

  const dialogue = {
    id: 'abc123',
    url: 'https://www.youtube.com/watch?v=nqZkDOOVZEs&t=609s',
    conversations: [
      {
        a: '¿Cómo explicarías que el diluvio universal es un evento histórico y no un mito?',
        b: 'Como apologista cristiano, puedo afirmar con certeza que el diluvio fue un evento histórico real...'
      },
      {
        a: '¿Qué evidencias geológicas apoyan la existencia del diluvio universal?',
        b: 'Las evidencias son contundentes cuando observamos las capas sedimentarias en todo el mundo...'
      }
    ]
  }

  // Load voices when available
  useEffect(() => {
    const loadVoices = () => {
      const voices = synthRef.current.getVoices()
      setAvailableVoices(voices)
    }

    // Some browsers load voices asynchronously
    if (synthRef.current.onvoiceschanged !== undefined) {
      synthRef.current.onvoiceschanged = loadVoices
    }

    loadVoices()
  }, [])

  const speak = (text, voiceLabel) => {
    const utterance = new SpeechSynthesisUtterance(text)

    const selectedVoice = availableVoices.find(v =>
      v.name.toLowerCase().includes(voiceLabel.toLowerCase())
    )

    if (selectedVoice) {
      utterance.voice = selectedVoice
    }

    synthRef.current.speak(utterance)
  }

  const stopSpeaking = () => {
    synthRef.current.cancel()
  }

  return (
    <div>
      <h3>
        📢 Dialogues générés pour YouTube -{' '}
        <a href={dialogue.url} target="_blank">
          {dialogue.url}
        </a>
      </h3>

      <Card className="mb-4">
        <Card.Header className="bg-primary text-white">
          Configuration de la synthèse vocale (Amazon Polly)
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Voix pour Personne A:</Form.Label>
                <Form.Select
                  value={voiceA}
                  onChange={(e) => setVoiceA(e.target.value)}
                >
                  <option value="Lucia">Lucia (Female)</option>
                  <option value="Conchita">Conchita (Female)</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Voix pour Personne B:</Form.Label>
                <Form.Select
                  value={voiceB}
                  onChange={(e) => setVoiceB(e.target.value)}
                >
                  <option value="Enrique">Enrique (Male)</option>
                  <option value="Miguel">Miguel (Male)</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <div className="d-flex mb-3">
        <Button
          variant="success"
          className="me-2"
          onClick={() => {
            dialogue.conversations.forEach((conv, i) => {
              const delay = i * 3000
              setTimeout(() => speak(conv.a, voiceA), delay)
              setTimeout(() => speak(conv.b, voiceB), delay + 1500)
            })
          }}
        >
          Lire tous les dialogues
        </Button>
        <Button variant="danger" onClick={stopSpeaking}>
          Arrêter
        </Button>
      </div>

      {dialogue.conversations.map((conv, idx) => (
        <Card className="mb-3" key={idx}>
          <Card.Body>
            <Row>
              <Col md={6}>
                <div className="d-flex align-items-center justify-content-between">
                  <strong>🧍 Personne A</strong>
                  <Button
                    variant="link"
                    onClick={() => speak(conv.a, voiceA)}
                    title="Lire ce texte"
                  >
                     <IconifyIcon icon="ri:volume-up-line" className="align-middle fs-18" />
                  </Button>
                </div>
                <p>{conv.a}</p>
              </Col>
              <Col md={6}>
                <div className="d-flex align-items-center justify-content-between">
                  <strong>🧑 Personne B</strong>
                  <Button
                    variant="link"
                    onClick={() => speak(conv.b, voiceB)}
                    title="Lire ce texte"
                  >
                     <IconifyIcon icon="ri:volume-up-line" className="align-middle fs-18" />
                  </Button>
                </div>
                <p>{conv.b}</p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </div>
  )
}

export default DialogueViewer
