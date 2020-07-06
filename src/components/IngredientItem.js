import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box';

import './main.css'


class IngredientItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItem: {
        name: this.props.item.name,
        price: this.props.item.price,
        itemsCount: this.props.item.itemsCount,
        totalItemValue: this.props.item.totalItemValue
      }
    };
  }

  addOrRemoveItem = (item, addOrRemove) => {
    let { currentItem } = this.state
    let count = item.itemsCount
    if (addOrRemove === 'add')
      count++
    else if (count <= 0)
      return
    else
      count--
    let totalItemValue = currentItem.price * count
    currentItem.itemsCount = count;
    currentItem.totalItemValue = totalItemValue
    this.setState({ currentItem }, () => { this.props.updateItem(this.state.currentItem) })
  }


  render() {

    let { currentItem } = this.state
    return (
      <Fragment>
        <Grid container direction="row" justify="space-between" alignItems="center"  >
          <Grid item xs={4} sm={4} md={4} >
            <div>{currentItem.name}</div>
          </Grid>
          <Grid item xs={4} sm={4} md={4} >
            <span> &#x20b9; {currentItem.price}</span>
          </Grid>
          <Grid item xs={4} sm={4} md={4} >
            <RemoveCircleOutlineIcon onClick={() => this.addOrRemoveItem(currentItem, 'remove')}></RemoveCircleOutlineIcon>
            <Box bgcolor="grey.300" mx={0.4} width={20} display="inline-block">
              {currentItem.itemsCount}
            </Box>
            <AddCircleOutlineIcon onClick={() => this.addOrRemoveItem(currentItem, 'add')}></AddCircleOutlineIcon>

            <span> <b>&#x20b9; {currentItem.totalItemValue}</b></span>

          </Grid>
        </Grid>

      </Fragment>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = {

};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(IngredientItem)
);

