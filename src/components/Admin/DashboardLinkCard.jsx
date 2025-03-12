import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
export default function DashboardLinkCard({data, dataType, loading, to}) {
  return (
    <Link to={to} className='rounded-lg bg-accent-light p-5'>
        {loading ? (
            <p>Loading {dataType}...</p>
        ) : data.length > 0 ? (
            <>
            <p className='capitalize text-base'>{dataType}</p>
            <p className='text-lg font-semibold text-accent-dark'>{data.length}</p>
            </>
            
        ) : (
            <p>No {dataType} available</p>
        )}
    </Link>
  )
}

DashboardLinkCard.propTypes = {
    data: PropTypes.array.isRequired,
    dataType: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    to: PropTypes.string.isRequired
}
