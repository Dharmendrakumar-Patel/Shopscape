import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import CustomDialog from '../components/CustomDialog';
import { useDispatch } from 'react-redux';
import { addAllUser } from '../redux/user/userSlice';
import { removeUser , getAllUser } from '../apis/userApi';

function UserList () {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);
    const [users, setUsers] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        getAllUsers()
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };

    const handleEdit = (id) => {
        setSelectedValue(id);
        handleClickOpen();
    };

    const handleDelete = async (id) => {
        await removeUser(id);
        await getAllUsers();
    };

    const getAllUsers = async () => {
        const users = await getAllUser();
        console.log(users)
        setUsers(users);
        dispatch(addAllUser(users));
    }


    return (
        <>
            <div className="w-screen h-auto p-0 m-0 bg-transparent">
                <h1 className="max-w-[280px] md:max-w-[50%] mx-auto pt-[7vh] text-center text-2xl font-bold">User List</h1>
                <TableContainer component={Paper} className='mt-10 max-w-[280px] md:max-w-[75%] mx-auto'>
                    <Table sx={{ minWidth: 650 }} aria-label="caption table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Role</TableCell>
                                <TableCell align="right">Edit</TableCell>
                                <TableCell align="right">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users !== null && users?.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.email}</TableCell>
                                    <TableCell align="right">{row.role}</TableCell>
                                    <TableCell align="right" onClick={() => handleEdit(row)} className='cursor-pointer'>
                                        <EditOutlinedIcon />
                                    </TableCell>
                                    <TableCell align="right" onClick={() => handleDelete(row._id)} className='cursor-pointer'>
                                        <DeleteOutlineOutlinedIcon />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <CustomDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
                name="EditUser"
            />
        </>
    );
}

export default UserList;