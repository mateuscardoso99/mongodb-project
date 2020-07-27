import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import '../../css/styles.css'
import Menu from '../../components/menu'
import {apiDelete,apiGet} from '../../services/api'

const ViewProduct = () => {

	const [products, setProducts] = useState([])

	useEffect(()=>{
		buscar()
	},[])

	console.log('pps',products)

	const buscar = () => {
		apiGet('/products').then(resp => setProducts(resp.data))
	}

	const apagar = async (event, id) => {
		event.preventDefault()
		const resp = await apiDelete(`/products/${id}`)
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
				<Link to='/products/create' className="button btn btn-primary">Adicionar</Link>
				<h1 className="text-light text-center">Products</h1>
			</div>
				<table className="table table-responsive-sm table-striped table-dark">
				  <thead>
				    <tr>
				      <th scope="col">Descrição</th>
				      <th scope="col">Preço</th>
				      <th scope="col">Quantidade</th>
				      <th scope="col">Categoria</th>
				      <th scope="col">Margem lucro</th>
				      <th scope="col">Fornecedor</th>
				      <th scope="col" className="text-center">Opções</th>
				    </tr>
				  </thead>
				  <tbody>
					{products.map(product=>(
						<tr key={product._id}>
							<td>{product.descricao}</td>
							<td>{product.preco}</td>
							<td>{product.quantidade}</td>
							<td>{product.categoria}</td>
							<td>{product.margemlucro}</td>
							<td>{product.fornecedor.descricao}</td>
							<td className="text-center">
								<Link to={`/products/update/${product._id}`} className="btn btn-success mr-1">Atualizar</Link>
								<button className="btn btn-danger ml-1" onClick={(e) => apagar(e,product._id)}>Excluir</button>
							</td>
						</tr>
					))}
				  </tbody>
				</table>
		</Menu>
	)
}

export default ViewProduct