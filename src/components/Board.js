import React from 'react'
import Member from '../containers/Member.container'
import AddMember from '../containers/AddMember.container'
import AddTeamBoard from '../containers/AddTeamBoard.container'
import ListPrello from '../containers/ListPrello.container'
import ListPrelloCompo from '../components/ListPrello'
import AddList from '../containers/AddList.container'
import { Row, Col } from 'reactstrap'
import { DragDropContext } from 'react-beautiful-dnd'
import ModalCard from '../containers/ModalCard.container'
import PropTypes from  'prop-types'
import Label from '../containers/Label.container';

const Board = ({id, title, lists, members, labels, onDragEnd, teams}) => (
  <div className="m-3">
    <section>
      <Row>
        <Col>
          <h1 className="boardTitle">{title}</h1>
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm="6" md="4" lg="3">
          <Row>
            <Col xs="4" >  
              <h5>Members:</h5>
            </Col>
          </Row>
          <Row>
            {
              members.map((member,ind)=> (
                <Col xs="2" className="p-2" key={ind}>
                  <div>
                  <Member memberId={member.id}></Member> 
                  </div>
                  
                </Col>
              ))
            } 
            <AddMember idBoard={id}></AddMember>
          </Row> 
        </Col>
        <Col xs="12" sm="6" md="4" lg="3"> 
          <Row>     
            <Col xs="4" >   
              <h5>Teams:</h5>
            </Col>
          </Row>
          <Row>
            {
              teams.map(team => (
                <Col xs="2" className="p-2" key={team.id}>
                  <h6>{team.name}</h6>
                </Col>
              ))
            }
            <AddTeamBoard idBoard={id}></AddTeamBoard> 
          </Row> 
        </Col>
        <Col xs="12" sm="8" md="4" lg="4">
          <Row>
            <Col x1s="3">   
              <h5>Labels</h5>
            </Col>
            <Col>
              <Row>
                {
                  labels.map((label,i) => (
                    <Label editable={true} key={i} labelId={label.id}></Label>
                  ))
                }
              </Row>
            </Col>
          </Row>
        </Col>
        </Row>
        <Row className="scrolling-wrapper-flexbox">
          <DragDropContext onDragEnd={onDragEnd}>
            {
              lists.map(list => (
              <Col xs="12" sm="6" md="4" lg="3" key={list.id}>
              <ListPrello id={list.id}></ListPrello>
              </Col>
            ))}
          </DragDropContext>
          <Col xs="12" sm="6" md="4" lg="3">
            <AddList boardId={id}></AddList>
          </Col>
        </Row>
        <ModalCard/>
    </section>
  </div>
)


Board.propTypes={
  id: PropTypes.string.isRequired,
  title:PropTypes.string.isRequired,
  lists:PropTypes.arrayOf(ListPrelloCompo),
  members: PropTypes.array,
  labels: PropTypes.array,
  onDragEnd: PropTypes.func.isRequired,
  teams: PropTypes.array,
  editable: PropTypes.bool
}

export default Board
