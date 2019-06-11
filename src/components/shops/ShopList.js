import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'reactstrap';

const ProjectList = ({shops}) => {
  return (
    <div className="project-list section">
          <Table striped>
              <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>City</th>
                    <th>Address</th>
                </tr>
              </thead>
              <tbody> 
                { shops && shops.map((shop, i) => {
                    return ( 
                      <tr key={i}>
                        <th scope="row">{i+1}</th>
                        <th>
                        <Link to={'/shop/' + shop.id}>
                            {shop.name}
                        </Link>
                        </th>
                        <td>{shop.city}</td>
                        <td>{shop.address}</td>
                      </tr>
                    )
                  }
                  )
                }                  
              </tbody>
          </Table>
    </div>
  )
}

export default ProjectList