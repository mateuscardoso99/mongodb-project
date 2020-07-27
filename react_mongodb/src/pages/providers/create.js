import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import '../../css/styles.css'

import {apiCreate} from '../../services/api'
import axios from 'axios'

const CreateProduct = () => {

	const history = useHistory()
	
	const [selectedUf, setSelectedUf] = useState('')
	const [selectedCity, setSelectedCity] = useState('')

	const [cities, setCities] = useState([])

	const [formData,setFormData] = useState({
		descricao: ''
	})

	useEffect(() => {
        if (selectedUf === '') {
            return
        }

        axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
        .then(resposta => {
            const cityNames = resposta.data.map(city => city.nome)
            setCities(cityNames)
        })
    }, [selectedUf])

	const handleInputChange = (event) => {
		const {name, value} = event.target
		setFormData({...formData, [name]: value})
	}

	const handleSelectUf = (event) => {
        const uf = event.target.value
        setSelectedUf(uf)
    }

    const handleSelectCity = (event) => {
        const city = event.target.value
        setSelectedCity(city)
    }

	const create = async (event) => {
		event.preventDefault()
		const {descricao} = formData
		const data = {
			"descricao": descricao,
			"cidade": selectedCity,
			"estado": selectedUf,
		}
		const resp = await apiCreate('/providers',data)
		if(resp.status === 201){
			history.push('/providers')
		}else{
			alert('Não foi possível cadastrar')
		}
	}
	

	return (
		<div>
			<div className="title">
				<Link to='/providers' className="button btn btn-success">Voltar</Link>
				<h1 className="text-light text-center">Create provider</h1>
			</div>
			<form onSubmit={create} className="container justify-content-center">
			  <div className="form-group">
			    <label htmlFor="inputAddress">Descrição</label>
			    <input type="text" className="form-control" id="descricao" name="descricao" placeholder="Descrição" onChange={handleInputChange}/>
			  </div>

			  <div className="form-row">
			    <div className="form-group col-md-6">
			      <label htmlFor="estados">Estado</label>
			      <select name="estados" className="form-control" value={selectedUf} onChange={handleSelectUf}>
					<option value="">Selecione</option>
					<option value="AC">Acre</option>
					<option value="AL">Alagoas</option>
					<option value="AP">Amapá</option>
					<option value="AM">Amazonas</option>
					<option value="BA">Bahia</option>
					<option value="CE">Ceará</option>
					<option value="DF">Distrito Federal</option>
					<option value="ES">Espírito Santo</option>
					<option value="GO">Goiás</option>
					<option value="MA">Maranhão</option>
					<option value="MT">Mato Grosso</option>
					<option value="MS">Mato Grosso do Sul</option>
					<option value="MG">Minas Gerais</option>
					<option value="PA">Pará</option>
					<option value="PB">Paraíba</option>
					<option value="PR">Paraná</option>
					<option value="PE">Pernambuco</option>
					<option value="PI">Piauí</option>
					<option value="RJ">Rio de Janeiro</option>
					<option value="RN">Rio Grande do Norte</option>
					<option value="RS">Rio Grande do Sul</option>
					<option value="RO">Rondônia</option>
					<option value="RR">Roraima</option>
					<option value="SC">Santa Catarina</option>
					<option value="SP">São Paulo</option>
					<option value="SE">Sergipe</option>
					<option value="TO">Tocantins</option>
				</select>
			    </div>
			    <div className="form-group col-md-6">
			      <label htmlFor="cidades">Cidade</label>
			      <select id="cidades" className="form-control" value={selectedCity} onChange={handleSelectCity}>
			        <option value="">Selecione</option>
			        {cities.map(city => (
                    	<option key={city} value={city}>{city}</option>
                    ))}
			      </select>
			    </div>

			  </div>
			  <button type="submit" className="btn btn-primary">Cadastrar</button>
			</form>
		</div>
	)
}

export default CreateProduct