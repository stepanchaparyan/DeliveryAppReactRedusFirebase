import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

const ShopDetails = (props) => {
  const { shop, auth } = props;
  if (!auth.uid) return <Redirect to='/signin' /> 
  if (shop) {
    return (
      <div className="container section project-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{shop.name}</span>
            <p>{shop.name}</p>s
          </div>
          <div className="card-action grey lighten-4 grey-text">
            <div>Posted by {shop.name} {shop.name}</div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="container center">
        <p>Loading shops...</p>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log(state);
  const id = ownProps.match.params.id;
  const projects = state.firestore.data.projects;
  const project = projects ? projects[id] : null;

  const shops = state.firestore.data.shops;
  const shop = shops ? shops[id] : null
  return {
    project: project,
    shop: shop,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{
    collection: 'shops'
  }])
)(ShopDetails)
