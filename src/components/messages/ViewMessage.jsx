import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

// import { sendReply, loadContactUs } from '../../actions/contactUsAction';
// import { loadEmailTemplates } from '../../actions/emailTemplateAction';

import {
  queryReply,
  clearError,
  clearMessage,
} from '../../actions/queriesAction';

const ViewMessage = ({
  //   EmailTemplate: { contactUs },
  //   loadEmailTemplates,
  modal,
  toggle,
  data,
  queryReply,
  Query: { error, message },
  Auth: { userId },
  clearError,
  clearMessage,

  //   sendReply,
  //   loadContactUs,
}) => {
  const [reply, setReply] = useState('');
  const [resolveIssue, setResolveIssue] = useState(
    data.status === 'Resolved' ? true : false
  );

  useEffect(() => {
    if (message !== null) {
      setReply('');
      setResolveIssue(false);
      toggle();
    }

    //eslint_disable_next_line
  }, [error, message]);

  //   useEffect(() => {
  //     loadEmailTemplates();
  //     // eslint-disable-next-line
  //   }, []);

  const [errors, setErrors] = useState('');

  const validate = () => {
    let errors = {};
    let isValid = true;

    if (reply === '') {
      isValid = false;
      errors['reply'] = 'Please enter reply.';
    }

    setErrors(errors);

    return isValid;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // "id":2,

    if (validate()) {
      const messageReply = {
        id: data.id,
        reply,
        status: resolveIssue ? 'Resolved' : 'Pending',
        replied_by: userId,
      };
      queryReply(messageReply);
    }
  };

  const closeBtn = (
    <button className='close' onClick={toggle}>
      &times;
    </button>
  );
  const getValue = (e) => {
    setResolveIssue(!JSON.parse(e.target.value));
  };
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} size='lg'>
        <ModalHeader toggle={toggle} close={closeBtn}>
          Message
        </ModalHeader>
        <Form onSubmit={onSubmit}>
          <ModalBody>
            <Row>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label htmlFor='userName'>User Name</Label>
                  <Input
                    className='form-control'
                    type='text'
                    name='userName'
                    value={data.name ? data.name : ''}
                    disabled
                  />
                </FormGroup>
              </Col>

              <Col sm={12} md={6}>
                <FormGroup>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    className='form-control'
                    type='email'
                    name='email'
                    value={data.email ? data.email : ''}
                    disabled
                  />
                </FormGroup>
              </Col>

              <Col sm={12} md={12}>
                <FormGroup>
                  <Label htmlFor='subject'>Subject</Label>
                  <Input
                    className='form-control'
                    type='text'
                    name='subject'
                    value={data.subject ? data.subject : ''}
                    disabled
                  />
                </FormGroup>
              </Col>

              <Col sm={12} md={12}>
                <FormGroup className='mb-3'>
                  <Label htmlFor='message'>Message</Label>
                  <Input
                    className='form-control'
                    type='textarea'
                    name='message'
                    value={data.message ? data.message : ''}
                    rows='3'
                    disabled
                  />
                </FormGroup>
              </Col>

              <Col sm={12} md={12}>
                <FormGroup className='mb-0'>
                  <Label htmlFor='reply'>Reply</Label>
                  <Input
                    className='form-control'
                    type='textarea'
                    name='reply'
                    value={reply ? reply : ''}
                    onChange={(e) => setReply(e.target.value)}
                    rows='3'
                  />
                  <div className='text-danger'>{errors.reply}</div>
                </FormGroup>
              </Col>
              <Col sm={12}>
                <Row className='justify-content-end'>
                  <Col sm={12} md={4}>
                    <FormGroup>
                      <Input
                        id='reloved'
                        className='checkbox_animated'
                        type='checkbox'
                        name='resolveIssue'
                        value={resolveIssue}
                        defaultChecked={resolveIssue}
                        onChange={(e) => getValue(e)}
                      />
                      <Label for='resolveIssue'>Issue Resolved?</Label>
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' className='btn btn-sm'>
              Submit
            </Button>
            <Button color='secondary' onClick={toggle} className='btn btn-sm'>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};
ViewMessage.propTypes = {
  Query: PropTypes.object.isRequired,
  Auth: PropTypes.object.isRequired,
  clearError: PropTypes.func.isRequired,
  clearMessage: PropTypes.func.isRequired,
  // EmailTemplate: PropTypes.object.isRequired,
  queryReply: PropTypes.func.isRequired,
  // loadContactUs: PropTypes.func.isRequired,
  // loadEmailTemplates: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Query: state.Query,
  Auth: state.Auth,
});

export default connect(mapStateToProps, {
  // loadEmailTemplates,
  queryReply,
  clearError,
  clearMessage,
  // loadContactUs,
})(ViewMessage);
