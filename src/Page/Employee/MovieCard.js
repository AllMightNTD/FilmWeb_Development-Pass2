import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';
import style from './Employee.module.scss';

const cx = classnames.bind(style);
function ProductCard({ data }) {
    return (
        <Card className={cx('p-0 overflow-hidden h-100 shadow bg-black')}>
            <div className={cx('overflow-hidden rounded p-0 bg-light')}>
                <Link to={`/MovieDetail/${data.slug}`}>
                    {' '}
                    <Card.Img
                        style={{
                            cursor: 'pointer',
                        }}
                        variant="top"
                        src={data.image}
                    />
                </Link>
            </div>
            <Link>
                <Card.Body className={cx('text-center')}>
                    <Card.Title
                        style={{
                            textAlign: 'center',
                            color: '#fff',
                            maxWidth: '220px',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                        }}
                    >
                        {data.name}
                    </Card.Title>
                    <Card.Title
                        style={{
                            textAlign: 'center',
                            color: '#333',
                            maxWidth: '220px',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                        }}
                    >
                        {data.director}
                    </Card.Title>
                </Card.Body>
            </Link>
        </Card>
    );
}

export default ProductCard;
