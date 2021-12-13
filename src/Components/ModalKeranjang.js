import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { numberWithCommas } from '../Util/util'

const ModalKeranjang = ({ showModal, handleClose, keranjangDetail, jumlah, keterangan, tambah, kurang, changeHandler, handleSubmit, totalHarga, hapusPesanan}) => {

    if (keranjangDetail) {
        return (
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {keranjangDetail.product.nama} {" "}
                        (<strong>Rp. {numberWithCommas(keranjangDetail.product.harga)}</strong>)
                    </Modal.Title>
                </Modal.Header>
                
                <Form onSubmit={(event) => handleSubmit(event)}>
                <Modal.Body>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Total Harga : </Form.Label> {" "}
                            <strong>Rp. {numberWithCommas(totalHarga)}</strong>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Jumlah : </Form.Label> {" "}
                            <Button variant='primary' size='sm' className="mx-3" onClick={() => kurang()}>
                                <FontAwesomeIcon icon={faMinus} />
                            </Button>
                            <strong>{jumlah}</strong>
                            <Button variant='primary' size='sm' className="ml-3" onClick={() => tambah()}>
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Keterangan</Form.Label>
                            <Form.Control as="textarea" rows={3} value={keterangan} onChange={(event) => changeHandler(event)} placeholder='Pedas, Nasi Setengah, Hangat, Dll'/>
                        </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => hapusPesanan(keranjangDetail.id)}>
                        <FontAwesomeIcon icon={faTrash} /> Hapus Pesanan
                    </Button>
                    <Button variant="primary" type="submit">
                        Simpan
                    </Button>
                </Modal.Footer>
                </Form>
            </Modal>
        )
    }else{
        return (
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Kosong </Modal.Title>
                </Modal.Header>
                <Modal.Body> Kosong </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
    
}

export default ModalKeranjang
