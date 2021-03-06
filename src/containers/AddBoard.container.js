import React, { Component } from 'react'
import { connect } from 'react-redux'
import { closeModalCreateBoard } from '../actions/addBoard.action'
import AddBoard from '../components/AddBoard'
import { boardAdded } from '../actions/board.action'
import { postBoard } from '../services/board.service'

class AddBoardContainer extends Component {
    componentWillMount = () => {
    }

    render = () => (
        <AddBoard {...this.props}></AddBoard>
    )
}


const mapStateToProps = (state, ownProps) =>{
    
    const team=state.reducerTeam[state.reducerAddBoard.activeTeam]
    return ({  
        ...team,
        team:team,
        modal: state.reducerAddBoard.modal,
        owner: state.home.user
    })
    
}

const mapDispatchToProps = dispatch => ({
    closeModalCreateBoard: () => {
        dispatch(closeModalCreateBoard())
    },
    addBoard: async (title, owner,team) => {
        try {
            const ownerId=owner.id
          const data = await postBoard({title, ownerId,team})
          if(team){
              
            dispatch(boardAdded(data, team.id,team.members))
          }
          else{
            dispatch(boardAdded(data, null,[owner]))
          }
          
        } 
        catch (error) {
          const message = error.status === 500 ? "Oops, something went wrong..." : error.data.message
          console.log(message)
        }
        finally {
            dispatch(closeModalCreateBoard())
        }
    }
  })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBoardContainer)