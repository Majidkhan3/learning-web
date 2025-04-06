"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import { Badge, Card, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const FilterCard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedTag, setSelectedTag] = useState('All');
  const [selectedRating, setSelectedRating] = useState('All');
  const [voice, setVoice] = useState('Lucia (Woman)');
  const [flashCardMode, setFlashCardMode] = useState(false);

  const tags = ['All', 'Spanish', 'family', 'medicine', 'food', 'greeting', 'journey', 'education'];
  const ratings = ['All', '1', '2', '3', '4'];

  useEffect(() => {
    // Initialize from URL params
    const tag = searchParams.get('tag');
    const rating = searchParams.get('rating');
    if (tag) setSelectedTag(tag);
    if (rating) setSelectedRating(rating);
  }, [searchParams]);

  const handleTagChange = (tag) => {
    setSelectedTag(tag);
    const params = new URLSearchParams(searchParams);
    if (tag === 'All') {
      params.delete('tag');
    } else {
      params.set('tag', tag);
    }
    router.push(`?${params.toString()}`);
  };

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
    const params = new URLSearchParams(searchParams);
    if (rating === 'All') {
      params.delete('rating');
    } else {
      params.set('rating', rating);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <h5 className="mb-3">Filter by tag:</h5>
        <div className="d-flex flex-wrap gap-2 mb-4">
          {tags.map(tag => (
            <Badge
              key={tag}
              pill
              bg={selectedTag === tag ? 'primary' : 'light'}
              text={selectedTag === tag ? 'white' : 'dark'}
              className="cursor-pointer"
              onClick={() => handleTagChange(tag)}
              style={{ cursor: 'pointer' }}
            >
              {tag}
            </Badge>
          ))}
        </div>

        <h5 className="mb-3">Filter by rating:</h5>
        <div className="d-flex flex-wrap gap-2 mb-4">
          {ratings.map(rating => (
            <Badge
              key={rating}
              pill
              bg={selectedRating === rating ? 'primary' : 'light'}
              text={selectedRating === rating ? 'white' : 'dark'}
              className="cursor-pointer"
              onClick={() => handleRatingChange(rating)}
              style={{ cursor: 'pointer' }}
            >
              {rating === 'All' ? rating : `${rating} ★`}
            </Badge>
          ))}
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <Form.Check
            type="switch"
            id="flashCardMode"
            label="Flash Card Mode"
            checked={flashCardMode}
            onChange={(e) => setFlashCardMode(e.target.checked)}
          />

          <Form.Select
            size="sm"
            style={{ width: '180px' }}
            value={voice}
            onChange={(e) => setVoice(e.target.value)}
          >
            <option>Lucia (Woman)</option>
            <option>Mark (Man)</option>
          </Form.Select>
        </div>
      </Card.Body>
    </Card>
  );
};

export default FilterCard;