import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { resetStore } from '../actions/IngredientsAction'
import './main.css'

import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid'


class CheckOutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      additionalNotes: '',
      openModal: false
    };
  }

  totalValue = () => {
    let { ingredientsList } = this.props
    var totalPrice = []
    ingredientsList.forEach((i) => { totalPrice.push(parseInt(i.totalItemValue)) })
    let finalPrice = totalPrice.reduce((total, add) => { return total + add });
    return finalPrice

  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  order = () => {
    if (this.state.name === '' || this.state.email === '') {
      window.alert("Name and Email is mandatory");
    } else {
      this.setState({
        openModal: true
      });

    }

  }

  closeModal = () => {
    this.setState({
      openModal: false
    }, () => {
      this.props.history.push('landingPage')
      this.props.resetStore()
    })

  }

  render() {
    let { ingredientsList } = this.props
    let { name, email, additionalNotes, openModal } = this.state
    let ingredientsListToDisplay
    if (ingredientsList.length > 0) {
      ingredientsListToDisplay = ingredientsList.map((item, index) =>
        <div id={index} key={index} className={'shopping-item'}>
          {item.itemsCount > 0 ?
            <Fragment>
              <Grid container direction="row" justify="space-between" alignItems="center" >
                <Grid item xs={4} sm={4} md={4} >
                  <div>{item.name}</div>
                </Grid>
                <Grid item xs={4} sm={4} md={4} >
                  <div>x  {item.itemsCount}</div>
                </Grid>
                <Grid item xs={4} sm={4} md={4} >
                  <span> &#x20b9; {item.totalItemValue}</span>
                </Grid>
              </Grid>
            </Fragment>
            : ''}
        </div>
      );
    }
    return (
      <Fragment>
        <div className='box'>
          {ingredientsListToDisplay.length > 0 ? ingredientsListToDisplay : <p >No Items  </p>}
        </div>
        <p ><b>Total Payable : &#x20b9;  {ingredientsListToDisplay.length ? this.totalValue() : 0}</b></p>
        <Grid container direction="row" justify="center" alignItems="center" style={{ padding: "40px" }} spacing={4}>
          <Grid item xs={6} sm={6} md={6} >
            <TextField
              value={name}
              onChange={this.onChange}
              id="outlined-helperText"
              name="name"
              label="Name"
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={6} sm={6} md={6} >
            <TextField
              value={email}
              onChange={this.onChange}
              id="outlined-helperText"
              name="email"
              label="Email"
              variant="outlined"
              required
            />
          </Grid>
          <span>Additional Notes</span>
          <TextareaAutosize
            rowsMin={3}
            onChange={this.onChange}
            name="additionalNotes"
            rowsMax={3}
            value={additionalNotes}
          />
        </Grid>
        <Button variant="contained" color="primary" component="span" type="button" onClick={this.order}>
          Order
              </Button>
        {
          openModal ?
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={true}
              onClose={this.closeModal}
            >
              <div
                style={{
                  position: 'relative',
                  top: '3rem',
                  margin: "2rem",
                  backgroundColor: '#FFFFFF',
                  border: '2px solid #000',
                }}>
                <div className='box'>
                  {ingredientsListToDisplay.length > 0 ? ingredientsListToDisplay : <p >No Items  </p>}
                </div>
                <div style={{ textAlign: 'center' }}>{name}, Thank you and Delivery is on its way</div>

                <Button style={{ float: 'right', margin: '3rem' }} variant="contained" onClick={this.closeModal}>
                  Close </Button>
                <br></br>

              </div>
            </Modal> : ''
        }
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ingredientsList: state.ingredientsList.ingredientsList
});

const mapDispatchToProps = {
  resetStore
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CheckOutPage)
);

