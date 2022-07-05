import React, { useEffect, useState } from 'react'
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { Button, Card, Col, Input, Label, Row, Table } from 'reactstrap';
import * as apiEvaluation from '../../api/apiEvaluation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Search from '../../components/generals/search';
import SelectClassroom from '../../components/comboBoxes/selectClassrooms';
import CustomInput from '../../components/generals/customInput';
import SelectEvaluation from '../../components/comboBoxes/selectEvaluation';

const GradeEvaluationList = props => {
    const [grades, setGrades] = useState([]);
    const [evaluation, setEvaluation] = useState(null)

    useEffect(() => {
        if (evaluation != null)
            fillGradeEvaluation();
    }, [evaluation])

    async function fillGradeEvaluation() {
        var resp = await apiEvaluation.listGrades(evaluation);
        setGrades(resp.scores);
        console.log(resp.scores)
    }

    return (
        <>
            <Card body>
                <h5>Lista de Notas Por Evaluación</h5>
                <hr />
                <Row>
                    <Col sm="4">
                        <SelectEvaluation setEvaluation = { setEvaluation } evaluation = { evaluation } />
                    </Col>
                </Row>
                <Row>
                    <Col sm="4">
                        <Search columnSearch={0} target={'tableGrade'} id={'grade'} placeholder={'Buscar por Nombre'} />
                    </Col>
                </Row>
                <br />
                <Table id={'tableGrade'} size='sm' hover bordered className='bg-forms' responsive>
                    <thead>
                        <tr>
                            <th>Nombres y Apellidos</th>
                            <th>Nota</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            grades.map((g, idx) => {
                                return (
                                    <tr key={idx} className="pointer">
                                        <td>{g.student.name} {g.student.lastName} {g.student.mothersLastName}</td>
                                        <td>{g.score}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Card>
        </>
    )
}

GradeEvaluationList.propTypes = {}

export default GradeEvaluationList