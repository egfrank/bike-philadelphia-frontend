import React from 'react';
import styled from 'styled-components'

const TextButton = styled.button`
    background-color: white;
    font-size: 16px;
    border: none;
    font-weight: bold;
    color: black;
    padding: 15px 15px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
`

const CloseButton = styled.button`
    background-color: white;
    font-size: 16px;
    border: none;
    font-weight: bold;
    color: black;
    padding: 15px 15px;
    text-align: center;
    text-decoration: none;
    display: block;
    float: right;
`

class About extends React.Component {

  state = { show: false };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <div>

        <TextButton onClick={this.showModal}>
          About
        </TextButton>
        <Modal show={this.state.show} handleClose={this.hideModal}>
        </Modal>

      </div>
    );
  }
}


export default About;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => props.show ? "block" : "none"};
  z-index: 10000;
`

const ModalBase = styled.div`
  position: fixed;
  width: 80%;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background: white;
  padding: 20px;
  font-size: 16px;
  line-height: 24px;

`

const Modal = ({ handleClose, show }) => {
    

  return (
    <ModalWrapper show={show}>
      <ModalBase>
        <CloseButton onClick={handleClose}>Close</CloseButton>
        <div>
        <h3> Bike Philadelphia </h3>

          <p> Bike Philadelphia is a personal project designed and implemented
          by <a href="https://elliotgfrank.com">Elliot Frank</a>. Indego is
          the name of the bike share system in Philadelphia. Like many other
          bike share companies, Indego publishes the current status of all
          their bike share stations in a real-time <a
          href="https://www.rideindego.com/stations/">JSON endpoint</a>. This
          app takes that data and places it on a map to simply and quickly
          display how many bikes (for someone leaving) and empty spots (for
          someone arriving) are available at each of the 100+ stations in
          Philadelphia. Additionally, there is a search bar so that a user can
          find the closest stations to a given location. This app takes its
          inspiration from the <a href='https://github.com/punkave/frontend-challenge'>frontend challenge</a> posted by P'unk Ave, a web dev
          shop based in South Philly. This app is implemented in React and
          Redux.



          </p>
        </div>
      </ModalBase>
    </ModalWrapper>
  );
};
