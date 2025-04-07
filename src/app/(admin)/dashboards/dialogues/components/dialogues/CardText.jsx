'use client'
import React from 'react'
import PageTitle from '@/components/PageTitle'
import { Col, Row, Card, Button, Form } from 'react-bootstrap'
import Link from 'next/link'

const CardText = () => {
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
          <Form>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Fichier PDF (podcast en espagnol)</Form.Label>
              <Form.Control type="file" />
              <small className="text-muted">Les dialogues seront générés en utilisant Claude (Anthropic)</small>
            </Form.Group>
            <Button variant="primary">Envoyer et générer des dialogues</Button>
          </Form>
        </Card.Body>
      </Card>

      <h5 className="fw-bold mb-3">Fichiers traités</h5>

      {/* Processed File 1 */}
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
