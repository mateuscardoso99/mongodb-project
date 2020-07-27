import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import '../../css/styles.css'
import Menu from '../../components/menu'
import {apiGet,apiDelete} from '../../services/api'

const ViewProduct = () => {

	const [providers, setProvider] = useState([])

	useEffect(()=>{
		buscar()
	},[])

	console.log('pps',providers)

	const buscar = () => {
		apiGet('/providers').then(resp => setProvider(resp.data))
	}

	const apagar = async (event, id) => {
		event.preventDefault()
		const resp = await apiDelete(`/providers/${id}`)
		if(resp.status === 204) {
			buscar()
		}
		else{
			alert('Não foi possível remover')
		}
	}

	return (
		<Menu>
			<div className="title">
				<Link to='/providers/create' className="button btn btn-primary">Adicionar</Link>
				<h1 className="text-light text-center">Providers</h1>
			</div>
				<table className="table table-sm table-striped table-dark">
				  <thead>
				    <tr>
				      <th scope="col">Descrição</th>
				      <th scope="col">Cidade</th>
				      <th scope="col">Estado</th>
				      <th scope="col" className="text-center">Opções</th>
				    </tr>
				  </thead>
				  <tbody>
				    {providers.map(provider => (
				    	<tr key={provider._id}>
					    	<td>{provider.descricao}</td>
					    	<td>{provider.cidade}</td>
					    	<td>{provider.estado}</td>
					    	<td className="text-center">
					      		<Link to={`/providers/update/${provider._id}`} className="btn btn-success mr-1">Atualizar</Link>
					      		<button className="btn btn-danger ml-1" onClick={(e) => apagar(e, provider._id)}>Excluir</button>
					      	</td>
				    	</tr>
				    ))} 
				  </tbody>
				</table>
		</Menu>
	)
}

export default ViewProduct