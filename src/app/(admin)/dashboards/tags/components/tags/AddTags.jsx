'use client'

import React, { useState } from 'react'
import { Badge, Button, Card, Col, Form, ListGroup, Row } from 'react-bootstrap'
import { Icon } from '@iconify/react'
import Link from 'next/link'

const AddTags = () => {
  const [tags, setTags] = useState([
    { name: 'family', count: 1 },
    { name: 'medicine', count: 0 },
    { name: 'food', count: 0 },
    { name: 'journey', count: 0 },
    { name: 'education', count: 0 },
  ])
  const [newTagName, setNewTagName] = useState('')

  const handleAddTag = () => {
    if (newTagName.trim() && !tags.some((tag) => tag.name === newTagName.trim())) {
      setTags([...tags, { name: newTagName.trim(), count: 0 }])
      setNewTagName('')
    }
  }

  const handleDeleteTag = (tagName) => {
    setTags(tags.filter((tag) => tag.name !== tagName))
  }

  return (
    <Row className="mb-4">
      <Col xs={12}>
        <Card>
          <Card.Body>
            <div className="d-flex align-items-center mb-4">
              <Link href="/" className="me-3">
                <Icon icon="mdi:arrow-left" width={20} />
              </Link>
              <h4 className="mb-0">Tag Management</h4>
            </div>

            {/* Add New Tag Section */}
            <div className="mb-4">
              <h5>Add a new tag</h5>
              <Form.Group className="mb-3">
                <Form.Label>Name of the new tag</Form.Label>
                <div className="d-flex">
                  <Form.Control type="text" value={newTagName} onChange={(e) => setNewTagName(e.target.value)} placeholder="Enter tag name" />
                  <Button variant="primary" style={{ width: '20%' }} className="ms-2 " onClick={handleAddTag}>
                    + Add
                  </Button>
                </div>
              </Form.Group>
            </div>

            {/* Existing Tags Section */}
            <div>
              <h5>Existing tags</h5>
              <ListGroup>
                {tags.map((tag, index) => (
                  <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                    <span>{tag.name}</span>
                    <div className="d-flex align-items-center">
                      <Badge bg="light" text="dark" className="me-2">
                        {tag.count} word{tag.count !== 1 ? 's' : ''}
                      </Badge>
                      <Button variant="link" className="text-danger p-0" onClick={() => handleDeleteTag(tag.name)} aria-label="Delete tag">
                        <Icon icon="mdi:trash-outline" width={20} />
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default AddTags
