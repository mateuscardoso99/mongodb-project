import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import '../../css/styles.css'

import {apiCreate,apiGet} from '../../services/api'

const CreateProduct = () => {

	const history = useHistory()

	const [providers,setProviders] = useState([])

	const [categoria,setSelectedCategoria] = useState('')

	const [provider,setSelectedProvider] = useState('')

	const [formData,setFormData] = useState({
		descricao: '',
		preco: '',
		quantidade: '',
		margemlucro: '',
	})

	useEffect(()=>{
		apiGet('/providers').then(resp => setProviders(resp.data))
	},[])

	const handleInputChange = (event) => {
		const {name, value} = event.target
		setFormData({...formData, [name]: value})
	}

	const handleSelectChangeCategoria = (event) => {
		setSelectedCategoria(event.target.value)
	}
	const handleSelectChangeFornecedor = (event) => {
		setSelectedProvider(event.target.value)
	}

	const create = async (event) => {
		event.preventDefault()
		const {descricao,preco,quantidade,margemlucro} = formData
		const data = {
			"descricao": descricao,
			"categoria": categoria,
			"fornecedor": provider,
			"margemlucro": margemlucro,
			"preco": preco,
			"quantidade": quantidade
		}
		const resp = await apiCreate('/products',data)
		if(resp.status === 201){
			history.push('/products')
		}else{
			alert('Não foi possível cadastrar')
		}
	}
	

	return (
		<div>
			<div className="title">
				<Link to='/products' className="button btn btn-success">Voltar</Link>
				<h1 className="text-light text-center">Create product</h1>
			</div>
			<form onSubmit={create} className="container justify-content-center">
			  <div className="form-group">
			    <label htmlFor="inputAddress">Descrição</label>
			    <input type="text" className="form-control" id="descricao" name="descricao" placeholder="Descrição" onChange={handleInputChange}/>
			  </div>
			  <div className="form-row">
			    <div className="form-group col-md-6">
			      <label htmlFor="inputEmail4">Quantidade</label>
			      <input type="number" className="form-control" id="quantidade" name="quantidade" placeholder="Quantidade" onChange={handleInputChange}/>
			    </div>
			    <div className="form-group col-md-6">
			      <label htmlFor="categoria">Categoria</label>
			      <select id="categoria" className="form-control" onChange={handleSelectChangeCategoria}>
			        <option>Selecione</option>
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
			    <select id="fornecedor" className="form-control" onChange={handleSelectChangeFornecedor}>
			    <option>Selecione</option>
			    {providers.map(provider => (
					<option key={provider._id} value={provider._id}>{provider.descricao}</option>
				))}
			    </select>
			  </div>

			  <div className="form-row">
			    <div className="form-group col-md-6">
			      <label htmlFor="preco">Preço</label>
			      <input type="number" className="form-control" id="preco" name="preco" placeholder="Preço" onChange={handleInputChange}/>
			    </div>
			    
			    <div className="form-group col-md-6">
			      <label htmlFor="margemlucro">Margem lucro</label>
			      <input type="text" className="form-control" id="margemlucro" name="margemlucro" placeholder="Margem Lucro" onChange={handleInputChange}/>
			    </div>
			  </div>
			  <button type="submit" className="btn btn-primary">Cadastrar</button>
			</form>
		</div>
	)
}

export default CreateProduct