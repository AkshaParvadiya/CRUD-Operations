import {
    Button,
    FormControl,
    FormGroup,
    Input,
    InputLabel,
    Typography,
    styled,
  } from '@mui/material';
  import { DatePicker } from '@mui/x-date-pickers/DatePicker';
  import { useNavigate, useParams } from 'react-router-dom';
  import Navbar from './Navbar';
  import { useState, useEffect } from 'react';
  import { getUserFromId, EditUserData } from '../service/api';
  import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
  import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
  import dayjs from 'dayjs';
  
  const Container = styled(FormGroup)`
    width: 70%;
    margin: 6% auto 0 auto;
    & > div {
      margin-top: 17px;
    }
  `;
  
  const initialvalues = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    phone: '',
    dateOfBirth: null,
  };
  
  const EditUser = () => {
    const [user, setUser] = useState(initialvalues);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();
  
    useEffect(() => {
      getUserData();
    }, []);
  
    const getUserData = async () => {
      let response = await getUserFromId(id);
      setUser(response.data);
    };
  
    const validate = (name, value) => {
      switch (name) {
        case 'firstName':
        case 'lastName':
          if (!value) {
            return 'This field is required';
          }
          break;
        case 'emailAddress':
          if (!value) {
            return 'This field is required';
          } else if (!/\S+@\S+\.\S+/.test(value)) {
            return 'Email address is invalid';
          }
          break;
        case 'phone':
          if (!value) {
            return 'This field is required';
          } else if (!/^\d{10}$/.test(value)) {
            return 'Phone number is invalid';
          }
          break;
        case 'dateOfBirth':
          if (!value) {
            return 'This field is required';
          }
          break;
        default:
          return '';
      }
    };
  
    const onValueChange = (data) => {
      const { name, value } = data.target;
      setUser({ ...user, [name]: value });
      setErrors({ ...errors, [name]: validate(name, value) });
    };
  
    const onDateChange = (date) => {
      const value = date ? date.format('YYYY-MM-DD') : null;
      setUser({ ...user, dateOfBirth: value });
      setErrors({ ...errors, dateOfBirth: validate('dateOfBirth', value) });
    };
  
    const EditUserDetail = async () => {
      const newErrors = {};
      Object.keys(user).forEach((key) => {
        const error = validate(key, user[key]);
        if (error) {
          newErrors[key] = error;
        }
      });
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      await EditUserData(user, id);
      navigate('/');
    };
  
    return (
      <div>
        <Container>
          <Typography variant='h5'>Edit User</Typography>
          <FormControl error={!!errors.firstName}>
            <InputLabel>FirstName</InputLabel>
            <Input
              onChange={onValueChange}
              name='firstName'
              value={user.firstName}
            />
            {errors.firstName && <Typography color='error'>{errors.firstName}</Typography>}
          </FormControl>
          <FormControl error={!!errors.lastName}>
            <InputLabel>LastName</InputLabel>
            <Input
              onChange={onValueChange}
              name='lastName'
              value={user.lastName}
            />
            {errors.lastName && <Typography color='error'>{errors.lastName}</Typography>}
          </FormControl>
          <FormControl error={!!errors.emailAddress}>
            <InputLabel>EmailAddress</InputLabel>
            <Input
              onChange={onValueChange}
              name='emailAddress'
              value={user.emailAddress}
            />
            {errors.emailAddress && <Typography color='error'>{errors.emailAddress}</Typography>}
          </FormControl>
          <FormControl error={!!errors.phone}>
            <InputLabel>Phone</InputLabel>
            <Input
              onChange={onValueChange}
              name='phone'
              value={user.phone}
            />
            {errors.phone && <Typography color='error'>{errors.phone}</Typography>}
          </FormControl>
          <FormControl error={!!errors.dateOfBirth}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='Date of Birth'
                value={user.dateOfBirth ? dayjs(user.dateOfBirth) : null}
                onChange={onDateChange}
                renderInput={(params) => <Input {...params} />}
                inputFormat="YYYY-MM-DD"
              />
            </LocalizationProvider>
            {errors.dateOfBirth && <Typography color='error'>{errors.dateOfBirth}</Typography>}
          </FormControl>
          <FormControl>
            <Button
              variant='contained'
              style={{ background: '#760235', padding: 13 }}
              onClick={EditUserDetail}
            >
              Submit
            </Button>
          </FormControl>
        </Container>
      </div>
    );
  };
  
  export default EditUser;