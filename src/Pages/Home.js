import { Col, Container, Row } from 'react-bootstrap';
import { Hasil, ListCategories, Menu } from '../Components';

import React, { Component } from 'react';
import { API_URL } from '../Util/constants';
import axios from 'axios';
import swal from 'sweetalert';

export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            menus: [],
            pilih_categori: 'Cemilan',
            keranjangs: []
        }
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: API_URL + 'products?category.nama=' + this.state.pilih_categori,
            responseType: 'json'
        })
        .then((response) => {
            const a = response.data;
            this.setState({ menus: a });
        })
        .catch((err) => {
            console.log('ERRORNYA : ' + err);
        });

        this.getListKeranjang();
    }

    getListKeranjang = () => {
        axios({
            method: 'get',
            url: API_URL + 'keranjangs',
            responseType: 'json'
        })
        .then((response) => {
            const a = response.data;
            this.setState({ keranjangs: a });
        })
        .catch((err) => {
            console.log('ERRORNYA : ' + err);
        })
    };

    changeKategori = (val) => {
        this.setState({
            pilih_categori: val,
            menus: []
        })

        axios({
            method: 'get',
            url: API_URL + 'products?category.nama=' + val,
            responseType: 'json'
        })
            .then((response) => {
                const a = response.data;
                this.setState({ menus: a });
            })
            .catch((err) => {
                console.log('ERRORNYA : ' + err);
            })

    }

    enterKeranjang = (val) => {

        axios({
            method: 'get',
            url: API_URL + 'keranjangs?product.id=' + val.id,
            responseType: 'json'
        })
        .then((resp) => {
            if (resp.data.length === 0) {
                const ranjang = {
                    jumlah: 1,
                    total_harga: val.harga,
                    product: val
                };

                axios({
                    method: 'post',
                    url: API_URL + 'keranjangs',
                    responseType: 'json',
                    data: ranjang
                })
                .then((resp) => {
                    this.getListKeranjang();
                    swal({
                        title: "Sukses!",
                        text: "Berhasil masuk keranjang " + ranjang.product.nama,
                        icon: "success",
                        button: false,
                        timer: 2000,
                    });
                })
                .catch((err) => {
                    console.log('ERRORNYA : ' + err);
                });
            } else {
                const ranjang = {
                    jumlah: resp.data[0].jumlah + 1,
                    total_harga: resp.data[0].total_harga + val.harga,
                    product: val
                };
                axios({
                    method: 'put',
                    url: API_URL + 'keranjangs/' + resp.data[0].id,
                    responseType: 'json',
                    data: ranjang
                })
                .then((resp) => {

                    this.getListKeranjang();
                    swal({
                        title: "Sukses!",
                        text: "Berhasil masuk keranjang " + ranjang.product.nama,
                        icon: "success",
                        button: false,
                        timer: 2000,
                    });
                })
                .catch((err) => {
                    console.log('ERRORNYA : ' + err);
                });

            }
        })
        .catch((err) => {
            console.log('ERRORNYA : ' + err);
        })
    }

    render() {
        const { menus, pilih_categori, keranjangs } = this.state;
        return (
            <div className="mt-4">
                <Container fluid>
                    <Row>
                        <ListCategories gantiKategori={this.changeKategori} piliKategori={pilih_categori} />
                        <Col className="mt-3">
                            <h4><b>Daftar Produk</b></h4>
                            <hr />
                            <Row className="overflow-auto menu">
                                {menus && menus.map((dfmenu) => (
                                    <Menu key={dfmenu.id} menu={dfmenu} masukKeranjang={this.enterKeranjang} />
                                ))}
                            </Row>
                        </Col>
                        <Hasil hasil_keranjang={keranjangs} {...this.props} getListKeranjang={this.getListKeranjang}/>
                    </Row>
                </Container>
            </div>
        )
    }
}
