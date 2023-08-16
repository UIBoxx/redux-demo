import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData } from '../ReduxAction/apiAction'; 
import { DataGrid } from '@mui/x-data-grid';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import AddModal from '../modalWindow/basicModal';

const columns = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'firstName', headerName: 'First name', width: 100 },
  { field: 'lastName', headerName: 'Last name', width: 100 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  { field: 'gender', headerName: 'Gender', width: 100 },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  { field: 'email', headerName: 'E-mail', width: 130 },
];



export default function DataTable() {


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const users = useSelector(state => state.userData.data.users) || [];
  const loading = useSelector(state => state.userData.loading);
  const error = useSelector(state => state.userData.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData()); 
  }, [dispatch]);

  if (loading) {
    return <div className='load' style={{ fontSize: '3rem', color: 'red' }}>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ height: 600, width: 800, backgroundColor: '#fff', marginRight: '25px' }}>
      <div className="div" style={{width:'100%',display:'flex', alignItems:"center",justifyContent:'end', paddingBottom: '10px'}}>
      <Button variant="outlined" startIcon={<AddIcon />} onClick={handleOpen} style={{backgroundColor:'#ddd'}}>
          Add
        </Button>
      </div>
      <DataGrid
        rows={users}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20]}
        checkboxSelection
      />
      <AddModal open={open} handleClose={handleClose} />
    </div>
  );
}


