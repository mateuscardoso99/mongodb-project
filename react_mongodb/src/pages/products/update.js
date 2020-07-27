import React,{useState,useEffect} from 'react'
import {Link,useHistory,useParams} from 'react-router-dom'
import '../../css/styles.css'

import {apiUpdate,apiGet} from '../../services/api'

const UpdateProduct = () => {

	const {id} = useParams()

	const history = useHistory()

	const [providers,setProviders] = useState([])
	const [selectedProvider, setSelectedProvider] = useState({})

	const [product,setProduct] = useState({})

	const [categoria,setSelectedCategoria] = useState()

	useEffect(()=>{
		apiGet(`/products/${id}`).then(resp => {
			setProduct(resp.data)
			setSelectedCategoria(resp.data.categoria)
			setSelectedProvider(resp.data.fornecedor._id)
		})
	},[])

	useEffect(()=>{
		apiGet('/providers').then(resp => {
			setProviders(resp.data)
		})
	},[])

	const handleInputChange = (event) => {
		//const {name, value} = event.target
		//setFormData({...formData, [name]: value})
	}

	const handleSelectChangeCategoria = (event) => {
		setSelectedCategoria(event.target.value)
	}
	const handleSelectChangeFornecedor = (event) => {
		setSelectedProvider(event.target.value)
	}

	const update = async (event) => {
		event.preventDefault()
		const form = new FormData(event.target)
		const values = Object.fromEntries(form)
		const data = {
			"descricao": values.descricao,
			"categoria": categoria,
			"fornecedor": selectedProvider,
			"margemlucro": values.margemlucro,
			"preco": values.preco,
			"quantidade": values.quantidade
		}
		console.log(data)
		const resp = await apiUpdate(`/products/${id}`,data)
		if(resp.status === 204){
			history.push('/products')
		}
		else{
			alert('Não foi possível atualizar.')
		}
	}

	return (
		<div>
			<div className="title">
				<Link to='/products' className="button btn btn-success">Voltar</Link>
				<h1 className="text-light text-center">Update product</h1>
			</div>
			<form onSubmit={update} className="container justify-content-center">
			  <div className="form-group">
			    <label htmlFor="inputAddress">Descrição</label>
			    <input type="text" className="form-control" id="descricao" name="descricao" defaultValue={product.descricao} placeholder="Descrição" onChange={handleInputChange}/>
			  </div>
			  <div className="form-row">
			    <div className="form-group col-md-6">
			      <label htmlFor="inputEmail4">Quantidade</label>
			      <input type="number" className="form-control" id="quantidade" name="quantidade" defaultValue={product.quantidade} placeholder="Quantidade" onChange={handleInputChange}/>
			    </div>
			    <div className="form-group col-md-6">
			      <label htmlFor="categoria">Categoria</label>
			      <select id="categoria" className="form-control" value={categoria} onChange={handleSelectChangeCategoria}>
			        <option>Carnes</option>
			        <option>Refrigerantes</option>
			        <option>Bebida Alcoólica</option>
			        <option>Higiene</option>
			        <option>Pescado</option>
			        <option>Frutas</option>
			        <option>Limpeza</option>
			        <option>Outro</option>
			      </select>
			    </div>
			  </div>

			  <div className="form-group">
			    <label htmlFor="fornecedor">Fornecedor</label>
			    <select id="fornecedor" className="form-control" value={selectedProvider} onChange={handleSelectChangeFornecedor}>
			    {providers.map(provider => (
					<option key={provider._id} value={provider._id}>{provider.descricao}</option>
				))}
			    </select>
			  </div>

			  <div className="form-row">
			    <div className="form-group col-md-6">
			      <label htmlFor="preco">Preço</label>
			      <input type="number" className="form-control" id="preco" name="preco" placeholder="Preço" defaultValue={product.preco} onChange={handleInputChange}/>
			    </div>
			    
			    <div className="form-group col-md-6">
			      <label htmlFor="margemlucro">Margem lucro</label>
			      <input type="text" className="form-control" id="margemlucro" name="margemlucro" defaultValue={product.margemlucro} placeholder="Margem Lucro" onChange={handleInputChange}/>
			    </div>
			  </div>
			  <button type="submit" className="btn btn-primary">Atualizar</button>
			</form>
		</div>
	)
}

export default UpdateProduct