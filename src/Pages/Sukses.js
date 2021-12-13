import React, { Component } from 'react'
import { Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import axios from 'axios';
import { API_URL } from '../Util/constants';

export default class Sukses extends Component {

    componentDidMount() {
        axios({
            method: 'get',
            url: API_URL + 'keranjangs',
            responseType: 'json'
        })
        .then((response) => {
            const a = response.data;
            a.map(function(item) {
                return axios.delete(API_URL+"keranjangs/"+item.id).then((res) => console.log(res)).catch((err) => console.log(err));
            })
        })
        .catch((err) => {
            console.log('ERRORNYA : ' + err);
        })
    }
    render() {
        return (
            <div className="mt-4 text-center">
                <Image src="assets/images/sukses_pesan.png" width="300"/>
                <h2>Pesanan Berhasil</h2>
                <p>Terima kasih telah memesan product kami !</p>
                <Button variant="primary" as={Link} to="/">
                    Kembali
                </Button>
            </div>
        )
    }
}
