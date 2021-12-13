import React, { Fragment, useState,useEffect } from 'react';
import Breadcrumb from '../../layout/breadcrumb'
import IconMarkUp from './Icon-markup';
import { Container, Row, Col, Card, CardHeader, CardBody } from 'reactstrap'
import axios from 'axios'
import {TypiconsIcons} from "../../constant";

const Materialdesignicon = (props) => {

  const [data,setData] = useState([])
  const [iTag, setiTag] = useState('');
  const [icon, setIcon] = useState('');


  useEffect(() => {
    axios.get(`${process.env.PUBLIC_URL}/api/material-icon-data.json`).then(res => setData(res.data))
  },[])

  const getItag = (tag) => {
    setiTag({
      iTag: '<i className= "' + tag + '"></i>',
    })
    setIcon({
      icon: 'mdi mdi-' + tag + ' fa-2x'
    })
  }
  return (
    <Fragment>
      <Breadcrumb parent="Icons" title="Material Design Icon" />
      <Container fluid={true}>
        {
          data.map((icons, index) => {
            return (
              <Row key={index}>
                <Col sm="12">
                  <Card>
                    <CardHeader>
                      <h5 className="m-b-0">{TypiconsIcons}</h5>
                    </CardHeader>
                    <CardBody>
                      <Row className="icon-lists">
                        {icons.material_icon.map((icon, i) => {
                          return (
                            <Col sm="6" lg="4" key={i} onClick={(e) => getItag(icon)}>
                              <i className={`mdi mdi-${icon}`}></i> {icon}
                            </Col>
                          )
                        })
                        }
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            )
          })
        }
      </Container>
      <IconMarkUp itag={iTag} icons={icon} />
    </Fragment>
  );
}

export default Materialdesignicon;