'use client'

import React, { useState } from 'react'
import PageTitle from '@/components/PageTitle'
import { Col, Row, Card, Button, Form, Spinner } from 'react-bootstrap'
import Link from 'next/link'

const CardText = () => {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [generatedDialogues, setGeneratedDialogues] = useState([])

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    try {
      setLoading(true)
      const res = await fetch('/api/dialogues', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      setGeneratedDialogues(data.dialogues || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const dialogues = [
    {
      id: 'abc123',
      source: 'YouTube - https://www.youtube.com/watch?v=nqZkDOOVZEs&t=609s',
      createdAt: '2025-03-23T08:30:43.134131',
    },
    {
      id: 'xyz456',
      source: 'ES380 - Transcript in Spanish only - Are Mexicans Using AI.pdf',
      createdAt: '2025-03-23T07:45:25.486848',
    },
  ]

  return (
    <>
      <PageTitle title="Gestionnaire de Dialogues" />
      <div className="mb-4">
        <Link href="/dashboards/dialogues/youtube">
          <Button variant="primary">Utiliser une vidéo YouTube</Button>
        </Link>
      </div>

      <Card className="mb-4">
        <Card.Header className="bg-light fw-bold">Envoyer un fichier PDF</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Fichier PDF (podcast en espagnol)</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
              <small className="text-muted">
                Les dialogues seront générés en utilisant Claude (Anthropic)
              </small>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? <Spinner size="sm" animation="border" /> : 'Envoyer et générer des dialogues'}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {generatedDialogues.length > 0 && (
        <Card className="mb-4">
          <Card.Header className="bg-success text-white">Dialogues générés</Card.Header>
          <Card.Body style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {generatedDialogues.map((item) => (
              <p key={item.id}>{item.dialogue}</p>
            ))}
          </Card.Body>
        </Card>
      )}

      <h5 className="fw-bold mb-3">Fichiers traités</h5>

      {dialogues.map((dialogue) => (
        <Card className="mb-3" key={dialogue.id}>
          <Card.Body>
            <p className="mb-1">
              <strong>{dialogue.source}</strong>
            </p>
            <p className="text-muted small">Ajouté le: {dialogue.createdAt}</p>
            <Link href={`/dashboards/dialogues/view/${dialogue.id}`}>
              <Button variant="outline-primary" size="sm">
                Voir les dialogues
              </Button>
            </Link>
          </Card.Body>
        </Card>
      ))}
    </>
  )
}

export default CardText
