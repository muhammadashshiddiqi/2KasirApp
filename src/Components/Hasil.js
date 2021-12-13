import React, { Component } from 'react'
import { Badge, Row, Col, ListGroup, Card } from 'react-bootstrap'
import { numberWithCommas } from '../Util/util';
import ModalKeranjang from './ModalKeranjang';
import TotalBayar from './TotalBayar';
import swal from 'sweetalert';
import axios from 'axios';
import { API_URL } from '../Util/constants';


export default class Hasil extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            showModal: false,
            keranjangDetail: false,
            jumlah: 0,
            keterangan: '',
            totalHarga: 0,
        }
    };

    handleShow = (keranjang) => {
        this.setState({
            showModal: true,
            keranjangDetail: keranjang,
            keterangan:keranjang.keterangan,
            jumlah: keranjang.jumlah,
            totalHarga: keranjang.total_harga,
        });
    };

    handleClose = () => {
        this.setState({
            showModal: false,
        });
    };

    tambah = () =>{
        this.setState({
            jumlah: this.state.jumlah + 1,
            totalHarga: this.state.keranjangDetail.product.harga * (this.state.jumlah + 1)
        });
    };

    kurang = () => {
        if(this.state.jumlah !== 1){
            this.setState({
                jumlah: this.state.jumlah - 1,
                totalHarga: this.state.keranjangDetail.product.harga * (this.state.jumlah - 1),
            });
        }
    };
    changeHandler = (evt) => {
        this.setState({
            keterangan: evt.target.value
        });
    };

    handleSubmit = (evt) => {
        evt.preventDefault();
        const data = {
            jumlah: this.state.jumlah,
            total_harga: this.state.totalHarga,
            product: this.state.keranjangDetail.product,
            keterangan: this.state.keterangan
        };

        axios({
            method: 'put',
            url: API_URL + 'keranjangs/'+this.state.keranjangDetail.id,
            responseType: 'json',
            data: data
        })
        .then((resp) => {
            this.props.getListKeranjang();
            this.handleClose();
            swal({
                title: "Updated Pesanan!",
                text: "Berhasil update keranjang " + data.product.nama,
                icon: "success",
                button: false,
                timer: 2000,
            });
        })
        .catch((err) => {
            console.log('ERRORNYA : ' + err);
        });
    };

    hapusPesanan = (id) => {
        axios({
            method: 'delete',
            url: API_URL + 'keranjangs/' + id
        })
        .then((resp) => {
            this.props.getListKeranjang();
            this.handleClose();
            swal({
                title: "Deleted Pesanan!",
                text: "Berhasil deleted keranjang " + this.state.keranjangDetail.product.nama,
                icon: "success",
                button: false,
                timer: 2000,
            });
        })
        .catch((err) => {
            console.log('ERRORNYA : ' + err);
        });
    };
    render() {
        const {hasil_keranjang} = this.props;
        return (
            <Col md={4} className="mt-3">
                <h4><b>Hasil</b></h4>
                <hr />
                <Card className="overflow-auto hasil">
                    <ListGroup variant="flush">
                        {hasil_keranjang.map((keranjang) => (
                            <ListGroup.Item key={keranjang.id} onClick={() => this.handleShow(keranjang)}>
                                <Row>
                                    <Col xs={2}>
                                        <h6><Badge variant="primary">{keranjang.jumlah}</Badge></h6>
                                    </Col>
                                    <Col>
                                        <h5>{keranjang.product.nama}</h5> 
                                        <h5>Rp.{numberWithCommas(keranjang.product.harga)}</h5>
                                    </Col>
                                    <Col className="text-right" xs={4}><h5><strong>Rp.{numberWithCommas(keranjang.total_harga)}</strong></h5></Col>
                                </Row>
                            </ListGroup.Item>
                        ))}

                        <ModalKeranjang handleClose={this.handleClose} {...this.state} tambah={this.tambah} kurang={this.kurang} changeHandler={this.changeHandler} handleSubmit={this.handleSubmit} hapusPesanan={this.hapusPesanan}/>
                    </ListGroup>
                </Card>
                <TotalBayar hasil_keranjang={hasil_keranjang} {...this.props}/>
            </Col>
        )
    }
}
