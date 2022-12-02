import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

export default function CreateComment (props) {

    return (
        <div>
            <h1>COMMENT GOES HERE!!!!!!!!!!!!!</h1>
            <Form>
                <Form.Group>
                    <Form.Label>
                        Comment 
                    </Form.Label>
                    <Form.Control 
                    as="textarea" 
                    placeholder='Enter comment'
                    rows={3}
                    />
                </Form.Group>
                <Button 
                variant='dark' 
                type='submit'>
                Submit</Button>  
            </Form>
        </div>
    )

}