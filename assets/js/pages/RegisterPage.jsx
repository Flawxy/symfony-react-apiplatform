import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Field from '../components/forms/Field'
import usersAPI from '../services/usersAPI'

const RegisterPage = ({ history }) => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: ''
  })
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: ''
  })

  // Gestion des changements des inputs dans le formulaire
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget
    setUser({ ...user, [name]: value })
  }

  // Gestion de la soumission du formulaire
  const handleSubmit = async event => {
    event.preventDefault()

    const apiErrors = {}
    if (user.password !== user.passwordConfirm) {
      apiErrors.passwordConfirm = 'La confirmation du mot de passe ne correspond pas'
      setErrors(apiErrors)
      return
    }

    try {
      await usersAPI.register(user)
      setErrors({})
      history.replace('/login')
    } catch ({ response }) {
      const { violations } = response.data
      if (violations) {
        violations.forEach(({ propertyPath, message }) => {
          apiErrors[propertyPath] = message
        })
        setErrors(apiErrors)
      }
    }
  }

  return (
    <>
      <h1>Inscription</h1>
      <form onSubmit={handleSubmit}>
        <Field
          name='firstName'
          label='Prénom'
          placeholder='Votre joli prénom'
          error={errors.firstName}
          value={user.firstName}
          onChange={handleChange}
        />
        <Field
          name='lastName'
          label='Nom de famille'
          placeholder='Votre nom de famille'
          error={errors.lastName}
          value={user.lastName}
          onChange={handleChange}
        />
        <Field
          name='email'
          label='Adresse email'
          placeholder='Votre adresse email'
          type='email'
          error={errors.email}
          value={user.email}
          onChange={handleChange}
        />
        <Field
          name='password'
          label='Mot de passe'
          placeholder='Votre mot de passe ultra sécurisé'
          type='password'
          error={errors.password}
          value={user.password}
          onChange={handleChange}
        />
        <Field
          name='passwordConfirm'
          label='Confirmation de mot de passe'
          placeholder='Confirmez votre super mot de passe'
          type='password'
          error={errors.passwordConfirm}
          value={user.passwordConfirm}
          onChange={handleChange}
        />

        <div className='form-group'>
          <button type='submit' className='btn btn-success'>
            Confirmation
          </button>
          <Link to="/login" className='btn btn-link'>J'ai déjà un compte</Link>
        </div>
      </form>
    </>
  )
}

export default RegisterPage
