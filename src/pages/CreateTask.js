import React, { useState, Fragment } from 'react';

import { Row, Col, Input, Button, FormGroup, Label, Spinner, Alert } from 'reactstrap';
import { PageTitle } from '../layout-components';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { TASK_STAUTS, TEST_USERS } from 'config/constants';
import { doc, addDoc, collection } from 'firebase/firestore';
import { useFirestore } from 'reactfire';
import { useHistory } from "react-router-dom";

const validationSchema = Yup.object().shape({
  taskName: Yup.string().required('Required'),
  taskDescription: Yup.string().required('Required'),
  assignee: Yup.string(),
  comment: Yup.string()
})

const CreateTask = () => {
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false);

  const firestore = useFirestore();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      taskName: '',
      taskDescription: '',
      assignee: '',
      comment: '',
      status: 'open'
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true)
      const task = {
        ...values,
        history: [
          { username: 'admin', type: 'create' },
        ],
        createdAt: new Date()
      }

      addDoc(collection(firestore, 'tasks'), task)
      .then(res => {
        console.log(res)
        setShowSuccess(true)
      })
      .catch(err => {
        console.log(err)
        setShowError(true)
      })
      .finally(() => {
        setLoading(false)
        history.goBack()
      })

    }
  })
  return (
    <Fragment>
      <Row>
        <Col>
          <PageTitle
            titleHeading="Create Task"
            titleDescription=""
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup>
              <Label for="taskName">Task Name</Label>
              <Input 
                id="taskName"
                name="taskName"
                placeholder="Enter task name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.taskName}
                invalid={formik.errors.taskName}
              />
            </FormGroup>
            <FormGroup>
              <Label>Task Detail</Label>
              <Input 
                id="taskDescription"
                name="taskDescription"
                placeholder="Enter task details"
                onChange={formik.handleChange}
                value={formik.values.taskDescription}
                type="textarea"
                invalid={formik.errors.taskDescription}
              />
            </FormGroup>

            <FormGroup>
              <Label for="assignee">Assign To</Label>
              <Input
                id="assignee"
                name="assignee"
                type="select"
                onChange={formik.handleChange}
                value={formik.values.assignee}
                invalid={formik.errors.assignee}
              >
                <option>Select a user</option>
                {TEST_USERS.map(user => (
                  <option value={user.id} key={user.id}>{user.name}</option>
                ))}
              </Input>
            </FormGroup>
              
            <FormGroup>
              <Label for="status">Status</Label>
              <Input
                id="status"
                name="status"
                type="select"
                onChange={formik.handleChange}
                value={formik.values.status}
              >
                {TASK_STAUTS.map(st => (
                  <option value={st.value} key={st.value}>{st.label}</option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="comment">Comment (optional)</Label>
              <Input 
                id="comment"
                name="comment"
                placeholder="Enter your comment"
                onChange={formik.handleChange}
                value={formik.values.comment}
                type="textarea"
                invalid={formik.errors.comment}
              />
            </FormGroup>
            <FormGroup className="text-center">
              <Button 
                className="m-2"
                color="primary"
                onPress={formik.handleSubmit}
                disabled={loading}
                style={{ width: 100 }}
              >
                {loading ? <Spinner size="sm">Loading...</Spinner> : 'Create' }
              </Button>
            </FormGroup>
          </form>
        </Col>
      </Row>
      <Alert color="success" isOpen={showSuccess} toggle={() => setShowSuccess(!showSuccess) }>
        New task has been created successfully!
      </Alert>
      <Alert color="error" isOpen={showError} toggle={() => setShowError(!showError)}>
        Something went wrong!
      </Alert>
    </Fragment>
  )
}

export default CreateTask;