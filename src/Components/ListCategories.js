import React, { Component } from 'react'
import { Col, ListGroup } from 'react-bootstrap'
import axios from 'axios';
import { API_URL } from '../Util/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faUtensils, faCheese } from '@fortawesome/free-solid-svg-icons'

const ICON = ({nama}) => {
    if(nama === 'Makanan'){
        return <FontAwesomeIcon icon={faUtensils} />
    }
    if (nama === 'Minuman') {
        return <FontAwesomeIcon icon={faCoffee} />
    }
    if (nama === 'Cemilan') {
        return <FontAwesomeIcon icon={faCheese} />
    }

    return <FontAwesomeIcon icon={faCheese} />
}

export default class ListCategories extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            categories: []
        }
    }
    componentDidMount(){
        axios({
            method: 'get',
            url: API_URL + 'categories',
            responseType: 'json'
        })
        .then((response) => {
            const a = response.data;
            this.setState({ categories: a });
        })
        .catch((err) => {
            console.log('ERRORNYA : '+err);
        })
    }
    render() {
        const {categories} = this.state 
        const { gantiKategori, piliKategori} = this.props
        return (
            <Col md={2} className="mt-3">
                <h4><b>Daftar Kategori</b></h4>
                <hr />
                <ListGroup>
                    {categories && categories.map((dfkatagori) => (
                        <ListGroup.Item 
                            style={{cursor:'pointer'}} 
                            className={piliKategori === dfkatagori.nama && "category-aktif"} 
                            key={dfkatagori.id} 
                            onClick={() => gantiKategori(dfkatagori.nama)}
                        >
                            <span><ICON nama={dfkatagori.nama} /> {dfkatagori.nama} </span>
                        </ListGroup.Item>
                    ))}
                    
                </ListGroup>
            </Col>
        )
    }
}
