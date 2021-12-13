import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { Component } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { API_URL } from '../Util/constants';
import { numberWithCommas } from "../Util/util";

export default class TotalBayar extends Component {

    submitTotalBayar = (val) => {
        const pesan = {
            total_bayar: val,
            menus: this.props.hasil_keranjang
        };

        console.log(pesan);

        axios({
            method: 'post',
            url: API_URL + 'pesanans',
            data: pesan
        })
        .then((response) => { 
            this.props.history.push("/sukses")
        })
        .catch((err) => {
            console.log('serius : ' + err);
        });
        
    };
    render() {

        const { hasil_keranjang } = this.props;

        const total_bayar = hasil_keranjang.reduce(function (result, item) {
            return result + item.total_harga;
        }, 0);
        return (
            <>
            {/* Web */}
            <div className="fixed-bottom d-none d-md-block">
                <Row>
                    <Col md={{span:4, offset:8}} className="px-4">
                        <Row>
                            <Col><h5>Total Bayar : {" "}</h5></Col>
                            <Col className="text-right"><h5><strong> Rp.{numberWithCommas(total_bayar)}</strong></h5></Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 4, offset: 8 }} className="px-4">
                        <Button
                            variant="primary" 
                            size="lg" 
                            className="mb-2 mt-2 w-100"
                            onClick={() => this.submitTotalBayar(total_bayar)}
                        >
                            <FontAwesomeIcon icon={faShoppingCart} /> Bayar
                        </Button>
                    </Col>
                </Row>
            </div>
            {/* Mobile */}
            <div className="d-sm-block d-md-none">
                <Row>
                    <Col md={{ span: 4, offset: 8 }} >
                        <Row>
                            <Col><h5>Total Bayar : {" "}</h5></Col>
                            <Col className="text-right"><h5><strong> Rp.{numberWithCommas(total_bayar)}</strong></h5></Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 4, offset: 8 }} >
                        <Button
                            variant="primary"
                            size="lg"
                            className="mb-2 mt-2 w-100"
                            onClick={() => this.submitTotalBayar(total_bayar)}
                        >
                            <FontAwesomeIcon icon={faShoppingCart} /> Bayar
                        </Button>
                    </Col>
                </Row>
            </div>
            </>
        )
    }
}
