import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
function EmpListing() {
    const [empdata, empdatachange] = useState([]);
    const navigate = useNavigate();
    const [search, setSearch,] = useState('');

    const LoadDetail = (id) => {
        navigate('/employee/details/' + id);
    }

    const LoadEdit = (id) => {
        navigate("/employee/edit/" + id);

    }
    const RemoveFunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch("http://localhost:3000/employee/" + id, {
                method: "DELETE"
            }).then((res) => {
                alert('Removed successfully.')
                window.location.reload();
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }
    useEffect(() => {

        axios.get("http://localhost:3001/emp").then((resp) => {
            empdatachange(resp.data);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);

    return (
        <div className="container">

            <div className="card">

                <div className="card-title">
                    <h2>Employee List</h2>
                    <div className="card-body">
                        <Row>
                            <Col sm={4}>
                                <Form className="d-flex">
                                    <Form.Control onChange={(event) => setSearch(event.target.value)} style={{float:'center'}}
                                        type="search"
                                        placeholder="Search"
                                        className="me-2"
                                        aria-label="Search"
                                    />
                                    <Button>
                                        Search
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                        <div className="divbtn">
                            <Link to="employee/create" className="btn btn-success">Add New(+)</Link>
                        </div>
                        <table className="table table-borderd">
                            <thead className="bg-dark text-white">
                                <tr>
                                    <td>Id</td>
                                    <td>Name</td>
                                    <td>Email</td>
                                    <td>Position</td>
                                    <td>Phone</td>
                                    <td>Image</td>
                                    <td>Action</td>

                                </tr>

                            </thead>
                            <tbody>
                                {empdata &&
                                    empdata.filter((item) => {
                                        return search.toLowerCase() === '' ? item : item.id.toString().toLowerCase().includes(search.toLowerCase())})
                                        .map(item=> (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.position}</td>
                                            <td>{item.phone}</td>
                                            <td img  src={`${item.image}`}  style={{height:70, width:70}} >{item.image}</td>
                                            
                                            <td>
                                                <a onClick={() => { LoadEdit(item.id) }} className='btn btn-success'>Edit</a>
                                                <a onClick={() => { RemoveFunction(item.id) }} className='btn btn-danger'>Remove</a>
                                                <a onClick={() => { LoadDetail(item.id) }} className='btn btn-primary'>Details</a>
                                            </td>

                                        </tr>
                                    ))
                                }
                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>
    );
} export default EmpListing