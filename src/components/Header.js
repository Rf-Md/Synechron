import React, { Component, Fragment } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Fragment>
        <div
          style={{
            backgroundColor: '#6666ff',
            position: 'relative',
            height: '54px',
            width: "100%",
            zIndex: '100',
            textAlign: 'center',
            color: 'rgb(101, 19, 38)'
          }}
        >
          <span style={{ fontSize: "30px" }}>Nutritional and Delicious Salad Shop</span>
        </div>
      </Fragment >
    );
  }
}



export default Header


