import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';

import IngredientItem from './IngredientItem'
import { getIngredientsList } from '../actions/IngredientsAction'



class Ingredients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredientsList: this.props.ingredientsList.length > 0 ? this.props.ingredientsList : [],
    };
  }

  componentDidMount() {
    this.props.getIngredientsList()
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    let newState = { ...prevState };
    if (nextProps.ingredientsList.length !== newState.length) {
      return {
        ingredientsList: nextProps.ingredientsList
      }
    } else return newState
  }

  updateItem = (item) => {
    let { ingredientsList } = this.state
    let index = ingredientsList.findIndex(i => (i.name === item.name));
    ingredientsList[index] = item
    this.setState({ ingredientsList })
  }

  checkOut = () => {
    let { ingredientsList } = this.state
    let itemCheck
    itemCheck = ingredientsList.filter(i => (i.itemsCount > 0));
    if (itemCheck.length > 0) {
      this.props.history.push('checkOutPage')
    } else {
      window.alert("Please select atleast one item to check out");
    }
  }



  render() {

    let { ingredientsList } = this.state
    let ingredientsListToDisplay
    if (ingredientsList.length > 0) {
      ingredientsListToDisplay = ingredientsList.map((item, index) =>
        <div id={index} key={index} className={'shopping-item'}>
          <IngredientItem updateItem={this.updateItem} item={item}></IngredientItem>
        </div>
      );
    }

    return (
      <Fragment>
        <div className='box'>
          {ingredientsList.length > 0 ? ingredientsListToDisplay : <p className="no-items">No Items  </p>}
        </div>
        <Button variant="contained" color="primary" component="span" type="button" onClick={this.checkOut}>
          Proceed To Check Out
              </Button>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ingredientsList: state.ingredientsList.ingredientsList
});

const mapDispatchToProps = {
  getIngredientsList
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Ingredients)
);

