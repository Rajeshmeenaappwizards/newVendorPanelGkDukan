import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { getTaxSlabs } from '../../../slices/thunks';
import { useSelector } from 'react-redux';

const TaxSlabSelect = ({ value, onChange }) => {
    const [taxSlabOptions, setTaxSlabOptions] = useState([])

    const dispatch = useDispatch();

    const TaxSlabOption = useSelector((state) => state.TaxSlabs.taxSlabs);

    useEffect(() => {
        fetchTaxSlab();
    }, [])

    useEffect(() => {
        if (TaxSlabOption && TaxSlabOption.success) {
            const data = TaxSlabOption.data.map((val) => ({ value: val._id, label: `${val.title} (${val.percentage}%)` }));
            setTaxSlabOptions(data)
        }
    }, [TaxSlabOption])

    const fetchTaxSlab = () => {
        dispatch(getTaxSlabs())
    }
    return (
        <Select
            options={taxSlabOptions}
            value={taxSlabOptions.find(option => option.value === value)}
            onChange={selectedOption => onChange(selectedOption ? selectedOption.value : '')}
            placeholder="Select Tax Slab"
        />
    );
};

export default TaxSlabSelect;
