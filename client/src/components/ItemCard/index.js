import React from 'react'

export default function ItemCard({item}) {

    return (
        <div className="col-6 p-4" key={item.serial_number}>
            <p>{item.product_name}</p>
            <p>SN#: {item.serial_number}</p>
            <p>{item.price}</p>
        </div>
    )
}
