import ProgressBar from 'react-bootstrap/ProgressBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function Guests() {


    return (
        <>
            <div className=" container my-2 col-md-6">
                <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <h3>Привет! Это анализ комнат. Пока статика</h3>

                    <div className=" container my-2 col-md-6">
                        <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <Container >
                                <Row className="align-items-center m-3 text-center" >
                                    <Col xs={12}>
                                        <h3>Анализ комнат</h3>
                                    </Col>
                                </Row>
                                <Row className="align-items-center border-top">
                                    <Col xs={4}>
                                        Всего комнат
                                    </Col>
                                    <Col xs={1}>
                                        10
                                    </Col>
                                    <Col xs={7}>
                                        <ProgressBar className="my-3" variant="success" now={100} />
                                    </Col>
                                </Row>
                                <Row className="align-items-center border-top">
                                    <Col xs={4}>
                                        Свободны
                                    </Col>
                                    <Col xs={1}>
                                        2
                                    </Col>
                                    <Col xs={7}>
                                        <ProgressBar className="my-3" variant="success" now={20} />
                                    </Col>
                                </Row>
                                <Row className="align-items-center border-top">
                                    <Col xs={4}>
                                        Заселены
                                    </Col>
                                    <Col xs={1}>
                                        6
                                    </Col>
                                    <Col xs={7}>
                                        <ProgressBar className="my-3" variant="success" now={60} />
                                    </Col>
                                </Row>
                                <Row className="align-items-center border-top">
                                    <Col xs={4}>
                                        На брони
                                    </Col>
                                    <Col xs={1}>
                                        1
                                    </Col>
                                    <Col xs={7}>
                                        <ProgressBar className="my-3" variant="success" now={10} />
                                    </Col>
                                </Row>
                                <Row className="align-items-center border-top">
                                    <Col xs={4}>
                                        На ремонте
                                    </Col>
                                    <Col xs={1}>
                                        1
                                    </Col>
                                    <Col xs={7}>
                                        <ProgressBar className="my-3" variant="success" now={10} />
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
