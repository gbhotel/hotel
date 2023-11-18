import ProgressBar from 'react-bootstrap/ProgressBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function Guests() {


    return (
        <>
            <div className=" container my-2 col-md-6">
                <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <h3>Привет! Это анализ количества гостей</h3>

            {/*        <Container>*/}
            {/*            <Row className="align-items-center m-3 text-center" >*/}
            {/*                <Col xs={12}>*/}
            {/*                    <h3>Штат сотрудников</h3>*/}
            {/*                </Col>*/}
            {/*            </Row>*/}
            {/*            {countStaff.map((item, index)=>(*/}
            {/*                <Row key={index} className="align-items-center border-top">*/}
            {/*                    <Col xs={4}>*/}
            {/*                        {item.name}*/}
            {/*                    </Col>*/}
            {/*                    <Col xs={1}>*/}
            {/*                        {item.count}*/}
            {/*                    </Col>*/}
            {/*                    <Col xs={7}>*/}
            {/*                        <ProgressBar className="my-3" variant="success" now={Math.round( item.count / countAllStaff.count *100)} label={`${Math.round( item.count / countAllStaff.count *100)}%`}/>*/}
            {/*                    </Col>*/}
            {/*                </Row>*/}
            {/*            ))}*/}
            {/*            <Row className="align-items-center m-3 text-center" >*/}
            {/*                <Col xs={12}>*/}
            {/*                    <h3>Уволенные сотрудники</h3>*/}
            {/*                </Col>*/}
            {/*            </Row>*/}
            {/*            {*/}
            {/*                countStaffDismiss.map((item, index)=>(*/}
            {/*                    <Row key={index} className="align-items-center border-top">*/}
            {/*                        <Col xs={4}>*/}
            {/*                            {item.name}*/}
            {/*                        </Col>*/}
            {/*                        <Col xs={1}>*/}
            {/*                            {item.count}*/}
            {/*                        </Col>*/}
            {/*                        <Col xs={7}>*/}
            {/*                            <ProgressBar className="my-3" variant="success" now={Math.round( item.count / countAllStaffDismiss.count *100)} label={`${Math.round( item.count / countAllStaffDismiss.count *100)}%`}/>*/}
            {/*                        </Col>*/}
            {/*                    </Row>*/}
            {/*                ))}*/}
            {/*        </Container>*/}
                </div>
            </div>
        </>

    )
}
