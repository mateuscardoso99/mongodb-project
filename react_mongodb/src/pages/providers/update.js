import React,{useState,useEffect} from 'react'
import {Link,useParams,useHistory} from 'react-router-dom'
import '../../css/styles.css'
import axios from 'axios'
import {apiUpdate,apiGet} from '../../services/api'

const UpdateProduct = () => {

	const {id} = useParams()
	const history = useHistory()

	const [provider, setProvider] = useState({})
	const [selectedUf, setSelectedUf] = useState()
	const [selectedCity, setSelectedCity] = useState()

	const [cities, setCities] = useState([])

	useEffect(()=>{
		apiGet(`/providers/${id}`).then(resp => {
			setProvider(resp.data)
			setSelectedUf(resp.data.estado)
			setSelectedCity(resp.data.cidade)
		})
	},[])

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

//console.log(selectedUf)

	const handleSelectUf = (event) => {
        const uf = event.target.value
        setSelectedUf(uf)
    }

    const handleSelectCity = (event) => {
        const city = event.target.value
        setSelectedCity(city)
    }

	const update = async (event) => {
		event.preventDefault()
		const form = new FormData(event.target)
		const values = Object.fromEntries(form)
		const data = {
			"descricao": values.descricao,
			"cidade": selectedCity,
			"estado": selectedUf,
		}
		//console.log(data)
		const resp = await apiUpdate(`/providers/${id}`,data)
		if(resp.status === 204){
			history.push('/providers')
		}
		else{
			alert('Não foi possível atualizar.')
		}
	}

	return (
		<div>
			<div className="title">
				<Link to='/providers' className="button btn btn-success">Voltar</Link>
				<h1 className="text-light text-center">Update provider</h1>
			</div>
			<form onSubmit={update} className="container justify-content-center">
			  <div className="form-group">
			    <label htmlFor="inputAddress">Descrição</label>
			    <input type="text" className="form-control" id="descricao" name="descricao" defaultValue={provider.descricao} placeholder="Descrição"/>
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
			      <select id="cidades" className="form-control"  value={selectedCity} onChange={handleSelectCity}>
			        {cities.map(city => (
                    	<option key={city} value={city}>{city}</option>
                    ))}
			      </select>
			    </div>

			  </div>
			  <button type="submit" className="btn btn-primary">Atualizar</button>
			</form>
		</div>
	)
}

export default UpdateProduct