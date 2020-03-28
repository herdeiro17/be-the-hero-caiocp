import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';
import logoimg from '../../assets/logo.svg';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
    //a função useEffect é utilizada para chamar uma função, no caso a "api.get" que puxa o valor de ongID
    //essa função vai rodar novamente sempre o valor [ongId] lá embaixo foi alterado
    useEffect(()=>{
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id)); //aqui ele vai excluir a visual
            //do objeto que foi deletado
        } catch (err) {
            alert('Erro ao deletar o caso, tente novamente.');
        }
    }
    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }
    

    return (
        <div className="profile-container">
            <header>
                <img src={logoimg} alt="Be The Hero"/>
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incident/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041 "/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map( incident => ( //esta função ele utiliza para percorrer todos os incidentes 
                    //abaixo, o key foi utilizado para facilitar a enumeração dos casos para percorrer os dados
                    <li key={incident.id}> 
                    <strong>CASO:</strong>
                    <p>{incident.title}</p>

                    <strong>DESCRIÇÃO:</strong>
                    <p>{incident.description}</p>

                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                    <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                        <FiTrash2 size="20" color="#a8a8b3" />
                    </button>
                    </li> //os elementos "incident.title" são utilizados para chamar o valor armazenado 
                ))}
            </ul>
        </div>
    )
}