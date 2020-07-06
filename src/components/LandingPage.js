import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';

import './main.css'

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  orderSalad = () => {
    this.props.history.push('ingredients')
  }

  render() {
    return (
      <Fragment>
        <Grid container style={{ position: "absolute" }}  >
          <Grid item xs={12} sm={12} md={12} >
            <h2>Welcome to Salad Shop..!! </h2>
          </Grid>
          <Grid item xs={12} sm={12} md={12} >
            <Button variant="contained" color="primary" component="span" type="button" onClick={() => this.orderSalad()} >
              Order Salad
              </Button>
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
  )(LandingPage)
);

