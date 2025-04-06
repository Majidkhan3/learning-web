"use client";
import { useSearchParams } from 'next/navigation';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { getAllReview } from '@/helpers/data';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import SynthesisModal from './SynthesisModal';
const Table = () => {
  const searchParams = useSearchParams();
  const [reviewData, setReviewData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllReview();
      setReviewData(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const tag = searchParams.get('tag');
    const rating = searchParams.get('rating');

    const filtered = reviewData.filter(item => {
      const matchesTag = !tag || tag === 'All' || item.tags?.includes(tag);
      const matchesRating = !rating || rating === 'All' || item.rating >= parseInt(rating);
      return matchesTag && matchesRating;
    });

    setFilteredData(filtered);
  }, [searchParams, reviewData]);

  return (
    <Row>
      <Col xl={12}>
        <Card>
          <CardHeader className="d-flex justify-content-between align-items-center border-bottom">
            <div>
              <CardTitle as={'h4'}>Liste de vocabulaire</CardTitle>
            </div>
            <Dropdown>
              <DropdownToggle
                as={'a'}
                className="btn btn-sm btn-outline-light rounded content-none icons-center"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                This Month <IconifyIcon className="ms-1" width={16} height={16} icon="ri:arrow-down-s-line" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem>Download</DropdownItem>
                <DropdownItem>Export</DropdownItem>
                <DropdownItem>Import</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </CardHeader>
          <CardBody className="p-0">
            <div className="table-responsive">
              <SynthesisModal reviewData={filteredData} />
            </div>
          </CardBody>
          <CardFooter>
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-end mb-0">
                <li className="page-item">
                  <Link className="page-link" href="">
                    Previous
                  </Link>
                </li>
                <li className="page-item active">
                  <Link className="page-link" href="">
                    1
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" href="">
                    2
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" href="">
                    3
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" href="">
                    Next
                  </Link>
                </li>
              </ul>
            </nav>
          </CardFooter>
        </Card>
      </Col>
    </Row>
  );
};

export default Table;