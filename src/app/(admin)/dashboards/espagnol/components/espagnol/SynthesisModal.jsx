'use client';

import { useState } from 'react';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { getAllReview } from '@/helpers/data';
import Image from 'next/image';
import Link from 'next/link';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  Modal,
} from 'react-bootstrap';

const SynthesisModal = ({ reviewData }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState('');
  const [voiceType, setVoiceType] = useState('female'); // 'male' or 'female'

  const handleSynthesisClick = (description) => {
    setSelectedDescription(description);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDescription('');
  };

  const speakWord = (word) => {
    // Check if browser supports speech synthesis
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      
      // Get available voices
      const voices = window.speechSynthesis.getVoices();
      
      // Filter voices by gender (note: not all browsers support voice.gender)
      let preferredVoice;
      if (voiceType === 'female') {
        preferredVoice = voices.find(voice => 
          voice.name.includes('Female') || 
          voice.name.includes('woman') || 
          voice.name.includes('Zira') // Microsoft Zira is female
        );
      } else {
        preferredVoice = voices.find(voice => 
          voice.name.includes('Male') || 
          voice.name.includes('man') || 
          voice.name.includes('David') // Microsoft David is male
        );
      }
      
      // Use preferred voice if found, otherwise use default
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      // Set speech properties
      utterance.rate = 0.9; // Slightly slower than normal
      utterance.pitch = 1.0;
      
      // Speak the word
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech is not supported in your browser');
    }
  };

  // Toggle between male and female voice
  const toggleVoice = () => {
    setVoiceType(prev => prev === 'female' ? 'male' : 'female');
  };

  return (
    <>
      <table className="table align-middle text-nowrap table-hover table-centered border-bottom mb-0">
        <thead className="bg-light-subtle">
          <tr>
            <th style={{ width: 20 }}>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="customCheck1" />
                <label className="form-check-label" htmlFor="customCheck1" />
              </div>
            </th>
            <th>Word</th>
            <th>
              Sound
              <Button 
                variant="link" 
                size="sm" 
                onClick={toggleVoice}
                title={`Switch to ${voiceType === 'female' ? 'male' : 'female'} voice`}
              >
                <IconifyIcon 
                  icon={voiceType === 'female' ? "ri:woman-line" : "ri:man-line"} 
                  className="align-middle fs-14 ms-1" 
                />
              </Button>
            </th>
            <th>Tags</th>
            <th>Rating</th>
            <th>Synthesis</th>
            <th>Picture</th>
            <th>Youglish</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reviewData.map((item, idx) => (
            <tr key={idx}>
              <td>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id={`customCheck${idx + 2}`} />
                  <label className="form-check-label" htmlFor={`customCheck${idx + 2}`}>
                    &nbsp;
                  </label>
                </div>
              </td>
              <td>
                <div className="d-flex align-items-center gap-2">
                  <div>
                    <Link href="" className="text-dark fw-medium fs-15">
                      {item.review.title}
                    </Link>
                  </div>
                </div>
              </td>
              <td>
                <Button 
                  variant="light" 
                  size="sm" 
                  className="p-1"
                  onClick={() => speakWord(item.review.title)}
                >
                  <IconifyIcon icon="ri:volume-up-line" className="align-middle fs-18" />
                </Button>
              </td>
              <td>
                <span
                  className={`badge bg-${item.reviewStatus === 'Pending' ? 'warning' : 'success'}-subtle text-${item.reviewStatus === 'Pending' ? 'warning' : 'success'} py-1 px-2 fs-12`}>
                  {item.reviewStatus}
                </span>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <ul className="d-flex text-warning m-0 fs-5 list-unstyled">
                    {Array(Math.floor(item.rating))
                      .fill(0)
                      .map((_star, idx) => (
                        <li className="icons-center" key={idx}>
                          <IconifyIcon icon="ri:star-fill" />
                        </li>
                      ))}
                    {!Number.isInteger(item.rating) && (
                      <li className="icons-center">
                        <IconifyIcon icon="ri:star-half-fill" />
                      </li>
                    )}
                    {item.rating < 5 &&
                      Array(5 - Math.ceil(item.rating))
                        .fill(0)
                        .map((_star, idx) => (
                          <li className="icons-center" key={idx}>
                            <IconifyIcon icon="ri:star-s-line" />
                          </li>
                        ))}
                  </ul>
                  <span className="ms-1">{item.rating}</span>
                </div>
              </td>
              <td>
                <Button variant="soft-info" size="sm" onClick={() => handleSynthesisClick(item.review.description)}>
                  <IconifyIcon icon="ri:file-text-line" className="align-middle fs-18" />
                </Button>
              </td>
              <td>
                <Button variant="soft-secondary" size="sm">
                  <IconifyIcon icon="ri:image-line" className="align-middle fs-18" />
                </Button>
              </td>
              <td>
                <Button variant="soft-primary" size="sm">
                  <IconifyIcon icon="ri:youtube-line" className="align-middle fs-18" />
                </Button>
              </td>
              <td>
                <div className="d-flex gap-2">
                  <Button variant="soft-danger" size="sm">
                    <IconifyIcon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Word Synthesis</Modal.Title>
        </Modal.Header>
        <Modal.Body>{selectedDescription}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SynthesisModal;