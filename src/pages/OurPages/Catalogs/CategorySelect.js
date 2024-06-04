import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useSelector } from 'react-redux';

const CategorySelect = ({ value, onChange, placeholder, data }) => {

    const categoryData = data.map((val) => ({ value: val._id, label: val.title, children: val.children }));

    return (
        <Select
            options={categoryData}
            value={categoryData.find(option => option.value === value)}
            onChange={onChange}
            placeholder={placeholder}
        />
    );
};

export default CategorySelect;
