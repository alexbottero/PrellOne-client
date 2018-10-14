import React, { Component } from 'react';
import { Card, CardText, CardBody,
  CardTitle, Button } from 'reactstrap';


class CardPrello extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: this.props.card.title,
            text: this.props.card.text,
            member: this.props.member||[],
            due_date: this.props.due_date||null,
            creation_date: this.props.creation_date||null
        };
      }

  render() {
    console.log(this.props)
      return(
    <div>
      <Card body outline color="secondary">
        <CardBody>
          <CardTitle>{this.state.title}</CardTitle>
          <CardText>{this.state.text}</CardText>
          <Button>Add Comment</Button>
        </CardBody>
      </Card>
    </div>);
  }
}
export default CardPrello