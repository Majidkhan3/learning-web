'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Button, Card } from 'react-bootstrap';

const Youtube = () => {
  const [url, setUrl] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted YouTube URL:', url);
    // Do your API call or logic here
  };

  return (
    <>
      <h2 className="mb-4">Generate dialogues from YouTube</h2>

      <Card className="mb-4">
        <Card.Header className="bg-light fw-bold">Enter a YouTube URL</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>YouTube video URL (in Spanish)</Form.Label>
              <Form.Control
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <small className="text-muted">
                Dialogues will be generated using Claude (Anthropic)
              </small>
            </Form.Group>
            <Button type="submit" variant="primary">
              Extract and generate dialogs
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <Button variant="secondary" onClick={() => router.push('/agent')}>
        ⬅ Return to the list of dialogues
      </Button>
    </>
  );
};

export default Youtube;
