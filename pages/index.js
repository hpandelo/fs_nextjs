import { 
  Container, 
  Box, 
  Input, 
  Button, 
  Text, 
  FormControl, 
  FormLabel, 
  FormHelperText, 
  InputGroup,
  InputLeftAddon
} from '@chakra-ui/react'
import { Logo } from '../components'

import { useFormik } from 'formik'
import * as yup from 'yup'
import app, { PERSISTENCE_MODE } from '../config/firebase'

const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid Email').required('Email is required'),
  password: yup.string().required('Password is required'),
  username: yup.string().required('Username is required'),
})

export default function Home() {
  const { 
    values, 
    errors, 
    touched, 
    handleBlur, 
    handleChange, 
    handleSubmit, 
    isSubmitting, 
  } = useFormik({
    onSubmit: (values, form) => {
      app.auth().setPersistence(PERSISTENCE_MODE)

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });

    },
    validationSchema,
    initialValues: {
      email: '',
      password: '',
      username: '',
    }
  })


/*
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
*/

  return (
    <Container p={8} centerContent>
      <Logo />
      <Box p={4} mt={8}>
        <Text>Crie sua agenda compartilhada</Text>
      </Box>

      <Box>
        <FormControl id="email" p={4} isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input type="email" value={ values.email } onChange={ handleChange } onBlur={ handleBlur }></Input>
          { touched.email && <FormHelperText textColor="#e74c3c">{ errors.email }</FormHelperText> }
        </FormControl>

        <FormControl id="password" p={4} isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" value={ values.password } onChange={ handleChange } onBlur={ handleBlur }></Input>
          { touched.password && <FormHelperText textColor="#e74c3c">{ errors.password }</FormHelperText> }
        </FormControl>

        <FormControl id="username" p={4} isRequired>
          <InputGroup size="lg">
            <InputLeftAddon>clocker.ideen.com/</InputLeftAddon>
            <Input type="username" value={ values.username } onChange={ handleChange } onBlur={ handleBlur }></Input>
          </InputGroup>
          { touched.username && <FormHelperText textColor="#e74c3c">{ errors.username }</FormHelperText> }
        </FormControl>

        <Box p={4}>
          <Button colorScheme="blue" width="100%" onClick={ handleSubmit } isLoading={ isSubmitting }>Enter</Button>
        </Box>

      </Box>
    </Container>
  )
}
