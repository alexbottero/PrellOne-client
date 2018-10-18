import React, { Component } from 'react'
import ListPrello from './ListPrello'
import { Container, Row, Col, Button , Input} from 'reactstrap'
import { DragDropContext } from 'react-beautiful-dnd'
import demoData from './demo-data'

class Board extends Component {
  constructor(props){
    super(props)
    this.state = {
      ...demoData, 
      newListTitle : '',
      isHidden: true
    }
    this.toggleHidden = this.toggleHidden.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  toggleHidden () {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  handleChange (event) {
    this.setState({newListTitle: event.target.value})
  }

  handleSubmit = () => {
    const newList = {
      id: 'list4',
      title: this.state.newListTitle,
      cardIds: []
    }
    const newLists = this.state.lists
    newLists[newList.id] = newList
    const newListOrder = this.state.listOrder
    newListOrder.push(newList.id)
    this.setState({
      lists: newLists
    })
    this.toggleHidden()
  }

  onDragEnd = result => {
    const {destination, source, draggableId} = result

    // Do nothing if there is no destination
    if (!destination) {
      return
    }

    // Do nothing if draggable didn't change position
    if (
      destination.droppableId === source.draggableId &&
      destination.index === source.index
    ) {
      return
    }

    const startList = this.state.lists[source.droppableId]
    const finishList = this.state.lists[destination.droppableId]
    const newCardIds = Array.from(startList.cardIds)
    
    // Dragging inside same list
    if (startList === finishList){
      newCardIds.splice(source.index, 1) // remove dragged item from source
      newCardIds.splice(destination.index, 0, draggableId) // insert added card id

      const newList = {
        ...startList,
        cardIds: newCardIds
      }

      const newState = {
        ...this.state,
        lists: {
          ...this.state.lists,
          [newList.id]: newList
        }
      }

      this.setState(newState)
      return
    }
    
    // Moving from one list to another
    const startCardIds = Array.from(startList.cardIds)
    startCardIds.splice(source.index, 1)
    const newStartList = {
      ...startList,
      cardIds: startCardIds
    }

    const finishCardIds = Array.from(finishList.cardIds)
    finishCardIds.splice(destination.index, 0, draggableId)
    const newFinishList = {
      ...finishList,
      cardIds: finishCardIds
    }

    const newState = {
      ...this.state,
      lists: {
        ...this.state.lists,
        [newStartList.id]: newStartList,
        [newFinishList.id]: newFinishList,
      }
    }

    this.setState(newState)
    return
  }

  render() {
    return  [
              <header>
                <Container style={{maxWidth:"100%"}}>
                    <h1>Board</h1>
                </Container>
              </header>,
              <section>
                <Container style={{maxWidth:"100%"}}>
                  <Row className="scrolling-wrapper-flexbox">
                      <DragDropContext onDragEnd={this.onDragEnd}>
                      {this.state.listOrder.map((listId) => {
                        const list = this.state.lists[listId];
                        const cards = list.cardIds.map(taskId => this.state.cards[taskId]);
                        const labels = this.state.labels;
                        return (
                          <Col className="list" xs="12" sm="12" md="6" lg="3">
                            <ListPrello key={list.id} labels={labels} cards={cards} list={list}></ListPrello>
                          </Col>
                        )
                      })}
                      <Col  md="2" lg="3">
                      {!this.state.isHidden && 
                      <Input className="mb-2" name="newListTitle" id="newListTitle" placeholder="type the list title"  value={this.state.newListTitle} onChange={this.handleChange}/>}
                      {!this.state.isHidden && 
                      <Row>
                        <Col>
                          <Button color="success" block onClick={this.handleSubmit}>Add a list</Button>
                        </Col>
                        <Col>
                          <Button color="danger" block  onClick={(e) => this.toggleHidden()}>Cancel</Button>
                        </Col>
                      </Row>}
                      {this.state.isHidden && 
                      <Button outline color="primary" block onClick={(e) => this.toggleHidden()}>Add another list</Button>}
                      </Col>
                      </DragDropContext>
                  </Row>
                </Container>
              </section>
            ]
  }

}

  
export default Board
