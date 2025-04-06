import PageTitle from '@/components/PageTitle';
import { Card, CardHeader, Col, Row } from 'react-bootstrap';
import BalanceCard from './components/BalanceCard';
import SalesChart from './components/SalesChart';
import SocialSource from './components/SocialSource';
import Statistics from './components/Statistics';
import Transaction from './components/Transaction';
import PageWithFilters from '@/app/(admin)/dashboards/espagnol/components/espagnol/PageWithFilters';

import IconifyIcon from '@/components/wrappers/IconifyIcon';
export const metadata = {
  title: 'Espagnol'
  // description: 'Espagnol',
};
const AnalyticsPage = () => {
  return <>
      <PageTitle title="Espagnol" subName="Dashboard" />
      {/* <Statistics />
      <Row>
        <SalesChart />
        <BalanceCard />
      </Row>
      <SocialSource />
      <Transaction /> */}
      <Row>
        <Col lg={12}>
          <Card>
            <CardHeader className="border-0">
              <Row className="justify-content-between">
                <Col lg={6}>
                  <Row className="align-items-center">
                    <Col lg={6}>
                      <form className="app-search d-none d-md-block me-auto">
                        <div className="position-relative">
                          <input type="search" className="form-control" placeholder="Rechercher un mot..." autoComplete="off" />
                          <IconifyIcon icon="solar:magnifer-broken" className="search-widget-icon" />
                        </div>
                      </form>
                    </Col>
                    {/* <Col lg={4}>
                      <h5 className="text-dark fw-medium mb-0">
                        311 <span className="text-muted"> Agent</span>
                      </h5>
                    </Col> */}
                  </Row>
                </Col>
                <Col lg={6}>
                  <div className="text-md-end mt-3 mt-md-0">
                    <a href="/dashboards/tags">

                    <button type="button"  className="btn btn-outline-primary me-2">
                      <IconifyIcon icon="ri:settings-2-line" className="me-1" />
                      Gérer les tags
                    </button>
                    </a>
                    <a href="/dashboards/word">
                    <button type="button" className="btn btn-outline-primary me-2">
                      <IconifyIcon icon="ri:add-line" className="me-1" /> Ajouter un mot
                    </button>
                    </a>
                    
                    <button type="button" className="btn btn-success me-1">
                      <IconifyIcon icon="ri:add-line" /> Ajouter plusieurs mots
                    </button>
                  </div>
                </Col>
              </Row>
            </CardHeader>
          </Card>
        </Col>
      </Row>
      <PageWithFilters/>
    </>;
};
export default AnalyticsPage;