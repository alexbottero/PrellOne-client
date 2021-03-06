import React from 'react';
import PropTypes from  'prop-types'
import { Row, Col, Button } from 'reactstrap'

const AddList = ({boardId, addList, hidden, hide, show})=> {
  let input
  

  return (
    <div>
    <form>
    {hidden && 
    <Row>
      <Col xs="12">
        <input className="mb-2 form-control" placeholder="Type the title of the list"  ref={node => input = node} autoFocus={true} />
      </Col>
      <Col xs="6">
        <Button block color="success" type="submit" onClick = {e => {e.preventDefault()
          addList(input.value, boardId)
          input.value = ''
        }}>Add a list</Button>
      </Col>
      <Col xs="6">
        <Button block color="danger" onClick = {() => show()}>Cancel</Button>
      </Col>
    </Row>}
    {!hidden && 
    <Button block outline color="primary" onClick = {() => hide()}>Add another list</Button>}
    </form>
    </div>
  );
}

AddList.propTypes={
  boardId: PropTypes.string.isRequired,
  addList: PropTypes.func.isRequired,
  hide: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired
}

export default AddList