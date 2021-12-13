import React from 'react'
import { Col, Card } from 'react-bootstrap'
import { numberWithCommas } from "../Util/util.js";

const Menu = ({ menu, masukKeranjang}) => {
    return (
        <Col md={4} xs={6} className="mb-4">
            <Card className="shadow, hoverCard" onClick={() => masukKeranjang(menu)} >
                <Card.Img variant="top" src={"assets/images/"+menu.category.nama.toLowerCase()+"/"+menu.gambar} />
                <Card.Body>
                    <Card.Title><h6>{menu.nama} <b>({menu.kode})</b></h6></Card.Title>
                    <Card.Text>
                        <h6>Rp. {numberWithCommas(menu.harga)}</h6>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Menu
