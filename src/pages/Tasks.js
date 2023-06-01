import React, { Fragment, useState, useEffect } from 'react';

import { Row, Col, Table } from 'reactstrap';
import { PageTitle } from '../layout-components';
import { Button } from 'reactstrap'
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import { doc, collection, query } from 'firebase/firestore';
import { useHistory } from "react-router-dom";
import moment from 'moment';

const Tasks = () => {
  const firestore = useFirestore();
  let history = useHistory();

  const tasksCollection = collection(firestore, 'tasks')
  const queryConstraints = [];
  const taskQuery = query(tasksCollection, ...queryConstraints);
  
  const { status, data: tasks } = useFirestoreCollectionData(taskQuery, {
    idField: 'taskId',
    initialData: []
  })



  return (
    <Fragment>
      <Row>
        <Col>
          <PageTitle
            titleHeading="Tasks"
            titleDescription=""
          />
        </Col>
        <Col>
          <Button 
            className="float-right m-2"
            color="primary"
            onClick={() => history.push("/create") }
          >
            Create
          </Button>
        </Col>
      </Row>

      {status !== 'loading' && <Row>
        <Table hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Task</th>
              <th>Description</th>
              <th>Status</th>
              <th>Assignee</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task.taskId}>
                <td>{index + 1}</td>
                <td>{task.taskName}</td>
                <td>{task.taskDescription}</td>
                <td>{task.status}</td>
                <td>{task.assignee}</td>
                <td>{moment(task.createdAt.toDate()).format("YYYY-MM-DD HH:mm")}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row> 
      }
      
    </Fragment>
  )
}

export default Tasks;