import React from 'react'
import {Link} from 'react-router-dom'

const Menu = (props) => {

	return (
		<div>
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
			    <span className="navbar-toggler-icon"></span>
			  </button>
			  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
			    <div className="navbar-nav">
			      <Link to='/products' className="nav-item nav-link">Produtos <span className="sr-only">(current)</span></Link>
			      <Link to='/providers' className="nav-item nav-link">Fornecedores</Link>
			    </div>
			  </div>
			</nav>
			<div>{props.children}</div>
		</div>
	)
}

export default Menu