import React, { Component, Fragment } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import Packages from './Packages/Packages'
import ShowPackage from './Packages/ShowPackage'
import Couriers from './Couriers/Couriers'
import NotFound from './Errors/404'


export default class extends Component {
  state = {
    packages: [],
    couriers: []
  }

  componentDidMount() {
    axios.get(`/getPackages`)
      .then(res => {
        console.log(res.data);
        this.setState({ packages: res.data });
      });
    axios.get(`/getCouriers`)
      .then(res => {
        console.log(res.data);
        this.setState({ couriers: res.data });
      });
  }
  
  render() {
    const { packages } = this.state;
    const { couriers } = this.state;

    return (
      <BrowserRouter>
        <Fragment>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/packages">Packages</Link>
            </li>
            <li>
              <Link to="/couriers">Couriers</Link>
            </li>
            <li>
              <Link to="/statistics">Statistics</Link>
            </li>
          </ul>
          <hr></hr>

          <Switch>
            <Route path="/" exact />

            <Route path={`/packages/:packageId`} exact render={
              ({ match }) => {
                const pack = packages.find(pack => pack.id.toString() === match.params.packageId);
                if (!pack) {
                  return <NotFound />
                }
                return <ShowPackage {...pack} />
              }
            } />
            <Route path="/packages" render={props => <Packages {...props} packages={packages}></Packages>} />

            <Route path={`couriers/:courierId`} exact render={
              ({ match }) => {
                const courier = couriers.find(courier => courier.id.toString() === match.params.courierId);
                if (!courier) {
                  return <NotFound />
                }
                //TODO: return show reports
              }
            } />
            <Route path="/couriers" render={props => <Couriers {...props} couriers={couriers}></Couriers>} />

            <Route path="/statistics" />
            <Route component={NotFound} />
          </Switch>
        </Fragment>
      </BrowserRouter>
    );
  }
}