"use client";
import PageTitle from '@/components/PageTitle';
import { Col, Row, Card, Form, Button, Badge, Image } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const AddWord = () => {
  const [word, setWord] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [image, setImage] = useState(null);

  const availableTags = {
    Spanish: ['family', 'medicine', 'food'],
    emotion: []
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const saveContent = () => {
    const content = convertToRaw(editorState.getCurrentContent());
    console.log(content); // You can save this content to your backend
  };

  return (
    <>
      
      <Row>
        <Col xl={12}>
          <Card>
            <Card.Body>
              <h2 className="mb-4">Add a new word</h2>
              
              {/* Word Input Section */}
              <Form.Group className="mb-4">
                <Form.Label><h4>Word:</h4></Form.Label>
                <Form.Control 
                  type="text" 
                  value={word} 
                  onChange={(e) => setWord(e.target.value)} 
                  placeholder="Enter the word"
                />
              </Form.Group>

              {/* Tags Section */}
              <Form.Group className="mb-4">
                <Form.Label><h4>Tags:</h4></Form.Label>
                <div className="d-flex flex-wrap gap-2 mb-2">
                  {Object.entries(availableTags).map(([category, tags]) => (
                    <div key={category} className="mb-3">
                      <h5>{category}</h5>
                      <div className="d-flex flex-wrap gap-2">
                        {tags.map(tag => (
                          <Badge 
                            key={tag}
                            pill 
                            bg={selectedTags.includes(tag) ? 'primary' : 'light'} 
                            text={selectedTags.includes(tag) ? 'white' : 'dark'}
                            className="cursor-pointer"
                            onClick={() => toggleTag(tag)}
                            style={{ cursor: 'pointer' }}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <small className="text-muted">Hold Ctrl (or Cmd) to select multiple tags</small>
              </Form.Group>

              {/* Rich Text Editor Section */}
              <Form.Group className="mb-4">
                <Form.Label><h4>Summary:</h4></Form.Label>
                <div className="border rounded p-2" style={{ minHeight: '200px' }}>
                  <Editor
                    editorState={editorState}
                    onEditorStateChange={onEditorStateChange}
                    toolbar={{
                      options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'remove', 'history'],
                      inline: { inDropdown: true },
                      list: { inDropdown: true },
                      textAlign: { inDropdown: true },
                      link: { inDropdown: true },
                      history: { inDropdown: true },
                    }}
                    placeholder="Enter your summary here..."
                  />
                </div>
              </Form.Group>

              {/* Youglish Link */}
              <Form.Group className="mb-4">
                <Form.Label><h5>Youglish link:</h5></Form.Label>
                <Form.Control 
                  type="text" 
                  value={`https://youqlish.com/pronounce/${word}/spanish`} 
                  readOnly 
                />
                <small className="text-muted">Automatically generated from the word</small>
              </Form.Group>

              {/* Picture Upload */}
              <Form.Group className="mb-4">
                <Form.Label><h5>Picture:</h5></Form.Label>
                <div className="d-flex align-items-center gap-3">
                  <Form.Control 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange}
                    className="w-auto"
                  />
                  {image && (
                    <Image src={image} alt="Preview" width={100} height={100} className="border rounded" />
                  )}
                </div>
              </Form.Group>

              {/* Options */}
              <Form.Group className="mb-3">
                <Form.Check 
                  type="checkbox"
                  label="Do not automatically generate the summary"
                  id="noAutoSummary"
                />
              </Form.Group>

              <Button variant="primary" size="lg" onClick={saveContent}>
                Save Word
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AddWord;